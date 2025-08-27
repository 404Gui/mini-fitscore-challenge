"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

type Candidato = {
  nome: string;
  email: string;
  fitScore: number;
  classificacao: string;
};

export default function ProcessamentoAssincrono() {
  useEffect(() => {
    const interval = setInterval(() => {
      const dados: Candidato[] = JSON.parse(localStorage.getItem("candidatos") || "[]");
      const aprovados = dados.filter((c) => c.fitScore >= 60);

      if (aprovados.length > 0) {
        Swal.fire({
          icon: "info",
          title: "Relatório Enviado",
          text: `${aprovados.length} candidatos enviados ao gestor LEGAL.`,
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
