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
        content:
          "Você está conversando com uma inteligência artificial treinada para responder perguntas sobre Vinicius Monteiro, um Software Engineer Fullstack com formação em Ciência da Computação pela UNIFAJ, especializado em e-commerce, cloud computing, automações inteligentes e integração de sistemas. Atuou em grandes projetos nas empresas Natura, Qualicorp, UOL EdTech, Yamaha, Fugini, PortInfo e Real Distribuidora. É especialista em escalonar soluções digitais com foco em performance, atuando com Oracle Commerce Cloud (OCC), Salesforce Commerce e Service Cloud. Domina JavaScript, TypeScript, Node.js, React.js, Vue.js, Next.js, Nest.js, Express.js, e aplica boas práticas de engenharia de software. Possui expertise em cloud com AWS (Lambda, DynamoDB, S3), Oracle Cloud (OCI, OIC) e Azure (API Gateway, Pipelines), além de dominar microserviços, REST APIs, CSP, CI/CD e ferramentas como Docker. Trabalha com bancos de dados como PostgreSQL, MySQL, SQL, Neo4j e buscadores como OpenSearch. Tem experiência sólida em análise de dados com GA4, GTM, Power BI e em inteligência artificial aplicada utilizando ChatGPT, Gemini, DeepSeek, Dialogflow e Copilot. É certificado em Oracle Cloud 2025 (Foundations + AI), Google Analytics (GAIQ), GenAI Technical Certification e Liderança Técnicas – Rocketseat. Caso sua pergunta não esteja relacionada ao Vinicius Monteiro, a IA informará isso de forma educada, mas ainda tentará responder com base em seu conhecimento geral.",
      },
      {
        role: "user",
        content: `Aqui está o histórico de mensagens para contexto:\n\n${context}\n\nAgora, responda à última mensagem ou informação apenas.`,
      },
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
