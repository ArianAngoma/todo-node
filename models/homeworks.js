const Homework = require("./homework");

class Homeworks {
    constructor() {
        this.list = {};
    }

    get listArr() {
        return Object.values(this.list);
    }

    loadHomeworks(homeworks = []) {
        homeworks.forEach(homework => {
            this.list[homework.id] = homework;
        })
    }

    listCompleted() {
        console.log()
        this.listArr.forEach((homework, i) => {
            console.log(`${(i + 1 + '.').green} ${homework.desc} :: ${homework.completed ? 'Completado'.green : 'Pendiente'.red}`);
        })
    }

    listPendingCompleted(done = true) {
        console.log();
        this.listArr
            .filter(homework => done ? homework.completed : !homework.completed)
            .forEach((homework, i) => {
                console.log(`${(i + 1 + '.').green} ${homework.desc} :: ${done ? homework.completed.green : 'Pendiente'.red}`);
            });
    }

    deleteHomework(id) {
        if (this.list[id]) delete this.list[id];
    }

    createHomework(desc) {
        const homework = new Homework(desc);
        this.list[homework.id] = homework;
    }

    toggleCompleted(ids = []) {
        ids.forEach(id => {
            const homework = this.list[id];
            if (!homework.completed) homework.completed = new Date().toISOString();
        })

        this.listArr.forEach(homework => {
            if (!ids.includes(homework.id)) {
                this.list[homework.id].completed = null;
            }
        })
    }
}

module.exports = Homeworks;