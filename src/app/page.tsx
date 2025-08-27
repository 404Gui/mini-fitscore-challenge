import DashboardContent from "@/components/dashboard/DashboardContent";
import ProcessamentoAssincrono from "@/components/ProcessamentoAssincrono";

const HomePage = () => {
  return (
    <section className="all-content">
      <main className="content-page">
        <DashboardContent />
        <ProcessamentoAssincrono/>
      </main>
    </section>
  );
};

export default HomePage;
