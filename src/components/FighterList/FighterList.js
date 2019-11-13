import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './FighterList.css';

import Loader from '../../components/loader/loader';
import routes from '../../configs/routes';

import * as API from '../../services/api';

import sound from '../../assets/sounds/SelectYourFighter.mp3';


// const fighters = [
//   { id: "ShangTsung", name: "Shang Tsung", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/a/a4/Shang3.jpg/revision/latest?cb=20090310024111&path-prefix=es" },
//   { id: "Sindel", name: "Sindel", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/6/61/Sindelumk3.jpg/revision/latest?cb=20090310023724&path-prefix=es" },
//   { id: "Jax", name: "Jax", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/4/41/Jax3.jpg/revision/latest?cb=20090310024324&path-prefix=es" },
//   { id: "Kano", name: "Kano", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/3/3b/Kanomk3.gif/revision/latest?cb=20081215013406&path-prefix=es" },
//   { id: "LiuKang", name: "Liu Kang", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/b/b4/Liu3.jpg/revision/latest?cb=20090310023304&path-prefix=es" },
//   { id: "SonyaBlade", name: "Sonya Blade", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/0/05/Sonya3.jpg/revision/latest?cb=20090310034551&path-prefix=es" },
//   { id: "Styker", name: "Styker", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/9/90/Stryker.gif/revision/latest?cb=20081217082746&path-prefix=es" },
//   { id: "Smoke", name: "Smoke", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/6/6c/Smoke-anim.gif/revision/latest?cb=20081212102833&path-prefix=es" },
//   { id: "SubZero", name: "Sub-Zero", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/c/c6/Sub3.jpg/revision/latest?cb=20090310024842&path-prefix=es" },
//   { id: "Cyrax", name: "Cyrax", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/d/d5/MK3CyraxSS.gif/revision/latest?cb=20081210053133&path-prefix=es" },
//   { id: "Sektor", name: "Sektor", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/f/f0/Sektor.gif/revision/latest?cb=20081218053748&path-prefix=es" },
//   { id: "Nightwolf", name: "Nightwolf", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/2/2b/Nightwolf34.gif/revision/latest?cb=20081220063351&path-prefix=es" },
//   { id: "Sheeva", name: "Sheeva", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/c/cc/Sheeva3.jpg/revision/latest?cb=20090310031301&path-prefix=es" },
//   { id: "KungLao", name: "Kung Lao", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/e/ea/Kunglaoo.gif/revision/latest?cb=20081216075739&path-prefix=es" },
//   { id: "Kabal", name: "Kabal", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/6/69/Kabal122.gif/revision/latest?cb=20081217062431&path-prefix=es" }
// ];


class FighterList extends Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      cursor: 0,
      loading: true,
      fighters: [],
    }
  }

  goToGame = (id) => {
    const { from } = {
      from: { pathname: `${routes.GAME}/${id}` },
    };

    this.props.history.push(from);
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

      const { from } = {
        from: { pathname: `${routes.FIGHTER}/${activeFighterID}` },
      };
      this.props.history.push(from);

      setTimeout(() => {
        this.goToGame(activeFighterID);
      }, 10000);

    } 
  }

  render() {
    const { cursor, fighters, loading } = this.state

    return (
      <div className="fightersWrap">
        <h2 className="mainTitle">select your fighter</h2>
        {loading && <Loader />}
        <ul className="fighterList">
          {
            fighters.map((item, i) => (
              <li
                id={item.id}
                key={item.id}
                className={cursor === i ? 'activeItem' : 'item'}
              >
                {/* <Link to={`${routes.FIGHTER}/${item.id}`}></Link> */}
                <div className="imgWrap">
                  <img className="fighterImage" src={item.img} alt="fighter image" />
                </div>
                {/* <Link/> */}
              </li>
            ))
          }
        </ul>
        <audio className="sound" autoplay="autoplay" controls="controls">
          <source src={sound} />
        </audio>
      </div >
    )
  }
}

export default withRouter(FighterList);

