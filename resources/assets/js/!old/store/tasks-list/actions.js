import Vue from 'vue'
import * as types from '../mutation-types'

// Загрузка Активных заявок - состояние
export const loadingTasks = ({commit}, loading) => {
    commit(types.LOADING_TASKS, loading)
}

// Загрузка Активных заявок (GET)
export const getTasks = ({commit}) => {
    commit(types.LOADING_TASKS, true)
    Vue.http.get('/api/tasks').then((response) => {
        console.log('response', response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        var tasks = response.body
        commit(types.LOADING_TASKS_SUCCESS, tasks, error)
        commit(types.LOADING_TASKS, false)
    }, (response) => {
        console.log(response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        commit(types.LOADING_TASKS_ERROR, error)
        commit(types.LOADING_TASKS, false)
    })
}

// заявки загружены
export const loadingTaskSuccess = ({commit}, task, error) => {
    commit(types.LOADING_TASKS_SUCCESS, task, error)
}

// заявки не загружены - ошибка
export const loadingTaskError = ({commit}, error) => {
    commit(types.LOADING_TASKS_ERROR, error)
}

// удалить заявку
export const deleteTask = ({commit}, task) => {
    Vue.http.delete('/api/task/'+task.id).then((response) => {
        console.log('response', response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        commit(types.DELETING_TASK_SUCCESS, error)
        commit(types.DELETE_TASK, task)
    }, (response) => {
        console.log(response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        commit(types.DELETING_TASK_ERROR, error)
    })
}

// пометить заявку как выполненная
export const finishTask = ({commit}, task) => {
    Vue.http.put('/api/task/'+task.id).then((response) => {
        console.log('response', response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        commit(types.FINISHING_TASK_SUCCESS, error)
        commit(types.FINISH_TASK, task)
    }, (response) => {
        console.log(response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        commit(types.FINISHING_TASK_ERROR, error)
    })
}

export const finishingTaskSuccess = ({commit})

// новая заявка
export const addTask = ({commit}) => {
    commit(types.ADD_TASK)
}

// добавление новой заявки - состояние
export const addingTask = ({commit}, adding) => {
    commit(types.ADDING_TASK, adding)
}

// новая заявка добавлена
export const addingTaskSuccess = ({commit}, newTask, error) => {
    commit(types.ADDING_TASK_SUCCESS, newTask, error)
}

// новая заявка не добавлена - ошибка
export const addingTaskError = ({commit}, error) => {
    commit(types.ADDING_TASK_ERROR, error)
}

// Добавление Новой заявки (POST)
export const postTask = ({commit}, newTask) => {
    commit(types.ADDING_TASK, true)
    Vue.http.post('/api/task', newTask).then((response) => {
        console.log(response)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        var task = response.body.pop()
        commit(types.ADDING_TASK_SUCCESS, task, error)
        commit(types.ADDING_TASK, false)
        commit(types.ADD_TASK)
    }, (response) => {
        console.log(response)
        // error callback
        commit(types.ADDING_TASK, false)
        var error = {statusText: response.statusText, status: response.status, ok: response.ok}
        commit(types.ADDING_TASK_ERROR, error)
    })
}


// Редактирование полей формы Новая заявка
export const editNewTaskName = ({commit}, e) => {
    commit(types.EDIT_NEW_TASK_NAME, e.target.value)
}
export const editNewTaskPhone = ({commit}, e) => {
    commit(types.EDIT_NEW_TASK_PHONE, e.target.value)
}
export const editNewTaskFrom = ({commit}, e) => {
    commit(types.EDIT_NEW_TASK_FROM, e.target.value)
}
export const editNewTaskTo = ({commit}, e) => {
    commit(types.EDIT_NEW_TASK_TO, e.target.value)
}
export const editNewTaskCount = ({commit}, e) => {
    commit(types.EDIT_NEW_TASK_COUNT, e.target.value)
}
export const editNewTaskBaggage = ({commit}, e) => {
    commit(types.EDIT_NEW_TASK_BAGGAGE, e.target.checked)
}