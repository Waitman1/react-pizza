import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <icon>😕</icon>
        <br />
        Ничего не найдено
      </h1>
    </div>
  );
};

export default NotFoundBlock;
