import React from 'react';
import history from '../../history';

import './Home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { audioPic: '/icons8-mute-50.png' };
    }

    componentDidMount() {
        document.getElementById('audio').src = '/audio/start.mp3';
    }

    playPauseAudioHandler() {
        const audio = document.getElementById('audio');
        if (audio.paused) {
            audio.play();
            this.setState({audioPic:'/icons8-mute-50.png'});
        } else {
            audio.pause();
            this.setState({audioPic:'/icons8-sound-50.png'});
        }
    }

    render() {
        return (
            <div className="Home">
                <br />
                <div className="instruction"> <p>Мир поразила ужасная пандемия! Только Вам под силу создать лекарство, которое спасет этит мир! Необходимо составить комбинации лекарственных препаратов и наполнить им колбы. Внимание, время ограничено, а вирус распространяется молниеносно и человеству требуется все больше вакцины. У Вас есть ровно 60 секунд на заполнение 1 колбы. Каждая последующая колба требует бОльшего количества пилюль! Удачи, друг!</p>
                <br />
                </div>
                <form className="top">
                                
                    <button className="glow-on-hover" onClick={() => history.push('/game')}>Play Now!!!</button>
                    <br />
                    <span></span><span></span><span></span><span></span>
                </form>
                <img id="drPill" src="/dr-pill-removebg-clear.png" alt="Dr. Pill"></img>
                <button className="glow-on-hover music" onClick={() => this.playPauseAudioHandler()}>
                    <img id="sound" src={this.state.audioPic} width='30px' height='30px' className=''></img>
                    </button>
                <audio id='audio' autoPlay loop></audio>
            </div>
        );
    }
}

export default Home;


