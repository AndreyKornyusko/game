import React from 'react';
import styles from './FinishGameLeftFighter.module.scss';

const FinishGameLeftFighter = ({img}) => (
  <div className={styles.fighterimgWrap}>
    <img className={styles.fighterImgLeft} src={img} alt="fighter img" />
    <img className={styles.fighterImgLeftMobile} src={img} alt="fighter img" />
    <img className={styles.fighterImgLeftTablet} src={img} alt="fighter img" />
  </div>
)

export default FinishGameLeftFighter;