import React from 'react';
import styles from './StartGameLeftFighter.module.scss';

const StartGameLeftFighter = ({img}) => (
  <div className={styles.fighterimgWrap}>
    <img className={styles.fighterImgLeft} src={img} alt="fighter img" />
  </div>
)

export default StartGameLeftFighter;