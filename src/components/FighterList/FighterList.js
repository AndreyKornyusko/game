import React, { Component } from 'react';
import './FighterList.css';

const fighters = [
  { id: 1, name: "Shang Tsung", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/a/a4/Shang3.jpg/revision/latest?cb=20090310024111&path-prefix=es" },
  { id: 2, name: "Sindel", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/6/61/Sindelumk3.jpg/revision/latest?cb=20090310023724&path-prefix=es" },
  { id: 3, name: "Jax", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/4/41/Jax3.jpg/revision/latest?cb=20090310024324&path-prefix=es" },
  { id: 4, name: "Kano", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/3/3b/Kanomk3.gif/revision/latest?cb=20081215013406&path-prefix=es" },
  { id: 5, name: "Liu Kang", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/b/b4/Liu3.jpg/revision/latest?cb=20090310023304&path-prefix=es" },
  { id: 6, name: "Sonya Blade", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/0/05/Sonya3.jpg/revision/latest?cb=20090310034551&path-prefix=es" },
  { id: 7, name: "Styker", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/9/90/Stryker.gif/revision/latest?cb=20081217082746&path-prefix=es" },
  { id: 8, name: "Smoke", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/6/6c/Smoke-anim.gif/revision/latest?cb=20081212102833&path-prefix=es" },
  { id: 9, name: "Sub-Zero", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/c/c6/Sub3.jpg/revision/latest?cb=20090310024842&path-prefix=es" },
  { id: 10, name: "Cyrax", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/d/d5/MK3CyraxSS.gif/revision/latest?cb=20081210053133&path-prefix=es" },
  {id: 11, name:"Sektor", img:"https://vignette.wikia.nocookie.net/mortalkombat/images/f/f0/Sektor.gif/revision/latest?cb=20081218053748&path-prefix=es"},
  {id:12, name:"Nightwolf", img:"https://vignette.wikia.nocookie.net/mortalkombat/images/2/2b/Nightwolf34.gif/revision/latest?cb=20081220063351&path-prefix=es"},
  {id:13, name:"Sheeva", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/c/cc/Sheeva3.jpg/revision/latest?cb=20090310031301&path-prefix=es"},
  {id:14, name: "Kung Lao", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/e/ea/Kunglaoo.gif/revision/latest?cb=20081216075739&path-prefix=es"},
  {id:15, name:"Kabal", img: "https://vignette.wikia.nocookie.net/mortalkombat/images/6/69/Kabal122.gif/revision/latest?cb=20081217062431&path-prefix=es"}
];

// const activeFighter = document.querySelector(".activeItem");


export default class FighterList extends Component {
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {
      cursor: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e) {
    const { cursor } = this.state
    console.log('cursor', cursor);
    console.log('e.key', e.key);

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
        cursor: prevState.cursor +5
      }))
    } else if (e.key === 'ArrowUp' && cursor  > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor -5
      }))
    } else if (e.key === 'Enter') {
      const activeFighter = document.querySelector(".activeItem");
      console.log('activeFighter id: ', activeFighter.id)
    };
  }

  render() {
    const { cursor } = this.state

    return (
      <div>
        <ul className="fighterList">
          {
            fighters.map((item, i) => (
              <li
                id={item.name}
                key={item.id}
                className={cursor === i ? 'activeItem' : 'item'}
              >
                <div className="imgWrap">
                  <img className="fighterImage" src={item.img} alt={item.name} />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}