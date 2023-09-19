import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.test}>
      <div className={styles["loader-container"]}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
};

export default Loading;