import React, { Component } from 'react';
import styles from './game.module.css';

import sound from '../../assets/sounds/TheSubway.mp3';

const Game = () => (
  <div>
    <h2 className={styles.title}>Let's start the game</h2>
    <audio className={styles.sound} autoplay="autoplay" controls="controls">
      <source src={sound} />
    </audio>

  </div>
)

export default Game;