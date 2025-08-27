"use client";

import { useEffect, useState } from "react";
import styles from "./DashboardContent.module.css";
import { Flame, CheckCircle2, AlertTriangle, XCircle, Users, Info } from "lucide-react";

type Candidato = {
  nome: string;
  email: string;
  fitScore: number;
  classificacao: string;
};

const DashboardContent = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        const dados = JSON.parse(localStorage.getItem("candidatos") || "[]");
        setCandidatos(dados);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setErro("Não foi possível carregar os candidatos.");
      setLoading(false);
    }
  }, []);

  const candidatosFiltrados = filtro
    ? candidatos.filter((c) => c.classificacao === filtro)
    : candidatos;

  const total = candidatos.length;
  const altissimo = candidatos.filter((c) => c.classificacao === "Fit Altíssimo").length;
  const aprovado = candidatos.filter((c) => c.classificacao === "Fit Aprovado").length;

  function getIcon(classificacao: string) {
    switch (classificacao) {
      case "Fit Altíssimo":
        return <Flame color="#16a34a" size={18} />;
      case "Fit Aprovado":
        return <CheckCircle2 color="#4f46e5" size={18} />;
      case "Fit Questionável":
        return <AlertTriangle color="#f59e0b" size={18} />;
      case "Fora do Perfil":
        return <XCircle color="#dc2626" size={18} />;
      default:
        return null;
    }
  }

  function getBadgeClass(classificacao: string) {
    switch (classificacao) {
      case "Fit Altíssimo":
        return styles.badgeAltissimo;
      case "Fit Aprovado":
        return styles.badgeAprovado;
      case "Fit Questionável":
        return styles.badgeQuestionavel;
      case "Fora do Perfil":
        return styles.badgeFora;
      default:
        return "";
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div>
          <h1>Dashboard de Avaliação</h1>
          <p>O <strong>FitScore LEGAL™</strong> avalia candidatos com base em <strong>Cultura</strong>, <strong>Performance</strong> e <strong>Comportamento</strong>. Acompanhe os resultados do seu processo seletivo em tempo real.</p>
        </div>
        <button className={styles.infoBtn}>
          <Info size={18} /> Como funciona?
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.card}>
          <Users size={20} color="#4a00e0" />
          <div>
            <h3>Total de Candidatos</h3>
            <p>{total}</p>
          </div>
        </div>
        <div className={styles.card}>
          <Flame size={20} color="#16a34a" />
          <div>
            <h3>Fit Altíssimo</h3>
            <p>{altissimo}</p>
          </div>
        </div>
        <div className={styles.card}>
          <CheckCircle2 size={20} color="#4f46e5" />
          <div>
            <h3>Fit Aprovado</h3>
            <p>{aprovado}</p>
          </div>
        </div>
      </div>

      <div className={styles.filterBox}>
        <h4>Filtrar candidatos</h4>
        <div className={styles.filtros}>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className={styles.select}
          >
            <option value="">Todos</option>
            <option value="Fit Altíssimo">Fit Altíssimo</option>
            <option value="Fit Aprovado">Fit Aprovado</option>
            <option value="Fit Questionável">Fit Questionável</option>
            <option value="Fora do Perfil">Fora do Perfil</option>
          </select>
          {filtro && (
            <button onClick={() => setFiltro("")} className={styles.clearBtn}>
              Limpar
            </button>
          )}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <p className={styles.loading}>Carregando candidatos...</p>
        ) : erro ? (
          <p className={styles.error}>{erro}</p>
        ) : candidatosFiltrados.length === 0 ? (
          <p className={styles.empty}>Nenhum candidato encontrado.</p>
        ) : (
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>FitScore</th>
                <th>Classificação</th>
              </tr>
            </thead>
            <tbody>
              {candidatosFiltrados.map((c, index) => (
                <tr key={index}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.fitScore}</td>
                  <td>
                    <span className={`${styles.badge} ${getBadgeClass(c.classificacao)}`}>
                      {getIcon(c.classificacao)}
                      {c.classificacao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
