import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <h1 className={styles.title}>Resturant App</h1>
      <p className={styles.description}>
        Welcome to the Home Page
      </p>
    </main>
  );
}
