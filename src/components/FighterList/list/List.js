import React from 'react';
import { Link } from 'react-router-dom';

import './list.css';
import routes from '../../../configs/routes';

const List = ({items, cursor }) => (
  <ul className="fighterList">
    {
      items.map((item, i) => (
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
)

export default List;