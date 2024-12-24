import os
import base64
import pandas as pd
import streamlit as st
from streamlit_chat import message
from streamlit_option_menu import option_menu
from PIL import Image
from tempfile import NamedTemporaryFile
import uuid

from langchain_core.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.schema import (
    SystemMessage,
    HumanMessage,
    AIMessage
)
from langchain.chains import LLMChain

from langchain_core.messages import SystemMessage
from langchain_groq import ChatGroq
from langchain.chains.conversation.memory import ConversationBufferWindowMemory

from functions import predict_class

# CSV file handling
csv_file = "uploaded_images.csv"
chat_csv_file = "chat_history.csv"

def initialize_csv_files():
    if not os.path.exists(csv_file):
        pd.DataFrame(columns=["session_id", "image_path", "predicted_class"]).to_csv(csv_file, index=False)
    if not os.path.exists(chat_csv_file):
        pd.DataFrame(columns=["session_id", "message_type", "content"]).to_csv(chat_csv_file, index=False)

def save_image_to_csv(session_id, file, predicted_class):
    image_dir = "uploaded_images"
    os.makedirs(image_dir, exist_ok=True)
    
    img_path = os.path.join(image_dir, file.name)
    with open(img_path, "wb") as f:
        f.write(file.getbuffer())
    
    df = pd.read_csv(csv_file)
    new_entry = pd.DataFrame({"session_id": [session_id], "image_path": [img_path], "predicted_class": [predicted_class]})
    df = pd.concat([df, new_entry], ignore_index=True)
    df.to_csv(csv_file, index=False)    

def save_chat_message(session_id, message_type, content):
    chat_df = pd.read_csv(chat_csv_file)
    new_entry = pd.DataFrame({"session_id": [session_id], "message_type": [message_type], "content": [content]})
    chat_df = pd.concat([chat_df, new_entry], ignore_index=True)
    chat_df.to_csv(chat_csv_file, index=False)

def process_input():
    if st.session_state.user_input:
        user_input = st.session_state.user_input
        st.session_state.messages.append(HumanMessage(content=user_input))
        save_chat_message(st.session_state.session_id, "human", user_input)
        combined_input = f"Image Class: {st.session_state.image_class}. " if st.session_state.get('image_class') else ""
        combined_input += f"User Input: {user_input}"
        try:
            response = st.session_state.conversation({"human_input": combined_input})
            st.session_state.messages.append(AIMessage(content=response["text"]))
            save_chat_message(st.session_state.session_id, "ai", response["text"])
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")
        st.session_state.user_input = ""

def main():
    initialize_csv_files()

    system_prompt = 'You are a helpful assistant specializing in shoe authentication.'
    groq_api_key = st.secrets["GROQ_API_KEY"]
    model = 'llama3-8b-8192' 
    conversational_memory_length = 16
    memory = ConversationBufferWindowMemory(k=conversational_memory_length, memory_key="chat_history", return_messages=True)   
    
    icon_path = "Lib/shoe.svg"
    
    try:
        with open(icon_path, "r") as img_file:
            ICON_svg = img_file.read()
    except FileNotFoundError:
        st.error(f"Icon file not found: {icon_path}")
        ICON_svg = None

    page_bg_img = """
     <style>
    [data-testid="stAppViewContainer"] {
   
    .chat {
    display: flex;
    font-family: var(--font),"Segoe UI","Roboto","sans-serif";
    width: 100%;
    justify-content: flex-start;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    }
    
    </style>
    """    

    icon_text = """
    <div>
       <span style='font-size: 32px;'>LACETRACE</span>
    </div>
    """
    
    st.set_page_config(page_title="Lace-Trace", page_icon=ICON_svg)
    st.title("Welcome to LaceTrace")
    
    prompt = ChatPromptTemplate.from_messages([
        SystemMessage(content=system_prompt),  
        MessagesPlaceholder(variable_name="chat_history"),  
        HumanMessagePromptTemplate.from_template("{human_input}"), 
    ])

    groq_chat = ChatGroq(groq_api_key=groq_api_key, model_name=model)  
    
    if 'conversation' not in st.session_state:
        st.session_state.conversation = LLMChain(llm=groq_chat, prompt=prompt, verbose=False, memory=memory)

    if 'session_id' not in st.session_state:
        st.session_state.session_id = str(uuid.uuid4())

    if "messages" not in st.session_state:
        st.session_state.messages = [SystemMessage(content=system_prompt)]   

    st.markdown(page_bg_img, unsafe_allow_html=True)
    
    with st.sidebar:
        st.markdown(icon_text, unsafe_allow_html=True)
        st.markdown("### Your trusted shoe buddy🦾🦾")
        st.markdown("### An AI-powered system to help with detecting fake shoes.")
        st.markdown("###  Built by  Ishan and Shiya.")
        
        if st.button("New Chat"):
            st.session_state.session_id = str(uuid.uuid4())
            st.session_state.messages = [SystemMessage(content=system_prompt)]
            st.session_state.conversation = LLMChain(llm=groq_chat, prompt=prompt, verbose=False, memory=memory)
            st.session_state.image_class = None
            st.rerun()

        st.text_input("User: ", key="user_input", on_change=process_input)

        st.markdown("### Recents")
        chat_df = pd.read_csv(chat_csv_file)
        unique_sessions = chat_df['session_id'].unique()
        chat_options = ["Current Chat"] + [f"Chat {i+1}" for i in range(len(unique_sessions))]
        selected_chat = st.selectbox("Select a chat", chat_options)

        if selected_chat != "Current Chat":
            selected_index = chat_options.index(selected_chat) - 1
            st.session_state.session_id = unique_sessions[selected_index]

    if selected_chat == "Current Chat":
        st.header("Please upload an image of a shoe")
        file = st.file_uploader("", type=["jpeg", "jpg", "png"])
        
        if file:
            st.image(file, use_column_width=True)
            result, image_class = predict_class(file)
            st.write(result)
            save_image_to_csv(st.session_state.session_id, file, image_class)
            st.session_state.image_class = image_class
        else:
            st.session_state.image_class = None

        messages = st.session_state.get('messages', [])
        for i, msg in enumerate(messages[1:]):
            is_user = isinstance(msg, HumanMessage)
            message(msg.content, is_user=is_user, key=f"{i}_{('user' if is_user else 'ai')}")

    else:
        session_messages = chat_df[chat_df['session_id'] == st.session_state.session_id]
        for _, msg in session_messages.iterrows():
            message(msg['content'], is_user=(msg['message_type'] == 'human'), key=f"{msg['session_id']}_{_}")
        st.session_state.image_class = None    

if __name__ == '__main__':
    main()
