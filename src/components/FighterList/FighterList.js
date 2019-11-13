import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import './FighterList.css';

import Loader from '../../components/loader/loader';
import routes from '../../configs/routes';

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
                <Link to={`${routes.FIGHTER}/${item.id}`}>
                <div className="imgWrap">
                  <img className="fighterImage" src={item.img} alt="fighter image" />
                </div>
                </Link>
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

