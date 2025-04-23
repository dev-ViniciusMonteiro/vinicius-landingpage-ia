# 💬 viniciusdev-ia-chatbot

Projeto desenvolvido com foco em uma experiência moderna e interativa, unindo um portfólio pessoal à integração com inteligência artificial. Criado com **Next.js (App Router)**, **React**, **TypeScript** e **CSS puro**, o layout é inspirado em referências como **Starlink** e **Rocketseat**.

---

## ✨ Funcionalidades

- Interface moderna e responsiva com design escuro
- Seção **Sobre Mim** com informações profissionais, certificações e tecnologias
- Seção **Chat com IA** com comunicação via API do [OpenRouter.ai](https://openrouter.ai/)
- Histórico de mensagens mantido para contexto nas respostas
- Estilização 100% em CSS puro, com organização modular
- Imagem de fundo personalizada e discreta (`viniciusrobot.png`)
- Suporte completo a desktop e mobile

---

## 🧠 Tecnologias Utilizadas

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [React + TypeScript](https://reactjs.org/)
- [CSS Puro](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [OpenRouter API](https://openrouter.ai/)
- [Marked.js](https://marked.js.org/) – renderização de Markdown na resposta da IA

---

## 📁 Estrutura do Projeto

src/ ├── app/ │ └── api/ │ └── chat/ │ └── route.ts # Rota para consumo da IA (OpenRouter) ├── components/ │ ├── SobreMim.tsx # Seção pessoal com habilidades e certificações │ └── Chat.tsx # Interface e lógica do chat com IA ├── data/ │ └── personalInfo.ts # Dados usados na seção Sobre Mim ├── styles/ │ └── sobre-mim.css # CSS modularizado do Sobre Mim public/ └── viniciusrobot.png # Imagem de fundo do chat

yaml
Copy
Edit

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/dev-ViniciusMonteiro/viniciusdev-ia-chatbot.git
cd viniciusdev-ia-chatbot
2. Instale as dependências

npm install
3. Configure a chave da IA
Crie um arquivo .env.local na raiz do projeto com a seguinte variável:


OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Você pode gerar sua chave no site: https://openrouter.ai/

4. Execute o projeto localmente

npm run dev
Acesse no navegador: http://localhost:3000

🔌 Teste da API via Postman
Endpoint:
POST /api/chat
Body (JSON):
{
  "messageHistory": [
    { "role": "user", "content": "Qual a capital do Brasil?" }
  ]
}
📸 Prints da Interface
(Adicione suas capturas de tela em public/ para visualização visual no README)

![Sobre Mim](./public/preview-sobremim.png)
![Chat com IA](./public/preview-chat.png)
👨‍💻 Sobre o Autor
Vinicius Monteiro

🔗 viniciusdev.com

💼 LinkedIn

💻 GitHub

📄 Licença
Este projeto está licenciado sob a MIT License.


Se quiser, posso gerar esse `README.md` direto como um arquivo `.md` e colocar no canvas para você revisar. Deseja isso?






