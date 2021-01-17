import React from 'react';
import history from '../../history';

import './Game.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Game">
               Game
               <br />
                <form>
                    <button onClick={() => history.push('/')}>Home page</button>
                    <button onClick={() => history.push('/result')}>Results</button>
                </form>
            </div>
        );
    }
}

export default Game;
