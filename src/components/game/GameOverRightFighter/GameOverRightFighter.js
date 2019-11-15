import React from 'react';
import styles from './GameOverRightFighter.module.css';

const GameOverRightFighter = ({ img, isFall }) => (
  <div className={styles.fighterimgWrap}>
    <img className={styles.fighterImgRight} src={img} alt="fighter img"
      style={{
        right: isFall && '-60px',
        bottom: isFall && '-60px',
      }}

    />
  </div>

)

export default GameOverRightFighter;