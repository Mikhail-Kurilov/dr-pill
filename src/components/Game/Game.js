import React from 'react';
import {Redirect} from 'react-router-dom';
import history from '../../history';

import './Game.css';
import GameDrPill from './GameDrPill';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.game = null;
        this.state = { sec: 60, score: 0, points: 0, maxPoints: 20, audioPic: '/icons8-mute-50.png' };
    }

    componentDidMount() {
        this.game = new GameDrPill({ 
            id: 'canvas', 
            callbacks: {
                endGame: (score) => { 
                    this.setState({ score });
                },
                timeTick: (sec) => {
                    this.setState({ sec });
                },
                addPills: (points) => {
                    if (this.state.points + points >= this.state.maxPoints) {
                        this.setState({ 
                            points: 0, 
                            maxPoints: this.state.maxPoints + 10,
                            score: this.state.score + 1,
                            sec: 60
                        });
                        this.game.restartTime()
                    } else {
                        this.setState({ points: this.state.points + points  });
                    }
                }
            }
        });
        const soundArr = [
            '/audio/game1.mp3',
            '/audio/game2.mp3'
        ];

        document.getElementById('audio').src = soundArr[Math.floor(Math.random(soundArr.length) + 0.5)];
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

    //audio.src = './assets/' + this.cards[this.variants[this.variants.length - 1]].audioSrc;
    render() {
        if (this.state.sec <= 1) {
            return <Redirect to={ {
                pathname: '/result',
                state: { score: this.state.score }
            } }
            />
        }

        return (
            <div className="Game">
                <div className="statistics">
                    <div>колбы: { this.state.score }</div>
                    <div>времечко: { this.state.sec }</div>
                    <div>пилюли: {this.state.points}/{this.state.maxPoints}</div>
                    <button className="glow-on-hover music" onClick={() => this.playPauseAudioHandler()}>
                        <img src={this.state.audioPic} width='30px' height='30px' className=''></img>
                    </button>
                </div>
                <canvas id='canvas'></canvas>
                <audio id='audio' autoPlay loop></audio>
                <br />
                <form>
                    <div className='backForward'>
                    <button className="glow-on-hover" onClick={() => history.push('/')}>Home page</button>
                    <br />
                    <button className="glow-on-hover" onClick={() => history.push('/result')}>Results</button>  
                    </div>

                </form>
            </div>
        );
    }
}

export default Game;
