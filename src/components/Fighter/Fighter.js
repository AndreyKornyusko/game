import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Fighter.module.css';
import routes from '../../configs/routes';
import * as API from '../../services/api';
import scorpion from '../../assets/img/Sco.png'

import sound from '../../assets/sounds/VSScreen.mp3';
import bowMeSound from '../../assets/sounds/bow.mp3';
import suckSound from '../../assets/sounds/suck.mp3';

const DragonIcon = () => (
  <i class="fas fa-dragon fa-3x"></i>
)

const InYang = () => (
  <i class="fas fa-yin-yang fa-3x"></i>
)

const icons = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
];



class Fighter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cursor: 0,
      fighter: [],
      leftFighterName: '',
      rightFighterName: 'Scorpion',
      leftimg: '',
      rightimg: scorpion,

      loading: true,
      isQwertyClick: false,
      loaded: false,
      isDialogSuck: false,
      isDialogBow: false,
      isKeyCombination: false,
      isTitleLoad: true,
    }
  }

  handleKeyDown = (e) => {
    this.handleClickFighter(e)
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);

    setTimeout(() => {
      this.setState({ loaded: true })
    }, 100);

    setTimeout(() => {
      this.setState({ isTitleLoad: false })
    }, 2000);



    this.runOnKeys(
      () => {
        this.setState({ isQwertyClick: true });
      },
      "KeyQ",
      "KeyW",
      "KeyE",
      "KeyR",
      // "KeyT",
      "KeyY"
    );


    const id = this.props.match.params.id;

    API.getFightersItemById(id)
      .then(fighter => {
        this.setState({ fighter, leftFighterName: fighter.name, leftimg: fighter.vsimg, loading: false });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });

  }


  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }



  runOnKeys = (func, ...codes) => {
    let pressed = new Set();

    window.addEventListener('keydown', function (event) {

      pressed.add(event.code);
      // console.log('event code', event.code);

      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }

      pressed.clear();

      func();
    });

    window.addEventListener('keyup', function (event) {
      pressed.delete(event.code);
    });
  }



  goToGame = (id) => {
    const { from } = {
      from: { pathname: `${routes.GAME}/${id}` },
    };

    this.props.history.push(from);
  }



  hangleIconClick = () => {
    const id = this.props.match.params.id;
    this.goToGame(id)
  }



  handleClickFighter = (e) => {


    if (e.code === "KeyB" && e.shiftKey) {
      this.setState({ isDialogBow: true });

      setTimeout(() => {
        this.setState({ isDialogBow: false });
      }, 1500);


      function playAudio() {
        const music = document.getElementById("bowMe");
        music.play();
      };

      playAudio();
    } else if (e.code === "KeyS" && e.shiftKey) {

      this.setState({ isDialogSuck: true });

      setTimeout(() => {
        this.setState({ isDialogSuck: false });
      }, 1500);


      function playAudio() {
        const music = document.getElementById("suck");
        music.play();
      };

      playAudio();
    }
  }

  render() {
    const { cursor,
      leftFighterName,
      rightFighterName,
      leftimg,
      rightimg,
      loading,
      isQwertyClick,
      loaded,
      isDialogSuck,
      isDialogBow,
      isKeyCombination,
      isTitleLoad,
    } = this.state

    const { batleNumber = "1" } = this.props;

    // console.log('fighter', fighter)
    // console.log('fighter props', this.props);
    console.log('isQwertyClick', isQwertyClick)

    return (
      <div className={styles.fightersMainWrap}>
        <h2 className={styles.mainTitle}>
          {isTitleLoad && `Battle ${batleNumber}`}
          {!isTitleLoad && "Press Shift+B or Shift+S :)"}

        </h2>
        <div className={styles.fightersWrap}>
          <div className={styles.leftFighter}>
            <h3 className={styles.FighterName}>{leftFighterName}</h3>
            <div className={styles.fighterimgWrap}>
              <div className={styles.dialog}>
                {isDialogBow && "Bow to me!"}
                {isDialogSuck && "You suck!"}

              </div>
              <img
                className={styles.fighterImgLeft}
                src={leftimg}
                alt="fighter img"
                onClick={this.handleClickFighter}
                style={{
                  left: loaded && '80px',
                }}
              />
            </div>
          </div>
          <div className={styles.rightFighter}>
            <h3 className={styles.FighterName}>{rightFighterName}</h3>
            <div className={styles.fighterimgWrap}>
              <img className={styles.fighterImgRight} src={rightimg} alt="fighter img"
                style={{
                  right: loaded && '60px',
                }}

              />
            </div>
          </div>
        </div>
        <ul className={styles.iconList}>
          {
            icons.map((item, i) => (
              <li
                id={item.id}
                key={item.id}
                className={cursor === i ? 'activeIcon' : 'icon'}
              >
                <div className={styles.imgWrap} onClick={this.hangleIconClick}>
                  {!isQwertyClick ? <DragonIcon /> : <InYang />}
                </div>
              </li>
            ))
          }
        </ul>
        <audio className={styles.sound} autoplay="autoplay" controls="controls">
          <source src={sound} />
        </audio>
        <audio id="bowMe" className={styles.sound} controls="controls">
          <source src={bowMeSound} />
        </audio>
        <audio id="suck" className={styles.sound} controls="controls">
          <source src={suckSound} />
        </audio>

      </div>
    )
  }
}

export default withRouter(Fighter);