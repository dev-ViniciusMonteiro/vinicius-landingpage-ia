import "@/styles/home.css";

const ChatInput = ({
  userInput,
  setUserInput,
  sendMessage,
  loading,
}: {
  userInput: string;
  setUserInput: (value: string) => void;
  sendMessage: () => void;
  loading: boolean;
}) => (
  <div className="chat-input-container">
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyDown={(e) => !loading && e.key === "Enter" && sendMessage()}
      className="chat-input-field"
      placeholder="Digite sua pergunta a VMAI..."
      disabled={loading}
    />
    <button
      onClick={sendMessage}
      className={`chat-input-button ${loading ? "loading" : ""}`}
      disabled={loading}
    >
      Perguntar
    </button>
  </div>
);

export default ChatInput;
