"use client";
import { useState } from "react";
import BackgroundImage from "./Chat/BackgroundImage";
import "../styles/selectGame.css";
import { JSX } from "react/jsx-runtime";
import "../styles/selectGame.css";
import TicTacToe from "./games/TicTacToe";
import Chess from "./games/Chess";
import Checkers from "./games/Checkers";

const games = [
  { label: "Jogo da Velha", component: <TicTacToe /> },
  { label: "Xadrez", component: <Chess /> },
  { label: "Damas", component: <Checkers /> },
];

export default function SelectGame() {
  const [selectedGame, setSelectedGame] = useState<JSX.Element | null>(null);

  if (selectedGame) {
    return (
      <div className="game-container">
        <BackgroundImage src="/universe_right_half.png" alt="Vinicius Monteiro" />
        {selectedGame}
      </div>
    );
  }

  return (
    <div className="chat-container center-content">
      <BackgroundImage src="/universe_right_half.png" alt="Vinicius Monteiro" />
      <div className="chat-content">
        <h2 className="chat-title">🎮 Jogue contra a VMAI</h2>
        <p className="chat-subtitle">Escolha um jogo para começar</p>

        <div className="button-group">
          {games.map((game, index) => (
            <button
              key={index}
              className="chat-button"
              onClick={() => setSelectedGame(game.component)}
            >
              {game.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
