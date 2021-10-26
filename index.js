const fs = require('fs');

const args = process.argv.slice(2);
const fileName = args[0].slice(0, -4);
const numberOfParts = args[1];


const main = () => {
    if (args.length != 2 || Number.isNaN(parseInt(args[1]))) {
        console.log("Incorrect command line arguments provided.");
        return;
    }

    const file = fs.readFileSync(`./${fileName}.csv`, 'utf8');
    const headers = file.substring(0, file.indexOf('\n'));

    for (let i = 0; i < numberOfParts; i++) {
        fs.writeFile(`./${fileName}_part_${i}.csv`, `${headers}\n`, 'utf8', () => {})
    }

    fs.readFile(`./${fileName}.csv`, 'utf8', (error, data) => {
        const arr = data.split('\n');
        const rowsPerPart = arr.length / numberOfParts;

        for (let i = 1; i < arr.length; i++) {
            fs.appendFileSync(`./${fileName}_part_${Math.floor(i / rowsPerPart)}.csv`,
                `${arr[i]}\n`, 'utf8', () => {});
        }
        console.log('\nDone!');
    })
}

main();