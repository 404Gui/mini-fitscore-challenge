import type { Metadata } from "next";
import FormularioFitScore from "@/components/form/FormFitScore";


export const metadata: Metadata = {
  title: "FitScore - Formulário",
  description: "Copiloto de Contratação e People Analytics com IA que revoluciona processos de RH. Análise preditiva, matching inteligente e insights profundos para decisões de contratação mais assertivas.",
};

const FormPage = () => {
  return (
    <section className="all-content">
      <main className="content-page">
        <FormularioFitScore />
      </main>
    </section>
  );
};

export default FormPage;
