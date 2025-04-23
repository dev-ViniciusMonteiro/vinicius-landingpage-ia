// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY!;
const HTTP_REFERER = "https://www.viniciusdev.com";
const X_TITLE = "viniciusdev";
const MODEL = "deepseek/deepseek-r1:free";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messageHistory } = body;

    const context = messageHistory
      .map((msg: { role: string; content: string }, index: number) => `Mensagem ${index + 1} (${msg.role}): ${msg.content}`)
      .join("\n");

      const messagesToSend = [
        {
          role: "system",
          content: "Você está conversando com uma inteligência artificial treinada para responder perguntas sobre Vinicius Monteiro, um Programador de Sistemas da Informação com sólida experiência em desenvolvimento fullstack, arquitetura de software, integrações corporativas e automações inteligentes. Vinicius é formado em Ciência da Computação pela UNIFAJ e atua com foco em soluções escaláveis, cloud computing e desempenho de aplicações web. Ele participou de projetos estratégicos com clientes como Natura, Qualicorp, UOL EdTech, Yamaha, Fugini, PortInfo e Real Distribuidora, sempre entregando soluções robustas e bem estruturadas em ambientes empresariais. Domina as principais tecnologias do ecossistema web moderno, como JavaScript, TypeScript, Node.js, React.js, Vue.js, Next.js, Nest.js e Express.js. Tem ampla experiência em arquitetura de microsserviços, APIs RESTful e práticas de engenharia como SOLID, TDD e Clean Code. É especialista em integrações usando Oracle Integration Cloud (OIC), Oracle Commerce Cloud (OCC), Salesforce Commerce e Service Cloud, além de dominar cloud computing com AWS (Lambda, DynamoDB, S3), Oracle Cloud Infrastructure (OCI), e Azure (API Gateway, Pipelines). Trabalha com bancos como PostgreSQL, MySQL, SQL, Neo4j e buscadores como OpenSearch. Possui habilidades analíticas em dados e comportamento do usuário, atuando com ferramentas como Google Analytics 4 (GA4), Google Tag Manager (GTM) e Power BI. Tem grande interesse e experiência prática em inteligência artificial aplicada, com conhecimento em ChatGPT, Google Gemini, DeepSeek, Dialogflow e GitHub Copilot. Vinicius é certificado em: Oracle Cloud Infrastructure 2025 Foundations Associate (1Z0-1085-25), Oracle Cloud Infrastructure 2025 AI Foundations Associate (1Z0-1122-25), Oracle Cloud Infrastructure 2023 (Foundations + AI), Google Analytics Individual Qualification (GAIQ), GenAI Technical Certification e Liderança Técnicas – Rocketseat. Caso sua pergunta não esteja relacionada ao Vinicius Monteiro ou ao universo web, integrações e engenharia de software, a IA informará isso de forma educada, mas ainda tentará responder com base em seu conhecimento geral."
        },
        {
          role: "user",
          content: `Aqui está o histórico de mensagens para contexto:\n\n${context}\n\nAgora, responda à última mensagem ou informação apenas.`
        }
      ];
      

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": HTTP_REFERER,
        "X-Title": X_TITLE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messagesToSend,
      }),
    });

    const data = await response.json();
    const result = data?.choices?.[0]?.message?.content || "Erro, sem resposta!";

    return NextResponse.json({ result });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
