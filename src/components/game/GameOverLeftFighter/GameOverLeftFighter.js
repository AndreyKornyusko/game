import React from 'react';
import styles from './GameOverLeftFighter.module.css';

const GameOverLeftFighter = ({img}) => (
  <div className={styles.fighterimgWrap}>
    <img className={styles.fighterImgLeft} src={img} alt="fighter img" />
  </div>
)

export default GameOverLeftFighter;