import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <main className={styles.layout}>
      <p className={styles.lead}>Flipnote Player</p>
      <h1 className={styles.title}>Welcome</h1>
      <p className={styles.blurb}>
        Vite, React, TypeScript, Tailwind&nbsp;4, SCSS modules, and Cloudflare Workers are wired
        up. Static files under <code className={styles.code}>public/</code> are served as before.
      </p>
      <Link className={styles.link} to="/missing-route-example">
        Try a client route (404 demo)
      </Link>
    </main>
  );
}
