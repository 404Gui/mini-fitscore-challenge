"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, Menu, X } from "lucide-react";
import styles from "./styles.module.css";

const HeaderMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.headerMobile}>
      <div className={styles.topBar}>
        <div className={styles.logo}>
          <Brain className={styles.brainIcon} />
          FitScore LEGAL™
        </div>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <nav className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <Link href="/" className={styles.menuItem} onClick={() => setMenuOpen(false)}>
          Dashboard
        </Link>
        <Link href="/formulario" className={styles.menuItem} onClick={() => setMenuOpen(false)}>
          Formulário
        </Link>
      </nav>
    </header>
  );
};

export default HeaderMobile;
