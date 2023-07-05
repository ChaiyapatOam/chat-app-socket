import { useNavigate } from "react-router-dom";
import ChatSideBar from "../components/ChatSideBar";
import { useEffect, useState } from "react";
const Chat = ({ socket }: { socket: any }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
    socket.emit("message", {
      text: message,
      name: localStorage.getItem("userName"),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    setMessage("");
  };
  useEffect(() => {
    socket.on("messageResponse", (data: string) =>
      setMessages([...messages, data])
    );
  }, [socket, messages]);

  return (
    <div className="chat">
      <ChatSideBar />
      <div className="chat__main">
        <header className="chat__mainHeader">
          <p>Hangout with Colleagues</p>
          <button className="leaveChat__btn" onClick={handleLeaveChat}>
            LEAVE CHAT
          </button>
        </header>

        {/*This shows messages sent from you*/}
        <div className="message__container">
          <div className="message__chats">
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>Hello there</p>
            </div>
          </div>

          {/*This shows messages received by you*/}
          <div className="message__chats">
            <p>Other</p>
            <div className="message__recipient">
              <p>Hey, I'm good, you?</p>
            </div>
          </div>

          {/*This is triggered when a user is typing*/}
          <div className="message__status">
            <p>Someone is typing...</p>
          </div>
        </div>
        {/*  Chat Message */}
        <div className="chat__footer">
          <form className="form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Write message"
              className="message"
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="sendBtn">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
