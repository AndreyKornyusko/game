import React, { Component } from 'react';
import styles from './game.module.css';

import { withRouter } from 'react-router-dom';
import routes from '../../configs/routes';
import * as API from '../../services/api';


import sound from '../../assets/sounds/game.mp3';
import roundone from '../../assets/sounds/mp3';
import scorpion from '../../assets/img/Sco.png'

import StartGameLeftFighter from './StartGameLeftFighter/StartGameLeftFighter';
import StartGameRightFighter from './StartGameRightFighter/StartGameRightFighter';

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
      rightimgStart: scorpion,
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    setTimeout(() => {
      this.setState({ isGameStart: true })
    }, 3000);

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

  render() {

    const { leftFighterName, rightFighterName, leftimg, rightimg, loading, isGameStart, leftimgStart, rightimgStart } = this.state;

    return (
      <div className={styles.mainWrapper}>
        {/* <h2 className={styles.title}>Let's start the game</h2> */}
        <div className={styles.fightersWrap}>
          <div className={styles.leftFighter}>

            {!isGameStart ? <StartGameLeftFighter img={leftimgStart} /> : (
              <div className={styles.fighterimgWrap}>
                <img className={styles.fighterImgLeft} src={leftimg} alt="fighter img" />
              </div>
            )}

          </div>
          <div className={styles.rightFighter}>

            {!isGameStart ? <StartGameRightFighter img={rightimgStart} /> : (
              <div className={styles.fighterimgWrap}>
                <img className={styles.fighterImgRight} src={rightimg} alt="fighter img" />
              </div>
            )}

          </div>
        </div>
        <audio className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={sound} />
        </audio>
        <audio className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={roundone} />
        </audio>


      </div>
    )
  }
}

export default withRouter(Game);