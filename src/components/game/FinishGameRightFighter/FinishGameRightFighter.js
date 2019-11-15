import React from 'react';
import styles from './FinishGameRightFighter.module.css';

const FinishGameRightFighter = ({img}) => (
  <div className={styles.fighterimgWrap}>
  <img className={styles.fighterImgRight} src={img} alt="fighter img" />
</div>

)

export default FinishGameRightFighter;