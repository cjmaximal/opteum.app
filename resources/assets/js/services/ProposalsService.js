import Vue from 'vue'
export default {
    /**
     * Получить список заявок
     * @param success
     * @param error
     */
    getProposals(success, error){
        Vue.http.get('/api/proposals').then(
            (response) => {
                success(response)
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
    addProposal(success, error, data){
        Vue.http.post('/api/proposal', data).then(
            (response) => {
                success(response)
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
    finishProposal(success, error, id){
        Vue.http.put('/api/proposal/' + id).then(
            (response) => {
                success(response)
            },
            (response) => {
                console.log(response)
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
    deleteProposal(success, error, id){
        Vue.http.delete('/api/proposal/' + id).then(
            (response) => {
                success(response)
            },
            (response) => {
                error(response)
            }
        )
    }
}