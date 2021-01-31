import React from 'react';

import './Footer.css';
import history from '../../history';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } 
from "react-router-dom";

class Footer extends React.Component {

    render() {
        return (
            <div className="Footer">
                <table className="table_columns">
                <tr>
                    <th> <p className="description">Dr. Pill is the leading interactive entertainment game for people all around the world helping to fight the virus breakdown. We have developed the game for the first time, offering it to enjoy to everyone around the world.</p>
                    </th>
                    <th>
                        <div>
                        <ul className="block">
                            <li><a href="/">Home</a></li>
                            <li><a href="https://github.com/Mikhail-Kurilov">Github_1</a></li>
                            <li><a href="https://github.com/Chukana">Github_2</a></li>
                            <li><a href="https://app.rs.school/">RSSchool</a></li>
                    </ul>
                    </div>
                    </th>
                    <th>
                        <div>
                            <ul className="block">
                                <li><a href="https://www.king.com/game/candycrush">Candy Crash</a></li>
                                <li><a href="/game">Game</a></li>
                                <li><a href="/result">Top chart</a></li>
                            </ul>
                        </div>
                    </th>
                    <th>
                        <p className="description right">2021   All rights reserved </p>
                        
                    </th>
                </tr>
                </table>

            </div>
        );
    }
}

export default Footer;
