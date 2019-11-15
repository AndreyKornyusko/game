import React, { Component } from 'react';
import styles from './game.module.css';

import { withRouter } from 'react-router-dom';
import routes from '../../configs/routes';
import * as API from '../../services/api';


import sound from '../../assets/sounds/game.mp3';
import roundone from '../../assets/sounds/mp3';
import finishSound from '../../assets/sounds/FinishHim.mp3';
import fightSound from '../../assets/sounds/mp3(fight)'
import scorpion from '../../assets/img/Sco.png';
import scorpiondie from '../../assets/img/Scorfa.png';


import StartGameLeftFighter from './StartGameLeftFighter/StartGameLeftFighter';
import StartGameRightFighter from './StartGameRightFighter/StartGameRightFighter';
import FinishGameLeftFighter from './FinishGameLeftFighter/FinishGameLeftFighter';
import FinishGameRightFighter from './FinishGameRightFighter/FinishGameRightFighter';
import GameOverLeftFighter from './GameOverLeftFighter/GameOverLeftFighter';
import GameOverRightFighter from './GameOverRightFighter/GameOverRightFighter';


class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftFighterName: '',
      rightFighterName: 'Scorpion',
      leftimg: '',
      rightimg: 'https://vignette.wikia.nocookie.net/mortalkombat/images/c/c6/Sco54.gif/revision/latest?cb=20091221132258&path-prefix=es',
      loading: true,
      isGameStart: false,
      leftimgStart: '',
      leftimgFinish: '',
      rightimgFinish: 'https://vignette.wikia.nocookie.net/mortalkombat/images/b/b4/Sco49.gif/revision/latest?cb=20091221132207&path-prefix=es',
      rightimgStart: scorpion,

      leftimgGameOver: '',
      rightimgGameOver: scorpiondie,

      isFinish: false,
      isGameOver: false,
      isFall:false,
      keyPressNotify:false,
      finishNotify:false,
      gameOverNotify:false,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)

    const id = this.props.match.params.id;

    setTimeout(() => {
      this.setState({ isGameStart: true })
    }, 3000);

    setTimeout(() => {
      this.setState({ keyPressNotify: true })
    }, 6000);


    setTimeout(() => {
      const music = document.getElementById("fight");
      function playAudio() {
        music.play();
      };
      playAudio();
    }, 2000);


    API.getFightersItemById(id)
      .then(fighter => {
        this.setState({
          fighter,
          leftFighterName: fighter.name,
          leftimg: fighter.gameimg,
          leftimgStart: fighter.vsimg,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e) => {
    if (e.code === "KeyF" || e.key === 'ArrowRight') {
      this.setState({ isFinish: true, keyPressNotify:false });

      const music = document.getElementById("finishHim");
      const gameMusic = document.getElementById("gameAudio");

      function stopMusic() {
        gameMusic.pause()
      }

      function playAudio() {
        music.play();
      };

      stopMusic();
      playAudio();


      setTimeout(() => {
        this.setState({ isGameOver: true });

        setTimeout(() => {
          this.setState({ isFall: true })
        }, 5);

        setTimeout(() => {
          this.setState({ gameOverNotify: true })
        }, 2000);

  
      }, 2200);

    }
  }

  render() {

    const {
      leftFighterName,
      rightFighterName,
      leftimg,
      rightimg,
      loading,
      isGameStart,
      leftimgStart,
      rightimgStart,
      leftimgFinish,
      rightimgFinish,
      leftimgGameOver,
      rightimgGameOver,
      isFinish,
      isGameOver,
      isFall,
      keyPressNotify,
      finishNotify,
      gameOverNotify

    } = this.state;

    return (
      <div className={styles.mainWrapper}>
        <div className={styles.notify}>
          {finishNotify&&"FINISH HIM!"}
          {keyPressNotify&&"Press key F to FINISH HIM!"}
          {gameOverNotify&&"GAME OVER"}
        </div>
        <div className={styles.fightersWrap}>
          <div className={styles.leftFighter}>

            {isGameStart ?
              (isFinish ?
                (isGameOver ?
                  <GameOverLeftFighter img={leftimgStart} /> :
                  <FinishGameLeftFighter img={leftimgStart} />
                ) :

                (
                  <div className={styles.fighterimgWrap}>
                    <img className={styles.fighterImgLeft} src={leftimg} alt="fighter img" />
                  </div>
                )
              ) :
              <StartGameLeftFighter img={leftimgStart} />
            }

          </div>
          <div className={styles.rightFighter}>


            {isGameStart ?
              (isFinish ?
                (isGameOver ?
                  <GameOverRightFighter 
                  img={rightimgGameOver} 
                  isFall={isFall}
                  /> :
                  <FinishGameRightFighter img={rightimgFinish} />
                ) :

                (
                  <div className={styles.fighterimgWrap}>
                    <img className={styles.fighterImgRight} src={rightimg} alt="fighter img" />
                  </div>
                )
              ) :
              <StartGameRightFighter img={rightimgStart} />
            }

          </div>
        </div>
        <audio id="gameAudio" className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={sound} />
        </audio>
        <audio className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={roundone} />
        </audio>
        <audio id="finishHim" className={styles.sound} controls="controls">
          <source src={finishSound} />
        </audio>
        <audio id="fight" className={styles.sound} controls="controls">
          <source src={fightSound} />
        </audio>

      </div>
    )
  }
}

export default withRouter(Game);