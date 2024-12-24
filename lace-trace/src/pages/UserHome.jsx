import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserHome() {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newSessionId = chatSessions.length + 1;
      const newChatEntry = {
        sessionId: newSessionId,
        sessionName: `Session ${newSessionId} - ${file.name}`,
        messages: [{
          id: 1,
          user: 'John Doe',
          message: `Uploaded file: ${file.name}`
        }]
      };
      setChatSessions([...chatSessions, newChatEntry]);
      setCurrentSessionId(newSessionId);
    }
  };

  const handleMessageSend = () => {
    if (message.trim() !== '' && currentSessionId !== null) {
      const updatedSessions = chatSessions.map(session => {
        if (session.sessionId === currentSessionId) {
          return {
            ...session,
            messages: [
              ...session.messages,
              {
                id: session.messages.length + 1,
                user: 'John Doe',
                message: message
              }
            ]
          };
        }
        return session;
      });
      setChatSessions(updatedSessions);
      setMessage('');
    }
  };

  const handleSessionSelect = (sessionId) => {
    setCurrentSessionId(sessionId);
  };

  const currentSession = chatSessions.find(session => session.sessionId === currentSessionId);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between h-16 px-6 bg-primary text-primary-foreground shadow">

      </header>
      <div className="flex-1 flex">
        <div className="w-1/3 bg-muted p-6 border-r">
          <div className="space-y-6">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold">Chat Sessions</h1>
              <div className="space-y-4">
                {chatSessions.map(session => (
                  <div key={session.sessionId} className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleSessionSelect(session.sessionId)}>
                    <span>{session.sessionName}</span>
                    <Button size="sm" variant="outline" onClick={() => handleSessionSelect(session.sessionId)}>Continue</Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="grid gap-4">
              <h1 className="text-3xl font-bold">Start a new chat</h1>
              <p className="text-muted-foreground">Upload a file to initiate a chat session.</p>
              <div className="flex gap-2">
                <Input type="file" onChange={handleFileUpload} />
                <Button>Upload</Button>
              </div>
            </div>
            {currentSession && (
              <div className="border rounded-lg shadow">
                <div className="bg-muted p-4 rounded-t-lg">
                  <h2 className="text-lg font-medium">{currentSession.sessionName}</h2>
                </div>
                <div className="p-4 space-y-4">
                  {currentSession.messages.map(chat => (
                    <div key={chat.id} className="flex items-start gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>{chat.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="font-medium">{chat.user}</div>
                        <div className="prose text-muted-foreground">
                          <p>{chat.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentSession && (
              <div className="flex gap-2">
                <Input 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a message..."
                />
                <Button onClick={handleMessageSend}>Send</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
