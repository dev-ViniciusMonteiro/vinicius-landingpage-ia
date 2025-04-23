"use client";
import Image from "next/image";
import "@/styles/sobre-mim.css";

const SobreMim = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Imagem de fundo com opacidade visível */}
      <div className="inset-0 -z-10">
        <Image
          src="/universe_left_half.png"
          alt="Vinicius Monteiro"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-25"
        />
      </div>

      {/* Conteúdo */}
      <div className="sobre-content align-center flex flex-col justify-center items-center h-screen p-4">
        <h1 className="sobre-title">Vinicius Monteiro</h1>
        <p className="sobre-subtitle flex items-center gap-2">
    <Image 
      src="/myLogo.png" 
      alt="Logo Vinicius" 
      width={24} 
      height={24} 
      className="w-6 h-6" 
    />
    Software Engineer
  </p>

        <div className="sobre-box">
          <p className="sobre-text">
            Código é apenas o começo. O que me diferencia é a capacidade de transformar problemas complexos em soluções elegantes e escaláveis.
          </p>
          <p className="sobre-text">
            Conheça essa mentalidade em ação conversando com a VMAI, minha IA pessoal que apresenta minha história profissional como ninguém.
          </p>
        </div>
{/*  
        <div className="sobre-cards">
          <div className="sobre-card">
            <h3 className="sobre-card-title">💻 Tecnologias</h3>
            <ul>
              <li>Node.js, TypeScript, React.js, Vue.js, Next.js, Nest.js</li>
              <li>AWS, Azure, Oracle Cloud, Lambda, OIC</li>
              <li>DynamoDB, PostgreSQL, Neo4j, OpenSearch</li>
            </ul>
          </div>

          <div className="sobre-card">
            <h3 className="sobre-card-title">📜 Certificações</h3>
            <ul>
              <li>Oracle Cloud 2025 (Foundations + AI)</li>
              <li>Google Analytics (GAIQ)</li>
              <li>Liderança Técnicas – Rocketseat</li>
              <li>GenAI Technical Certification</li>
            </ul>
          </div>
        </div> */}

        <div className="sobre-links">
          <a href="https://github.com/dev-ViniciusMonteiro" target="_blank">GitHub</a>
          <a href="https://linkedin.com/in/vinicius-monteiro-orlandi/" target="_blank">LinkedIn</a>
          <span>Email: dev.viniciusmonteiro@gmail.com</span>
          <span>📍 Mogi Guaçu - SP</span>
        </div>
      </div>
    </div>
  );
};

export default SobreMim;
