import React from 'react';
import history from '../../history';

import './Result.css';

class Result extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        return (
            <div className="Result">
                Result
                <br />
                <form>
                    <button onClick={() => history.push('/game')}>go to Game</button>
                </form>
            </div>
        );
    }
}

export default Result;
