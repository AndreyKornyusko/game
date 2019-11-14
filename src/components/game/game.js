import React, { Component } from 'react';
import styles from './game.module.css';

import { withRouter } from 'react-router-dom';
import routes from '../../configs/routes';
import * as API from '../../services/api';


import sound from '../../assets/sounds/TheSubway.mp3';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftFighterName: '',
      rightFighterName: 'Scorpion',
      leftimg: '',
      rightimg: 'https://vignette.wikia.nocookie.net/mortalkombat/images/c/c6/Sco54.gif/revision/latest?cb=20091221132258&path-prefix=es',
      loading: true,
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    API.getFightersItemById(id)
      .then(fighter => {
        this.setState({ fighter, leftFighterName: fighter.name, leftimg: fighter.gameimg, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

  }

  render() {

    const { leftFighterName, rightFighterName, leftimg, rightimg, loading } = this.state;

    return (
      <div>
        <h2 className={styles.title}>Let's start the game</h2>
        <div className={styles.fightersWrap}>
          <div className={styles.leftFighter}>
            {/* <h3 className={styles.FighterName}>{leftFighterName}</h3> */}
            <div className={styles.fighterimgWrap}>
              <img className={styles.fighterImg} src={leftimg} alt="fighter img" />
            </div>
          </div>
          <div className={styles.rightFighter}>
            {/* <h3 className={styles.FighterName}>{rightFighterName}</h3> */}
            <div className={styles.fighterimgWrap}>
              <img className={styles.fighterImg} src={rightimg} alt="fighter img" />
            </div>
          </div>
        </div>
        <audio className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={sound} />
        </audio>

      </div>
    )
  }
}

export default withRouter(Game);