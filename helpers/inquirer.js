const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {value: '1', name: `${'1.'.green} Crear tarea`},
            {value: '2', name: `${'2.'.green} Listar tareas`},
            {value: '3', name: `${'3.'.green} Listar tareas completadas`},
            {value: '4', name: `${'4.'.green} Listar tareas pendientes`},
            {value: '5', name: `${'5.'.green} Completar tarea(s)`},
            {value: '6', name: `${'6.'.green} Borrar tarea`},
            {value: '0', name: `${'0.'.green} Salir`}
        ]
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('Seleccione una opción\n'.green);
    const {option} = await inquirer.prompt(questions);
    return option;
}

const stop = async () => {
    console.log('\n');
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'confirm',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ])
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) return 'Por favor ingrese un valor';
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listHomeworkDelete = async (homework = []) => {
    const choices = homework.map((homework, i) => {
        return {
            value: homework.id,
            name: `${(i + 1 + '.').green} ${homework.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    });

    const question = [
        {type: 'list', name: 'id', message: 'Borrar', choices}
    ]
    const {id} = await inquirer.prompt(question);
    return id;
}

const confirm = async (message) => {
    const question = [
        {type: 'confirm', name: 'ok', message}
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;
}

const showCheckList = async (homework = []) => {
    const choices = homework.map((homework, i) => {
        return {
            value: homework.id,
            name: `${(i + 1 + '.').green} ${homework.desc}`,
            checked: !!(homework.completed)
        }
    })

    const question = [
        {type: 'checkbox', name: 'ids', message: 'Seleccione', choices}
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    stop,
    readInput,
    listHomeworkDelete,
    confirm,
    showCheckList
}