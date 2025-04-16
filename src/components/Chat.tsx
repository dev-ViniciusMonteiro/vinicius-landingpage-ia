"use client";

import { useState } from "react";
import Image from "next/image";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResponse(`Erro: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Imagem de fundo com opacidade visível */}
      <div className="inset-0 -z-10">
        <Image
          src="/viniciusrobot.png"
          alt="Vinicius Monteiro"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-5"
        />
      </div>

      {/* Conteúdo centralizado */}
      <div className="w-full max-w-3xl px-4 flex flex-col items-center justify-center min-h-screen z-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-center">
        Use o chat para saber mais sobre minha jornada profissional, áreas de atuação e muito mais. 🤖
        </h2>

        <div className="w-full flex flex-col gap-8">
          {/* Input */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col md:flex-row items-stretch gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 rounded-md bg-[#1f232c] text-white border border-gray-700 outline-none"
              placeholder="Digite sua pergunta..."
            />
            <button
              onClick={sendMessage}
              className="px-6 py-2 rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Perguntar
            </button>
          </div>

          {/* Resposta */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[100px] whitespace-pre-wrap text-sm">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
                Carregando resposta...
              </div>
            ) : (
              response || "Envie uma pergunta para começar."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
