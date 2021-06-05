const fs = require('fs');

const file = './db/data.json';

const saveFile = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => {
    if (!fs.existsSync(file)) return null;
    const info = fs.readFileSync(file, {encoding: 'utf-8'});
    return JSON.parse(info);
}

module.exports = {
    saveFile,
    readDB
}