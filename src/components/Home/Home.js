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
                <br />
                <form>
                    <button className="glow-on-hover" onClick={() => history.push('/game')}>Play Now!!!</button>
                    <span></span><span></span><span></span><span></span>
                </form>
                <img src="/dr-pill-removebg-clear.png" alt="Dr. Pill"></img>
                <audio id='audio' autoPlay loop></audio>
            </div>
        );
    }
}

export default Home;
