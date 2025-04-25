import "@/styles/home.css";

const ChatResponse = ({
  response,
  loading,
}: {
  response: string;
  loading: boolean;
}) => {
const formatResponse = (text: string) => {
    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/https?:\/\/[^\s)>\]]+/g, (url) => {
            const cleanUrl = url.replace(/[)\]"']*$/, "");
            return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${cleanUrl}</a>`;
        });
    return { __html: formattedText };
};

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 min-h-[100px] max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-300px)] overflow-y-auto whitespace-pre-wrap text-sm">
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full"></div>
          Carregando resposta...
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={formatResponse(
            response ||
              'Olá! Sou a VMAI, a assistente pessoal do Vinicius Monteiro Orlandi. Posso ajudá-lo a obter informações sobre a carreira, trajetória, habilidades e conquistas profissionais do Vinicius. Você pode me perguntar, por exemplo: \n\n- Pode montar o portfólio de Vinicius detalhado?\n- O que é VMAI?\n\nFique à vontade para fazer suas perguntas!'
          )}
        />
      )}
    </div>
  );
};

export default ChatResponse;
