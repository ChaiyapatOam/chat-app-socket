import "./App.css";
import { socket } from "../lib/socket";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Chat from "./views/Chat";

function App() {
  function log() {
    console.log("connected!");
  }
  socket.on("connect", log);

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<Chat socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
