require('colors');

const {inquirerMenu, stop, readInput, listHomeworkDelete, confirm, showCheckList} = require('./helpers/inquirer');
const Homeworks = require('./models/homeworks');
const {saveFile, readDB} = require("./helpers/save-file");

const main = async () => {
    let opt = ''
    const homeworks = new Homeworks();
    const homeworksDB = readDB();
    if (homeworksDB) homeworks.loadHomeworks(homeworksDB)
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await readInput('Descripción:');
                homeworks.createHomework(desc);
                break;

            case '2':
                homeworks.listCompleted();
                break;

            case '3':
                homeworks.listPendingCompleted(true);
                break;

            case '4':
                homeworks.listPendingCompleted(false);
                break;

            case '5':
                const ids = await showCheckList(homeworks.listArr);
                homeworks.toggleCompleted(ids);
                break;

            case '6':
                const id = await listHomeworkDelete(homeworks.listArr);
                if (id !== '0') {
                    const ok = await confirm('¿Esta seguro?');
                    if (ok) homeworks.deleteHomework(id);
                }
                break;
        }
        saveFile(homeworks.listArr);
        await stop();
    } while (opt !== '0');
}

main();