import React from 'react';
import styles from './GameOverRightFighter.module.scss';

const GameOverRightFighter = ({ img, isFall }) => (
  <div className={styles.fighterimgWrap}>

    <img className={styles.fighterImgRightMobile} src={img} alt="fighter img"
      style={{
        right: isFall && '-10px',
        bottom: isFall && '-30px',
      }}
    />

    <img className={styles.fighterImgRight} src={img} alt="fighter img"
      style={{
        right: isFall && '-60px',
        bottom: isFall && '-120px',
      }}
    />
  </div>

)

export default GameOverRightFighter;