class GameDrPill {
    constructor({ id, callbacks }) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 560;
        this.canvas.height = 560;
        this.canvas.addEventListener('click', (event) => this.clickCell(event));

        this.ADD_PILLS = 10;
        this.FIELD_SIZE = 8;
        this.ROUND_TIME = 60; // sec
        this.SIZE = 70;

        this.callbacks = callbacks;

        this.field = [];
        this.sec = 0;
        this.interval = null;
        this.currentPills = 0;
        this.requirePills = 20;
        this.vaccineScore = 0;
        this.firstStep = true;
        this.x = -1;
        this.y = -1;

        this.pills = [null];
        this.pills.push(new Image());
        this.pills[1].src = '/img/pill_1.png';
        this.pills[1].onload = () => {
            this.pills.push(new Image());
            this.pills[2].src = '/img/pill_2.png';
            this.pills[2].onload = () => {
                this.pills.push(new Image());
                this.pills[3].src = '/img/pill_5.png';
                this.pills[3].onload = () => {
                    this.pills.push(new Image());
                    this.pills[4].src = '/img/pill_8.png';
                    this.pills[4].onload = () => {
                        this.pills.push(new Image());
                        this.pills[5].src = '/img/pill_10.png';
                        this.pills[5].onload = () => this.render();
                    }
                }
            }
        }

        for (let i = 0; i < this.FIELD_SIZE; i++) {
            this.field.push([]);
            for (let j = 0; j < this.FIELD_SIZE; j++) {
                this.field[i][j] = 1 + Math.floor(Math.random() * 5);
            }
        }
    }

    startTimeUpdate() {
        if (this.interval) {
            this.sec = 0;
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => {
            this.sec++;
            if (this.sec >= this.ROUND_TIME) { // закончить игру
                clearInterval(this.interval);
                this.callbacks.endGame(this.vaccineScore);
                return;
            }
            this.callbacks.timeTick(this.ROUND_TIME - this.sec);
        }, 1000);
    }

    move(i1, j1, i2, j2) {
        if ((i1 === i2 && Math.abs(j1 - j2) === 1) ||
            (Math.abs(i1 - i2) === 1 && j1 === j2)) {
            let c = this.field[i1][j1];
            this.field[i1][j1] = this.field[i2][j2];
            this.field[i2][j2] = c;
            if (this.firstStep) { // старт счетчика времени
                this.firstStep = false;
                this.startTimeUpdate();
            }
            this.render();
            this.getStatus();
            return true;
        }
        return false;
    }


    clickCell(event) {
        if (this.x >= 0 && this.y >= 0) {
            let x = Math.floor(event.offsetX / this.SIZE);
            let y = Math.floor(event.offsetY / this.SIZE);
            this.move(this.x, this.y, x, y);
            this.x = -1;
            this.y = -1;
        } else {
            this.x = Math.floor(event.offsetX / this.SIZE);
            this.y = Math.floor(event.offsetY / this.SIZE);
        }
    }

    dropOneCell(i, j) {
        if (j === 0) {
            this.field[i][j] = 1 + Math.floor(Math.random() * 5);
        } else {
            for (let k = j; k >= 0; k--) {
                if (this.field[i][k - 1] !== undefined) {
                    this.field[i][k] = this.field[i][k - 1];
                    this.field[i][k - 1] = 0;
                } else {
                    this.field[i][k] = 1 + Math.floor(Math.random() * 5)
                }
            }
        }
    }

    dropElements() {
        for (let j = 0; j < this.FIELD_SIZE; j++) {
            for (let i = 0; i < this.FIELD_SIZE; i++) {
                if (this.field[i][j] === 0) {
                    this.dropOneCell(i, j);
                    this.render();
                }
            }
        }
    }

    getStatus() {
        let a1 = 0;
        let a2 = 0;
        for (let i = 0; i < this.FIELD_SIZE; i++) {
            a1 = 0;
            a2 = 0;
            for (let j = 0; j < this.FIELD_SIZE; j++) {
                if (a1 === a2 && a2 === this.field[i][j]) {
                    this.field[i][j] = 0;
                    this.field[i][j - 1] = 0;
                    this.field[i][j - 2] = 0;
                    setTimeout(() => this.dropElements(), 1500);
                    this.render();
                    this.callbacks.addPills(3);
                } else if (a1 === a2 && a2 !== this.field[i][j]) {
                    a1 = this.field[i][j];
                    a2 = 0;
                } else if (a1 === this.field[i][j]) {
                    a2 = this.field[i][j];
                } else {
                    a1 = this.field[i][j];
                }
            }
        }
        // пробежаться по строкам
        for (let j = 0; j < this.FIELD_SIZE; j++) {
            a1 = 0;
            a2 = 0;
            for (let i = 0; i < this.FIELD_SIZE; i++) {
                if (a1 === a2 && a2 === this.field[i][j]) {
                    this.field[i][j] = 0;
                    this.field[i-1][j] = 0;
                    this.field[i-2][j] = 0;
                    setTimeout(() => this.dropElements(), 1500);
                    this.render();
                    this.callbacks.addPills(3);
                } else if (a1 === a2 && a2 !== this.field[i][j]) {
                    a1 = this.field[i][j];
                    a2 = 0;
                } else if (a1 === this.field[i][j]) {
                    a2 = this.field[i][j];
                } else {
                    a1 = this.field[i][j];
                }
            }
        } 
    }

    restartTime() {
        this.startTimeUpdate();
    }

    isGameOver() { }

    removeLines() { }

    getNewLevel() {
        /*this.count = 0;
        if (this.pills >= 20) {
           this.count += 1;
        }
        this.pills += 10;*/
    }

    clear() {
        this.context.fillStyle = 'purple';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clear();
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field.length; j++) {
                if (this.field[i][j]) {
                    this.context.drawImage(this.pills[this.field[i][j]], i * this.SIZE, j * this.SIZE, this.SIZE, this.SIZE);
                } else {
                    this.context.fillRect(i * this.SIZE, j * this.SIZE, this.SIZE, this.SIZE)
                }
            }
        }
    }
}

export default GameDrPill;