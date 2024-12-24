import os
import io
import numpy as np
import streamlit as st
from PIL import Image
import matplotlib.pyplot as plt
from keras.preprocessing import image
from skimage.segmentation import mark_boundaries
from inference_sdk import InferenceHTTPClient

CLIENT = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="gRRiczgyB8LDCIQWFFoz"
)

# Dictionary for class mapping
d = {'fake air force': 'Fake Air Force 1',
     'fake jordan 1': 'Fake Air Jordans',
     'ori air force': 'Authentic Air Force 1',
     'ori jordan 1': 'Authentic Air Jordans'}

from lime import lime_image

# Function to get LIME explanation
def get_explanation(test_image, predict_function):
    explainer = lime_image.LimeImageExplainer()
    
    explanation = explainer.explain_instance(
        test_image[0],
        predict_function,  # Use the prediction function
        top_labels=1,
        hide_color=0,
        num_samples=1000
    )
    
    temp, mask = explanation.get_image_and_mask(
        explanation.top_labels[0],
        positive_only=True,
        num_features=5,
        hide_rest=False
    )
    
    fig, ax = plt.subplots(1, 1, figsize=(8, 8))
    ax.imshow(mark_boundaries(temp, mask))
    ax.axis('off')
    ax.set_title("This might be a possible reason for the shoe to be Fake! Beware!")
    
    st.pyplot(fig)

# Function to predict class and display explanation
def predict_class(file):
    # Open the image file
    Img = Image.open(file)
    
    # Convert to RGB if the image is in RGBA mode
    if Img.mode == 'RGBA':
        Img = Img.convert('RGB')
    
    # Preprocess the image
    test_image = Img.resize((128, 128))
    test_image = image.img_to_array(test_image)
    test_image = test_image / 255.0
    test_image = np.expand_dims(test_image, axis=0)
    
    # Perform inference
    result = CLIENT.infer(Img, model_id="original-or-fake-shoes/5")
    pred = result['predictions'][0]
    
    # Map class prediction to user-friendly label
    image_class = d[pred['class']]
    confid = pred['confidence']
    
    # Define the model as a prediction function
    def predict_function(img_batch):
        # Return the confidence score as predictions for LIME
        return np.array([[confid]] * len(img_batch))
    
    res = "The image uploaded is: {}".format(image_class)
    
    # Generate explanation if the prediction indicates a fake shoe
    if image_class in ['Fake Air Jordans', 'Fake Air Force 1']:
        get_explanation(test_image, predict_function)
    
    return res, image_class
