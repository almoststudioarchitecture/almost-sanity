import styles from '../../css/InteractiveLogo.module.css';

export default function InteractiveLogo() {
  return (

<div id={styles.logo}>
    <div className={styles.a}>
        <div></div>
        <div className={styles.bottom}></div>
    </div>
    <div className={styles.l}>
        <div className={`${styles.top} ${styles.right}`}></div>
    </div>
    <div className={styles.m}>
        <div className={styles.bottom}></div>
        <div className={styles.bottom}></div>
    </div>
    <div className={styles.o}>
        <div className={styles.center}></div>
    </div>
    <div className={styles.s}>
        <div className={styles.right}></div>
        <div className={styles.left}></div>
    </div>
    <div className={styles.t}>
        <div className={`${styles.bottom} ${styles.left}`}></div>
        <div className={`${styles.bottom} ${styles.right}`}></div>
    </div>
    <div className={styles.gap}></div>

    <div className={styles.s}>
        <div className={styles.right}></div>
        <div className={styles.left}></div>
    </div>
    <div className={styles.t}>
        <div className={`${styles.bottom} ${styles.left}`}></div>
        <div className={`${styles.bottom} ${styles.right}`}></div>
    </div>
    <div className={styles.u}>
        <div className={styles.top}></div>
    </div>
    <div className={styles.d}>
        <div className={`${styles.right} ${styles.top}`}></div>
        <div className={`${styles.right} ${styles.bottom}`}></div>
        <div></div>
    </div>
    <div className={styles.i}>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
    </div>
    <div className={styles.o}>
        <div className={styles.center}></div>
    </div>
</div>


  );
}
