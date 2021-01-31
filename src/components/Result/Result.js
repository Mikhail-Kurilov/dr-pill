import React from 'react';
import history from '../../history';

import './Result.css';

class Result extends React.Component {

    constructor(props) {
        super(props);

        this.score = props.location?.state?.score;

        this.results = localStorage.getItem('results');
        if (this.results) {
            this.results = JSON.parse(this.results);
        } else { // set default first start values
            this.results = [
                { nickname: 'Misha', score: 128 },
                { nickname: 'Nadya', score: 64 },
                { nickname: 'Alexey', score: 32 },
                { nickname: 'Vladimir', score: 16 },
                { nickname: 'Navalny', score: 12 },
                { nickname: 'Cesar', score: 10 },
                { nickname: 'August', score: 8 },
                { nickname: 'Napoleon', score: 6 },
                { nickname: 'Ivan Grozny', score: 4 },
                { nickname: 'Vasya Pupkin', score: 2 },
            ];
            localStorage.setItem('results', JSON.stringify(this.results));
        }
    }

    componentDidMount() {
        document.getElementById('audio').src = '/audio/game-over.mp3';
    }

    render() {
        return (
            <div className="Result">
                <h2 className='text'>Result</h2>
                <br />
                {this.results.map((result, key) => {
                    return (<div  className="result-score" key={key}>{result.nickname} score:{result.score}</div>)
                })}
                <br />
                <form>
                    <button className="glow-on-hover" onClick={() => history.push('/game')}>go to Game</button>
                </form>
                <audio id='audio' autoPlay loop></audio>
            </div>
        );
    }
}

export default Result;
