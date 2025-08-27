import Link from "next/link";
import styles from "./styles.module.css";
import { Brain } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            <Brain className={styles.brainIcon} />
            FitScore LEGAL™
          </div>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navItem}>
            Dashboard
          </Link>
          <Link href="/formulario" className={styles.navItem}>
            Formulário
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
