"use client";

import { useState } from "react";
import { TrendingUp, Zap, Users } from "lucide-react";
import Swal from "sweetalert2";
import styles from "./FormFitScore.module.css";

type Respostas = { [key: string]: number };

type Candidato = {
  nome: string;
  email: string;
  respostas: Respostas;
  fitScore: number;
  classificacao: string;
};

const blocos: Record<string, { perguntas: string[]; icon: React.ReactNode }> = {
  Performance: {
    perguntas: ["Experiência", "Entregas", "Habilidades"],
    icon: <TrendingUp className={styles.icon} />,
  },
  Energia: {
    perguntas: ["Disponibilidade", "Prazos", "Pressão"],
    icon: <Zap className={styles.icon} />,
  },
  Cultura: {
    perguntas: [
      "Visão Viva",
      "Execução Energizada",
      "Resultados com Ressonância",
      "Alinhamento com Alma",
    ],
    icon: <Users className={styles.icon} />,
  },
};

export default function FormularioFitScore() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [respostas, setRespostas] = useState<Respostas>({});
  const [resultado, setResultado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(pergunta: string, valor: number) {
    if (valor < 1 || valor > 10) return;
    setRespostas((prev) => ({ ...prev, [pergunta]: valor }));
  }

  function calcularFitScore() {
    const valores = Object.values(respostas);

    if (!nome || !email) {
      Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha nome e e-mail antes de enviar!",
      });
      return;
    }

    if (valores.length < 10) {
      Swal.fire({
        icon: "warning",
        title: "Formulário incompleto",
        text: "Responda todas as 10 perguntas antes de enviar!",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const soma = valores.reduce((acc, v) => acc + v, 0);

      let classificacao = "";
      if (soma >= 80) classificacao = "Fit Altíssimo";
      else if (soma >= 60) classificacao = "Fit Aprovado";
      else if (soma >= 40) classificacao = "Fit Questionável";
      else classificacao = "Fora do Perfil";

      setResultado(`${soma} pontos — ${classificacao}`);

      const candidato: Candidato = {
        nome,
        email,
        respostas,
        fitScore: soma,
        classificacao,
      };

      const candidatos = JSON.parse(localStorage.getItem("candidatos") || "[]");
      candidatos.push(candidato);
      localStorage.setItem("candidatos", JSON.stringify(candidatos));

      Swal.fire({
        icon: "success",
        title: "Notificação enviada!",
        html: `
          <p><strong>${nome}</strong>, seu resultado foi processado.</p>
          <p><strong>FitScore:</strong> ${soma}</p>
          <p><strong>Classificação:</strong> ${classificacao}</p>
          <hr/>
          <small>Email enviado para <strong>${email}</strong></small>
        `,
      });

      setNome("");
      setEmail("");
      setRespostas({});
      setLoading(false);
    }, 1500);
  }

  const progresso = (Object.keys(respostas).length / 10) * 100;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Formulário FitScore</h1>

      <div className={styles.progressBar}>
        <div style={{ width: `${progresso}%` }} />
      </div>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Nome do candidato"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="E-mail do candidato"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.blocosWrapper}>
        {Object.entries(blocos).map(([titulo, { perguntas, icon }]) => (
          <div key={titulo} className={styles.blocoCard}>
            <div className={styles.blocoHeader}>
              {icon}
              <h2>{titulo}</h2>
            </div>
            {perguntas.map((pergunta, idx) => (
              <div key={pergunta} className={styles.pergunta}>
                <label htmlFor={`${titulo}-${idx}`}>{pergunta}</label>
                <input
                  id={`${titulo}-${idx}`}
                  type="number"
                  min={1}
                  max={10}
                  value={respostas[pergunta] ?? ""}
                  onChange={(e) =>
                    handleChange(pergunta, Number(e.target.value))
                  }
                  className={styles.numberInput}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={calcularFitScore}
        className={styles.botao}
        disabled={loading}
      >
        {loading ? "Processando..." : "Enviar"}
      </button>

      {resultado && <p className={styles.resultado}>{resultado}</p>}
    </div>
  );
}
