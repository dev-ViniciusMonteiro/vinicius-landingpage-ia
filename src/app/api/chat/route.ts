// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import { systemPrompt } from "./prompts";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY!;
const HTTP_REFERER = "https://www.viniciusdev.com";
const X_TITLE = "viniciusdev";
const MODEL = "openai/gpt-4.1-nano";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messageHistory } = body;

    const context = messageHistory
      .slice(-5) // Get only the last 5 messages
      .map((msg: { role: string; content: string }, index: number) => `Mensagem ${index + 1} (${msg.role}): ${msg.content}`)
      .join("\n");

      systemPrompt.push({
        role: "user",
        content: `Histórico de mensagens para contexto:\n\n${context}\n\nAgora, responda à última mensagem ou informação apenas.`
      })
      
      

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
        messages: systemPrompt,
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
