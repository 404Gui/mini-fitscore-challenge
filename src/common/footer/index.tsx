import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Desafio Técnico LEGAL — Desenvolvido por <strong>Guilherme Pappi</strong>
      </p>
    </footer>
  );
}
