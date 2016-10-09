import * as types from '../mutation-types'

// state
const state = {
    tasks: [],
    error: {},
    loadingProcess: false,
    addingProcess: false,
    isNewTask: false,
    isActiveTasks: true,
    newTask: {
        name: '',
        phone: '',
        to: '',
        from: '',
        count: 1,
        baggage: false,
        finished: false
    },
    newTaskEdited: {
        name: false,
        phone: false,
        from: false,
        to: false
    },
    newTaskValidation: {
        name: true,
        phone: true,
        from: true,
        to: true
    }
}

// mutations
const mutations = {
    // удалить заявку
    [types.DELETE_TASK] (state, task) {
        console.log(state.tasks.indexOf(task))
        state.tasks.splice(state.tasks.indexOf(task), 1)
    },


    // успешное удаление заявки
    [types.DELETING_TASK_SUCCESS] (state, error) {
        state.error = error
    },

    // ошибка удаления заявки
    [types.DELETING_TASK_ERROR] (state, error) {
        state.error = error
    },


    // пометить заявку как выполненная
    [types.FINISH_TASK] (state, task) {
        task.finished = true
    },

    // пометка заявки как выполненная - успех
    [types.FINISHING_TASK_SUCCESS] (state, error) {
        state.error = error
    },

    // пометка заявки как выполненная - ошибка
    [types.FINISHING_TASK_ERROR] (state, error) {
        state.error = error
    },


    // добавление новой заявки - состояние
    [types.ADDING_TASK] (state, adding) {
        state.addingProcess = adding
    },

    // добавление новой заявки - Добавлена
    [types.ADDING_TASK_SUCCESS] (state, newTask, error) {
        state.tasks.unshift(newTask)
        state.error = error
    },

    // добавление новой заявки - Ошибка
    [types.ADDING_TASK_ERROR] (state, error) {
        state.error = error
    },


    // форма новая заявка
    [types.ADD_TASK] (state) {
        state.isNewTask = !state.isNewTask
        if (state.isNewTask) {
            state.newTask.name = ''
            state.newTask.phone = ''
            state.newTask.to = ''
            state.newTask.from = ''
            state.newTask.count = 1
            state.newTask.baggage = false
            state.newTask.finished = false

            state.newTaskEdited.name = false
            state.newTaskEdited.phone = false
            state.newTaskEdited.from = false
            state.newTaskEdited.to = false

            state.newTaskValidation.name = true
            state.newTaskValidation.phone = true
            state.newTaskValidation.from = true
            state.newTaskValidation.to = true
        }
    },


    // Загрузка Активных заявок - состояние
    [types.LOADING_TASKS](state, loading) {
        state.loadingProcess = loading
    },

    // Загрузка Активных заявок - Ошибка
    [types.LOADING_TASKS_ERROR](state, error) {
        state.error = error
    },

    // Загрузка Активных заявок - Загружены
    [types.LOADING_TASKS_SUCCESS](state, tasks, error) {
        tasks.forEach(function (item, i, arr) {
            state.tasks.unshift(item)
        })
        state.error = error
    },


    // Редактирование поля Имя, формы Новая задача
    [types.EDIT_NEW_TASK_NAME](state, name) {
        state.newTask.name = name.replace(/ +/g, " ").trim()
        state.newTaskValidation.name = state.newTask.name !== ''
        state.newTaskEdited.name = true
    },

    // Редактирование поля Телефон, формы Новая задача
    [types.EDIT_NEW_TASK_PHONE](state, phone) {
        state.newTask.phone = phone
        var mask = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/
        state.newTaskValidation.phone = mask.test(state.newTask.phone)
        state.newTaskEdited.phone = true
    },

    // Редактирование поля Откуда, формы Новая задача
    [types.EDIT_NEW_TASK_FROM](state, from) {
        state.newTask.from = from.replace(/ +/g, " ").trim()
        state.newTaskValidation.from = state.newTask.from !== ''
        state.newTaskEdited.from = true
    },

    // Редактирование поля Куда, формы Новая задача
    [types.EDIT_NEW_TASK_TO](state, to) {
        state.newTask.to = to.replace(/ +/g, " ").trim()
        state.newTaskValidation.to = state.newTask.to !== ''
        state.newTaskEdited.to = true
    },

    // Выбор значения списка Количество пассажиров, формы Новая задача
    [types.EDIT_NEW_TASK_COUNT](state, count) {
        state.newTask.count = count
    },

    // Выбор опции Багаж, формы Новая задача
    [types.EDIT_NEW_TASK_BAGGAGE](state, baggage) {
        state.newTask.baggage = baggage
    }
}

export default {
    state,
    mutations
}