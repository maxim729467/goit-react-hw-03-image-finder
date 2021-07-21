import React from "react";
import styles from "./Placeholder.module.css";

export default function Placeholder({ text }) {
  return (
    <section className={styles.Placeholder}>
      <h1 className={styles.title}>{text}</h1>
    </section>
  );
}
