"use client";

import SobreMim from "@/components/SobreMim";
import Chat from "@/components/Chat";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToChat = () => {
    const chatSection = document.querySelector("#chat-section");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white">
        <SobreMim />
      </div>
      <div id="chat-section" className="w-full md:w-1/2 bg-gray-50">
        <Chat />
      </div>
      {isMobile && (
        <button
          onClick={scrollToChat}
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        >
          💬
        </button>
      )}
    </main>
  );
}
