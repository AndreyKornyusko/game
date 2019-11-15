import React from 'react';
import styles from './FinishGameLeftFighter.module.css';

const FinishGameLeftFighter = ({img}) => (
  <div className={styles.fighterimgWrap}>
    <img className={styles.fighterImgLeft} src={img} alt="fighter img" />
  </div>
)

export default FinishGameLeftFighter;