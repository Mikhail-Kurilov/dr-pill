class GameDrPill {
    constructor({ id, callbacks }) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 560;
        this.canvas.height = 560;
        this.canvas.addEventListener('click', (event) => this.clickCell(event));
        this.canvas.addEventListener('mousemove', (event) => this.moveCell(event));
        this.canvas.addEventListener('mouseup', () => this.upCell());
        this.canvas.addEventListener('mousedown', (event) => this.downCell(event));

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
        this.isDrug = null;
        this.drugX = -1;
        this.drugY = -1;

        this.booms = [];
        this.boomImages = [];
        this.boomImages.push(new Image());
        this.boomImages[0].src = '/img/1.png';
        this.boomImages.push(new Image());
        this.boomImages[1].src = '/img/2.png';
        this.boomImages.push(new Image());
        this.boomImages[2].src = '/img/3.png';
        this.boomImages.push(new Image());
        this.boomImages[3].src = '/img/4.png';
        this.boomImages.push(new Image());
        this.boomImages[4].src = '/img/5.png';
        this.boomImages.push(new Image());
        this.boomImages[5].src = '/img/6.png';
        this.boomImages.push(new Image());
        this.boomImages[6].src = '/img/7.png';
        this.boomImages.push(new Image());
        this.boomImages[7].src = '/img/8.png';
        this.boomImages.push(new Image());
        this.boomImages[8].src = '/img/9.png';
        this.boomImages.push(new Image());
        this.boomImages[9].src = '/img/10.png';
        this.boomImages.push(new Image());
        this.boomImages[10].src = '/img/11.png';

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

    moveCell(event) {
        if (this.isDrug) {
            if (this.drugX >= 0 && this.drugY >= 0) {
                this.render();
                if (this.field[this.drugX][this.drugY]) {
                    this.context.drawImage(
                        this.pills[this.field[this.drugX][this.drugY]],
                        event.offsetX - this.SIZE / 2,
                        event.offsetY - this.SIZE / 2,
                        this.SIZE,
                        this.SIZE
                    );
                    let x = Math.floor(event.offsetX / this.SIZE);
                    let y = Math.floor(event.offsetY / this.SIZE);
                    if (Math.abs((x + y) - (this.drugX + this.drugY)) === 1) {
                        this.move(this.drugX, this.drugY, x, y);
                        this.upCell();
                    }
                }
            }
        }
    }
    upCell() {
        this.isDrug = false;
        this.drugX = -1;
        this.drugY = -1;
    }

    downCell(event) {
        this.isDrug = true;
        this.drugX = Math.floor(event.offsetX / this.SIZE);
        this.drugY = Math.floor(event.offsetY / this.SIZE);
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
        // пробежаться по столбцам
        for (let i = 0; i < this.FIELD_SIZE; i++) {
            a1 = 0;
            a2 = 0;
            for (let j = 0; j < this.FIELD_SIZE; j++) {
                if (a1 && a1 === a2 && a2 === this.field[i][j]) {
                    this.field[i][j] = 0;
                    this.field[i][j - 1] = 0;
                    this.field[i][j - 2] = 0;
                    this.booms.push({ i, j, currentImage: -1 });
                    this.booms.push({ i, j: j - 1, currentImage: -1 });
                    this.booms.push({ i, j: j - 2, currentImage: -1 });
                    setTimeout(() => this.dropElements(), 1500);
                    this.render();
                    this.callbacks.addPills(3);
                } else if (a1 && a1 === a2 && a2 !== this.field[i][j]) {
                    a1 = this.field[i][j];
                    a2 = 0;
                } else if (a1 && a1 === this.field[i][j]) {
                    a2 = this.field[i][j];
                } else {
                    a1 = this.field[i][j];
                }
            }
        }
        // пробежаться по строки
        for (let j = 0; j < this.FIELD_SIZE; j++) {
            a1 = 0;
            a2 = 0;
            for (let i = 0; i < this.FIELD_SIZE; i++) {
                if (a1 && a1 === a2 && a2 === this.field[i][j]) {
                    this.field[i][j] = 0;
                    this.field[i - 1][j] = 0;
                    this.field[i - 2][j] = 0;
                    this.booms.push({ i, j, currentImage: -1 });
                    this.booms.push({ i: i - 1, j, currentImage: -1 });
                    this.booms.push({ i: i - 2, j, currentImage: -1 });
                    setTimeout(() => this.dropElements(), 1500);
                    this.render();
                    this.callbacks.addPills(3);
                } else if (a1 && a1 === a2 && a2 !== this.field[i][j]) {
                    a1 = this.field[i][j];
                    a2 = 0;
                } else if (a1 && a1 === this.field[i][j]) {
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

    clear() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
        this.context.fillStyle = `rgb(
            ${Math.floor(255 - 42.5 * i)},
            ${Math.floor(255 - 42.5 * j)},
            0)`;
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height);
            }
        }
    }

    render() {
        this.clear(); // очистка
        // нарисовать пилюльки
        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field.length; j++) {
                if (this.field[i][j]) {
                    if (this.drugX === i && this.drugY === j) {
                        continue;
                    }
                    this.context.drawImage(this.pills[this.field[i][j]], i * this.SIZE, j * this.SIZE, this.SIZE, this.SIZE);
                } else {
                    this.context.fillRect(i * this.SIZE, j * this.SIZE, this.SIZE, this.SIZE)
                }
            }
        }

        // нарисовать бумсы
        let refresh = false;
        for (let i = this.booms.length - 1; i >= 0; i--) {
            const boom = this.booms[i];
            if (boom) {
                boom.currentImage++;
                if (boom.currentImage >= this.boomImages.length) {
                    this.booms.splice(i, 1);
                } else {
                    const i = boom.i;
                    const j = boom.j;
                    this.context.drawImage(this.boomImages[boom.currentImage], i * this.SIZE, j * this.SIZE, this.SIZE, this.SIZE);
                    refresh = true;
                }
            }
        }

        if (refresh) {
            setTimeout(() => this.render(), 125);
        }
    }
}

export default GameDrPill;