import styles from './header.module.scss';

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <img src="/assets/bityf.svg" alt="logo" />
        </div>
      </header>
    </>
  );
}
