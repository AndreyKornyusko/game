import React from 'react';
import styles from './StartGameRightFighter.module.css';

const StartGameRightFighter = ({img}) => (
  <div className={styles.fighterimgWrap}>
  <img className={styles.fighterImgRight} src={img} alt="fighter img" />
</div>

)

export default StartGameRightFighter;