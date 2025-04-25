export default function useScrollToChat() {
  return () => {
    const chatSection = document.querySelector("#chat-section");
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: "smooth" });
    }
  };
}
