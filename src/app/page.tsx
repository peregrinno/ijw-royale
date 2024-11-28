"use client";
import { useEffect, useState } from "react";

// Tipagem para a partícula
interface Particle {
  id: string;
  left: number; // Posição horizontal aleatória (em porcentagem)
  size: number; // Tamanho aleatório
  opacity: number; // Opacidade aleatória
  duration: number; // Tempo de duração da animação
}

// Função para gerar uma partícula com propriedades aleatórias
const generateParticle = (): Particle => ({
  id: Math.random().toString(36).substr(2, 9),
  left: Math.random() * 100,
  size: Math.random() * 4 + 1,
  opacity: Math.random() * 0.7 + 0.2,
  duration: Math.random() * 2 + 3,
});

export default function Page() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles((prev) => [...prev, generateParticle()]);
    }, 100); // Gera uma partícula a cada 100ms

    return () => clearInterval(particleInterval); // Limpa o intervalo quando o componente é desmontado
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "#242424",
        flexDirection: "column"
      }}
    >
      <h1
        style={{
          fontFamily: "'Bungee', sans-serif",
          fontSize: "3.5rem",
          position: "relative",
          zIndex: 10,
          color: "#fff",
          textShadow: "0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4)",
          marginBottom: "0px"
        }}
      >
        IJW ROYALE
      </h1>
      <p
        style={{
          marginTop: "0px",
          fontFamily: "'Bungee', sans-serif",
          fontSize: "2rem",
          zIndex: 10,
          color: "#f7a40f",
          textShadow: "0 0 5px rgba(247, 164, 15, 0.8), 0 0 10px rgba(247, 164, 15, 0.6), 0 0 15px rgba(247, 164, 15, 0.4)",
        }}>
        Rumo a santidade!
      </p>

      {/* Gerando partículas no fundo */}
      {
        particles.map((particle) => (
          <div
            key={particle.id}
            style={{
              position: "absolute",
              top: "-10px", // Partículas começam um pouco acima da tela
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: particle.opacity,
              animation: `fall ${particle.duration}s linear infinite`,
            }}
          />
        ))
      }
    </div >
  );
}
