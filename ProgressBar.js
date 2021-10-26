module.exports = class ProgressBar {
    constructor() {
        this.total;
        this.current;
        this.barLength = process.stdout.columns - 30;
    }

    initialize(total) {
        this.total = total;
        this.current = 0;
        this.update(this.current);
    }

    update(current) {
        this.current = current;
        const currentProgress = this.current / this.total;
        this.draw(currentProgress);
    }

    draw(currentProgress) {
        const filledBarLength = (currentProgress * this.barLength).toFixed(0);
        const emptyBarLength = this.barLength - filledBarLength;

        const filledBar = this.getBar(filledBarLength, '#');
        const emptyBar = this.getBar(emptyBarLength, '-');
        const percentComplete = (currentProgress * 100).toFixed(2);

        process.stdout.clearLine(() => {});
        process.stdout.cursorTo(0);
        process.stdout.write(`Current progress: [${filledBar}${emptyBar}] ${percentComplete}%`, () => {});
    }

    getBar(length, char) {
        let str = '';

        for (let i = 0; i < length; i++) {
            str += char;
        }

        return str;
    }
}
