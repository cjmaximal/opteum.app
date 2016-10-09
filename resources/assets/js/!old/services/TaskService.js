import Vue from 'vue'
export default {
    /**
     * Получить список заявок
     * @param success
     * @param error
     */
    getTasks(success, error){
        Vue.http.get('/api/tasks').then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )
    },

    /**
     * Добавить новую заявку
     * @param success
     * @param error
     * @param data
     */
    addTask(success, error, data){
        Vue.http.post('/api/tasks', data).then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )
    },

    /**
     * Заявка выполнена
     * @param success
     * @param error
     * @param id
     */
    finishTask(success, error, id){
        Vue.http.put('/api/task/' + id).then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )
    },

    /**
     * Удалить заявку
     * @param success
     * @param error
     * @param id
     */
    deleteTasks(success, error, id){
        Vue.http.get('/api/task/' + id).then(
            (response) => {
                success(response.data)
            },
            (response) => {
                error(response)
            }
        )
    },
}