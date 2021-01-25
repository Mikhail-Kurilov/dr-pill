import React from 'react';

import './Header.css';

class Header extends React.Component {

    render() {
        return (
            <div className="Header">
               <ul className="Menu">
                   <li><a href="/">Home</a></li>
                   <li><a href="/game">Game</a></li>
                   <li><a href="/result">Top chart</a></li>
               </ul>
               <img src="/logo.png" alt="logo" className='Logo' width="280px" height='100px'></img>
            </div>
        );
    }    
}

export default Header;
