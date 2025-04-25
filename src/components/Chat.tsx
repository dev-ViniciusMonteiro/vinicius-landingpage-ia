"use client";
import { useState } from "react";
import BackgroundImage from "./Chat/BackgroundImage";
import ChatInput from "./Chat/ChatInput";
import ChatResponse from "./Chat/ChatResponse";
import "../styles/home.css"; // Import the CSS file

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    const message = userInput.trim();
    if (!message) return;

    const updatedHistory = [...history, { role: "user", content: message }];
    setHistory(updatedHistory);
    setUserInput("");
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageHistory: updatedHistory }),
      });

      const data = await res.json();
      setResponse(data.result || "⚠️ Sem resposta da IA.");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResponse(`Erro: ${err.message}`);
      } else {
        setResponse("Erro: Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <BackgroundImage src="/universe_right_half.png" alt="Vinicius Monteiro" />
      <div className="chat-content">
        <h2 className="chat-title">
          Meu portfólio em tempo real? Fale com a VMAI 🤖
        </h2>
        <div className="chat-elements">
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            sendMessage={sendMessage}
            loading={loading}
          />
          <ChatResponse response={response} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
