const {v4} = require('uuid');

class Homework {
    constructor(desc) {
        this.id = v4();
        this.desc = desc;
        this.completed = null;
    }
}

module.exports = Homework;