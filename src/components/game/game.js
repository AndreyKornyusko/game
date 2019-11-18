import React, { Component } from 'react';
import styles from './game.module.css';

import { withRouter } from 'react-router-dom';
import routes from '../../configs/routes';
import * as API from '../../services/api';


import sound from '../../assets/sounds/game.mp3';
import roundone from '../../assets/sounds/mp3';
import finishSound from '../../assets/sounds/FinishHim.mp3';
import fightSound from '../../assets/sounds/fight/mp3';
import laugh from '../../assets/sounds/laugh.mp3';
import scorpion from '../../assets/img/Sco.png';
import scorpiondie from '../../assets/img/Scorfa.png';
import db from '../../db';

import StartGameLeftFighter from './StartGameLeftFighter/StartGameLeftFighter';
import StartGameRightFighter from './StartGameRightFighter/StartGameRightFighter';
import FinishGameLeftFighter from './FinishGameLeftFighter/FinishGameLeftFighter';
import FinishGameRightFighter from './FinishGameRightFighter/FinishGameRightFighter';
import GameOverLeftFighter from './GameOverLeftFighter/GameOverLeftFighter';
import GameOverRightFighter from './GameOverRightFighter/GameOverRightFighter';

import shangTsungSound from '../../assets/sounds/shangtsung/mp3';
import sindelSound from '../../assets/sounds/sindel/mp3';
import jaxSound from '../../assets/sounds/jax/mp3';
import kanoSound from '../../assets/sounds/kano/mp3';
import liukangSound from '../../assets/sounds/liukang/mp3';
import sonyaSound from '../../assets/sounds/sonya/mp3';
import strykerSound from '../../assets/sounds/stryker/mp3';
import smokeSound from '../../assets/sounds/smoke/mp3';
import subzeroSound from '../../assets/sounds/subzero/mp3';
import cyraxSound from '../../assets/sounds/cyrax/mp3';
import sektorSound from '../../assets/sounds/sektor/mp3';
import nightwolfSound from '../../assets/sounds/nightwolf/mp3';
import sheevaSound from '../../assets/sounds/sheeva/mp3';
import kunglaolSound from '../../assets/sounds/kunglao/mp3';
import kabalSound from '../../assets/sounds/kabal/mp3';


const sounds = [
  { id: "ShangTsung", sound: shangTsungSound, index: 0 },
  { id: "Sindel", sound: sindelSound, index: 1 },
  { id: "Jax", sound: jaxSound, index: 2 },
  { id: "Kano", sound: kanoSound, index: 3 },
  { id: "LiuKang", sound: liukangSound, index: 4 },
  { id: "SonyaBlade", sound: sonyaSound, index: 5 },
  { id: "Styker", sound: strykerSound, index: 6 },
  { id: "Smoke", sound: smokeSound, index: 7 },
  { id: "SubZero", sound: subzeroSound, index: 8 },
  { id: "Cyrax", sound: cyraxSound, index: 9 },
  { id: "Sektor", sound: sektorSound, index: 10 },
  { id: "Nightwolf", sound: nightwolfSound, index: 11 },
  { id: "Sheeva", sound: sheevaSound, index: 12 },
  { id: "KungLao", sound: kunglaolSound, index: 13 },
  { id: "Kabal", sound: kabalSound, index: 14 }
]

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fighterId: '',
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
      fighterWinsSound: '',

      leftimgGameOver: '',
      rightimgGameOver: scorpiondie,

      isFinish: false,
      isGameOver: false,
      isFall: false,
      keyPressNotify: false,
      finishNotify: false,
      gameOverNotify: false,
      fighterNameNotify: false,
      fighterName: "",
      isFinishHim: false,
    }
  }

  playAudio = (id) => {
    const music = document.getElementById(id);
    function playAudio() {
      music.play();
    };
    playAudio();
  }


  loadAudio = (id) => {
    const music = document.getElementById(id);
    function loadAudio() {
      music.load();
    };
    loadAudio();
  }


  stopAudio = (id) => {
    const gameMusic = document.getElementById(id);
    gameMusic.pause()
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
      this.playAudio("fight");
    }, 2000);


    API.getFightersItemById(id)
      .then(fighter => {

        const fighterSound = sounds.find(item => item.id === fighter.id);

        this.setState({
          fighter,
          leftFighterName: fighter.name,
          leftimg: fighter.gameimg,
          leftimgStart: fighter.vsimg,
          fighterName: fighter.name,
          fighterWinsSound: fighterSound.sound,
          fighterId: fighter.id,
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

  handleClick = (e) => {
    this.setState({ isFinish: true, keyPressNotify: false });

    this.setState({ isFinishHim: true });

    setTimeout(() => {
      this.setState({ isFinishHim: false });
    }, 2000);


    this.stopAudio("gameAudio");
    this.playAudio("finishHim");


    setTimeout(() => {
      this.setState({ isGameOver: true });

      setTimeout(() => {
        this.setState({ isFall: true })
      }, 5);


      setTimeout(() => {
        this.setState({ fighterNameNotify: true });
        this.loadAudio("fighterwins");
        this.playAudio("fighterwins");

        setTimeout(() => {
          this.setState({ fighterNameNotify: false })


        }, 2000);

      }, 1000);


      setTimeout(() => {
        this.setState({ gameOverNotify: true })
      }, 4000);


      setTimeout(() => {
        this.playAudio("laugh");
      }, 2000);


      setTimeout(() => {
        const { from } = {
          from: { pathname: `${routes.MAIN}` },
        };
        this.props.history.push(from);
      }, 6000);

    }, 2200);
  }

  handleKeyDown = (e) => {
    if (e.code === "KeyF" || e.key === 'ArrowRight') {

      this.handleClick(e)
    }
  }


  render() {

    const {
      fighterId,
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
      gameOverNotify,
      fighterNameNotify,
      fighterName,
      isFinishHim,
      fighterWinsSound

    } = this.state;


    return (
      <div className={styles.mainWrapper}>
        <div className={styles.notify}>
          {finishNotify && "FINISH HIM!"}
          {keyPressNotify && "Press key F or click on your fighter for FINISH HIM!"}
          {fighterNameNotify && `${fighterName} WINS`}
          <div className={styles.finishHim}>
            {isFinishHim && "Finish Him"}
            {gameOverNotify && "GAME OVER"}
          </div>
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
                    <img className={styles.fighterImgLeft}
                      src={leftimg}
                      alt="fighter img"
                      onClick={this.handleClick}
                    />
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
        <audio id="laugh" className={styles.sound} controls="controls">
          <source src={laugh} />
        </audio>

        <audio id="fighterwins" className={styles.sound} controls="controls" preload="none">
          <source src={fighterWinsSound} />
        </audio>

      </div>
    )
  }
}

export default withRouter(Game);