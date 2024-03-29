import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './start.module.scss';
import routes from '../../configs/routes';

import sound from '../../assets/sounds/VSScreen.mp3';


class Start extends Component {

  loadAudio = (id) => {
    const music = document.getElementById(id);
    function loadAudio() {
      music.load();
    };
    loadAudio();
  }


  playAudio = (id) => {
    const music = document.getElementById(id);
    function playAudio() {
      music.play();
    };
    playAudio();
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    setTimeout(() => {
      this.goToGame(id)
    }, 5000);


    this.loadAudio("startsound");
    this.playAudio("startsound");
  }

  goToGame = (id) => {
    const { from } = {
      from: { pathname: `${routes.MAIN}` },
    };

    this.props.history.push(from);
  }

  render() {

    return (
      <div className={styles.MainWrap}>
        <h1 className={styles.title}>welcome to mortal combat</h1>
        <audio
          id="startsound"
          className={styles.sound}
          autoplay="autoplay"
          controls="controls">
          <source src="https://d1490khl9dq1ow.cloudfront.net/audio/sfx/mp3preview/BsTwCwBHBjzwub4i4/jg-032316-sfx-huge-gong_NWM.mp3" />
        </audio>
      </div>
    )
  }
}

export default withRouter(Start);