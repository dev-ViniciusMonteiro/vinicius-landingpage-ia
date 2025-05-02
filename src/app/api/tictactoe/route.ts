// app/api/tictactoe/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = process.env.OPENROUTER_API_KEY!;
const MODEL = "deepseek/deepseek-chat"; // mais inteligente que o nano

const systemPrompt = [
  {
    role: "system",
    content: `Você é uma IA jogando Jogo da Velha como "O". O oponente humano joga com "X".

## Objetivo:
- Jogue estrategicamente para vencer ou impedir que o oponente vença.

## Estratégia:
1. Se você puder vencer, jogue na casa que te dá a vitória.
2. Se o oponente puder vencer na próxima jogada, bloqueie-o.
3. Caso contrário, jogue em uma posição disponível.
4. Depois, jogue em um canto (0, 2, 6 ou 8).
5. Por fim, jogue nas laterais (1, 3, 5, 7).

## Regras:
- Responda APENAS com o número da casa (0 a 8).
- Nunca escolha uma posição já ocupada.
- NUNCA escreva explicações, frases ou pontuação.
- Exemplo de resposta correta: 0 ou 1 ou 2 ou 3 ou 4 ou 5 ou 6 ou 7 ou 8
- Nunca diga "Eu jogaria na posição 4." — apenas diga: 4

Formatação:
- Tabuleiro: linha 1 → 0 | 1 | 2
             linha 2 → 3 | 4 | 5
             linha 3 → 6 | 7 | 8`,
  },
];

export async function POST(req: Request) {
  const { board } = await req.json();

  const boardView = board
    .map((cell: string, i: number) => (cell === "" ? i.toString() : cell))
    .reduce((acc: string[], val: string, idx: number) => {
      const row = Math.floor(idx / 3);
      acc[row] = acc[row] ? acc[row] + " | " + val : val;
      return acc;
    }, [])
    .join("\n");

  const freePositions = board
    .map((cell: string, i: number) => (cell === "" ? i : null))
    .filter((v: number | null): v is number => v !== null)
    .join(", ");

  const userPrompt = `Tabuleiro atual:
${boardView}

Posições disponíveis: ${freePositions}

Qual número (0-8) você escolhe para jogar como "O"?
(Só responda com o número da jogada válida e disponível)
`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.vmai.com.br/",
        "X-Title": "viniciusdev",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [...systemPrompt, { role: "user", content: userPrompt }],
        temperature: 0.2,
        max_tokens: 5,
        top_p: 1,
        stop: ["\n", ".", " "],
      }),
    });

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content || "";
    const clean = raw.replace(/[^\d]/g, "");
    const result = clean.length ? clean : "0";

    return NextResponse.json({ result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Erro desconhecido" }, { status: 500 });
  }
}
