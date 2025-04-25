"use client";

import SobreMim from "@/components/SobreMim";
import Chat from "@/components/Chat";
import useIsMobile from "@/hooks/useIsMobile";
import useScrollToChat from "@/hooks/useScrollToChat";

export default function HomePage() {
  const { isMobile, isAtBottom } = useIsMobile();
  const scrollToChat = useScrollToChat();

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white">
        <SobreMim />
      </div>
      <div id="chat-section" className="w-full md:w-1/2 bg-gray-50">
        <Chat />
      </div>
      {isMobile && !isAtBottom && (
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
