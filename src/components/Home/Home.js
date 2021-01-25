import React from 'react';
import history from '../../history';

import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementById('audio').src = '/audio/start.mp3';
    }

    render() {
        return (
            <div className="Home">
                Home
                <br />
                <form>
                    <button onClick={() => history.push('/game')}>go to Game</button>
                </form>
                <audio id='audio' autoPlay loop></audio>
            </div>
        );
    }
}

export default Home;
