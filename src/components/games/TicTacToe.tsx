"use client";

import { useState } from "react";

// Estado inicial do tabuleiro
const initialBoard = Array(9).fill("");

export default function TicTacToe() {
  const [board, setBoard] = useState<string[]>([...initialBoard]);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  // Combinações que levam à vitória
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Checa se alguém venceu ou empatou
  const checkWinner = (b: string[]): string | null => {
    for (const [a, b1, c] of winningCombos) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return b.every(cell => cell !== "") ? "draw" : null;
  };

  const handleClick = async (index: number) => {
    if (!isUserTurn || board[index] !== "" || winner) return;

    const updated = [...board];
    updated[index] = "X";
    setBoard(updated);

    const result = checkWinner(updated);
    if (result) {
      setWinner(result);
      return;
    }

    setIsUserTurn(false);
    setLoading(true);

    try {
      const res = await fetch("/api/tictactoe", {
        method: "POST",
        body: JSON.stringify({ board: updated }),
      });

      const data = await res.json();
      const aiMove = parseInt(data?.result?.toString().trim());

      if (!isNaN(aiMove) && updated[aiMove] === "") {
        updated[aiMove] = "O";
      }

      const finalResult = checkWinner(updated);
      setBoard(updated);
      setWinner(finalResult);
    } catch (err) {
      console.error("Erro ao buscar jogada da IA", err);
    } finally {
      setLoading(false);
      setIsUserTurn(true);
    }
  };

  const restart = () => {
    setBoard([...initialBoard]);
    setWinner(null);
    setIsUserTurn(true);
    setLoading(false);
  };

  const statusMessage = winner
    ? winner === "draw"
      ? "Empate!"
      : winner === "X"
      ? "Você venceu! 🎉"
      : "A IA venceu!"
    : loading
    ? "IA pensando..."
    : "Sua vez!";

  return (
    <div className="game-fullscreen flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-3xl font-bold mb-6">Jogo da Velha</h1>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-20 h-20 text-3xl border border-white text-white flex items-center justify-center hover:bg-white/10 transition"
            disabled={!!winner || cell !== ""}
          >
            {cell}
          </button>
        ))}
      </div>

      <p className="mt-4 text-lg">{statusMessage}</p>

      {winner && (
        <button
          onClick={restart}
          className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Jogar novamente
        </button>
      )}
    </div>
  );
}
