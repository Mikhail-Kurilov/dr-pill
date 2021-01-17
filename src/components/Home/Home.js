import React from 'react';
import history from '../../history';

import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Home">
                Home
                <br />
                <form>
                    <button onClick={() => history.push('/game')}>go to Game</button>
                </form>
            </div>
        );
    }
}

export default Home;
