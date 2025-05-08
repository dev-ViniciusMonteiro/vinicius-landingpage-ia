// src/app/api/chat/route.ts
import { NextResponse } from "next/server";

const API_URL = process.env.API_URL as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch(API_URL + '/chat', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}