import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './FighterList.module.css';

import List from '../FighterList/list/List';

import Loader from '../../components/loader/loader';
import routes from '../../configs/routes';
import hardcodedItems from '../../db';

import * as API from '../../services/api';

import sound from '../../assets/sounds/SelectYourFighter.mp3';


class FighterList extends Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      cursor: 0,
      loading: true,
      fighters: [],
      leftFighterName: '',
      rightFighterName: '',
      leftimg: '',
      rightimg: '',

      error: '',
    }
  }

  goToGame = (id) => {
    const { from } = {
      from: { pathname: `${routes.GAME}/${id}` },
    };

    this.props.history.push(from);
  }

  findFighterById = (id) => {
    const { fighters } = this.state;
    const selectedFighter = fighters.find(item => item.id === id);
    this.setState({ leftimg: selectedFighter.vsimg, leftFighterName: selectedFighter.name })
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)

    API.getAllFightersItems()
      .then(fighters => {
        this.setState({ fighters, loading: false });
        // console.log('fighters', fighters)
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });


    const music = document.getElementById("myAudio");

    function playAudio() {
      music.play();
    };
    playAudio()
  }


  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e) {
    const { cursor, fighters } = this.state


    if (e.key === 'ArrowLeft' && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }))
    } else if (e.key === 'ArrowRight' && cursor < fighters.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }))
    } else if (e.key === 'ArrowDown' && cursor < fighters.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 5
      }))
    } else if (e.key === 'ArrowUp' && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 5
      }))
    } else if (e.key === 'Enter') {
      const activeFighter = document.querySelector(".activeItem");
      const activeFighterID = activeFighter.id;
      // console.log('this.props', this.props);

      this.findFighterById(activeFighterID)

      setTimeout(() => {
        const { from } = {
          from: { pathname: `${routes.FIGHTER}/${activeFighterID}` },
        };
        this.props.history.push(from);
      }, 2000);


      setTimeout(() => {
        this.goToGame(activeFighterID);
      }, 10000);

    }
  }

  handleFighterClick = (e) => {
    console.log('e target', e.target)
    const id = e.target.id;
    // console.log('id',id)

    setTimeout(() => {
      const { from } = {
        from: { pathname: `${routes.GAME}/${id}` },
      };

      this.props.history.push(from);
    }, 10000);
  }

  render() {
    const { cursor, fighters, loading, error, leftFighterName, rightFighterName, leftimg, rightimg } = this.state
    const { handleFighterClick } = this.props;
    return (
      <div className={styles.fightersMainWrap}>
        <h2 className={styles.mainTitle}>select your fighter</h2>
        <h3 className={styles.subTitle}>Use ArrowKEYS for select fighter and then press ENTER</h3>
        {loading && <Loader />}
        {error &&
          (<div>
            <div className={styles.error}>{error}</div>
            <List items={hardcodedItems} cursor={cursor} />
          </div>)}

        <div className={styles.fighterWrap}>
          <div className={styles.leftFighter}>
            <h3 className={styles.FighterName}>{leftFighterName}</h3>
            <div className={styles.fighterimgWrap}
              style={{
                backgroundImage: `url(${leftimg})`
              }}
            >
            </div>
          </div>
          <List
            items={fighters}
            cursor={cursor}
          />

          <div className={styles.rightFighter}>
            <h3 className={styles.FighterName}>{rightFighterName}</h3>
            <div className={styles.fighterimgWrap}
              style={{
                backgroundImage: `url(${rightimg})`
              }}
            >
            </div>
          </div>
        </div>

        <audio id="myAudio" className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={sound} />
        </audio>
      </div >
    )
  }
}

export default withRouter(FighterList);

