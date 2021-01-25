import React from 'react';
import {Redirect} from 'react-router-dom';
import history from '../../history';

import './Game.css';
import GameDrPill from './GameDrPill';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.game = null;
        this.state = { sec: 60, score: 0, points: 0, maxPoints: 20 };
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
                </div>
                <canvas id='canvas'></canvas>
                <audio id='audio' autoPlay loop></audio>
                <br />
                <form>
                    <button className="glow-on-hover" onClick={() => history.push('/')}>Home page</button>
                    <br />
                    <button className="glow-on-hover" onClick={() => history.push('/result')}>Results</button>
                </form>
            </div>
        );
    }
}

export default Game;
