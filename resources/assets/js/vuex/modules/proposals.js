import * as types from '../mutations-types'

// state
const state = {
    proposals: [],
    error: {},
    loadingProcess: false,
    addingProcess: false,
    isNewProposal: false,
    newProposal: {
        name: '',
        phone: '',
        to: '',
        from: '',
        count: 1,
        baggage: false,
        finished: false
    },
    newProposalEdited: {
        name: false,
        phone: false,
        from: false,
        to: false
    },
    newProposalValidated: {
        name: true,
        phone: true,
        from: true,
        to: true
    }
}

// mutations
const mutations = {

    /**
     *  Загрузка заявок
     * @param state
     * @param loading
     */
        [types.LOADING_PROPOSALS] (state, loading) {
        state.loadingProcess = loading
    },

    /**
     * Загрузка заявок - успех
     * @param state
     * @param proposals
     * @param error
     */
        [types.LOADING_PROPOSALS_SUCCESS] (state, proposals, error) {
        proposals.forEach(function (item, i, arr) {
            state.proposals.unshift(item)
        })
        state.error = error
    },

    /**
     * Загрузка заявок - ошибка
     * @param state
     * @param error
     */
        [types.LOADING_PROPOSALS_ERROR] (state, error) {
        state.error = error
    },


    /**
     * Новая заявка - показать/скрыть форму
     * @param state
     */
        [types.ADD_PROPOSAL] (state) {
        state.isNewProposal = !state.isNewProposal
        if (state.isNewProposal) {
            state.newProposal.name = ''
            state.newProposal.phone = ''
            state.newProposal.to = ''
            state.newProposal.from = ''
            state.newProposal.count = 1
            state.newProposal.baggage = false
            state.newProposal.finished = false

            state.newProposalEdited.name = false
            state.newProposalEdited.phone = false
            state.newProposalEdited.from = false
            state.newProposalEdited.to = false

            state.newProposalValidated.name = true
            state.newProposalValidated.phone = true
            state.newProposalValidated.from = true
            state.newProposalValidated.to = true
        }
    },

    /**
     * Добавление новой заявки - состояние
     * @param state
     * @param adding
     */
        [types.ADDING_PROPOSAL] (state, adding) {
        state.addingProcess = adding
    },

    /**
     * Добавление новой заявки - Добавлена
     * @param state
     * @param proposal
     * @param error
     */
        [types.ADDING_PROPOSAL_SUCCESS] (state, {proposal, error}) {
        state.error = error
        state.proposals.unshift(proposal)
    },

    /**
     * Добавление новой заявки - Ошибка
     * @param state
     * @param error
     */
        [types.ADDING_PROPOSAL_ERROR] (state, error) {
        state.error = error
    },


    /**
     * Завершение заявки - процесс
     * @param state
     * @param proposal
     * @param finishing
     */
        [types.FINISHING_PROPOSAL] (state, {proposal, finishing}) {
        state.proposals[state.proposals.indexOf(proposal)].finishing = finishing
    },

    /**
     * Завершение заявки - успех
     * @param state
     * @param proposal
     * @param updatedProposal
     * @param error
     */
        [types.FINISHING_PROPOSAL_SUCCESS] (state, {proposal, updatedProposal, error}) {
        state.error = error
        state.proposals.splice(state.proposals.indexOf(proposal), 1, updatedProposal)
    },

    /**
     * Завершение заявки - ошибка
     * @param state
     * @param error
     */
        [types.FINISHING_PROPOSAL_ERROR] (state, error) {
        state.error = error
    },


    /**
     * Удаление заявки - процесс
     * @param state
     * @param proposal
     * @param deleting
     */
        [types.DELETING_PROPOSAL] (state, {proposal, deleting}) {
        state.proposals[state.proposals.indexOf(proposal)].deleting = deleting
    },

    /**
     * Удаление заявки - успех
     * @param state
     * @param proposal
     * @param error
     */
        [types.DELETING_PROPOSAL_SUCCESS] (state, {proposal, error}) {
        state.error = error
        state.proposals.splice(state.proposals.indexOf(proposal), 1)
    },

    /**
     * Удаление заявки - ошибка
     * @param state
     * @param error
     */
        [types.DELETING_PROPOSAL_ERROR] (state, error) {
        state.error = error
    },


    /**
     * Редактирование поля Имя, формы Новая задача
     * @param state
     * @param name
     */
        [types.EDIT_NEW_PROPOSAL_NAME](state, name) {
        state.newProposal.name = name.replace(/ +/g, " ").trim()
        state.newProposalValidated.name = state.newProposal.name !== ''
        state.newProposalEdited.name = true
    },

    /**
     * Редактирование поля Телефон, формы Новая задача
     * @param state
     * @param phone
     */
        [types.EDIT_NEW_PROPOSAL_PHONE](state, phone) {
        state.newProposal.phone = phone
        var mask = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{6,10}$/
        state.newProposalValidated.phone = mask.test(state.newProposal.phone)
        state.newProposalEdited.phone = true
    },

    /**
     * Редактирование поля Откуда, формы Новая задача
     * @param state
     * @param from
     */
        [types.EDIT_NEW_PROPOSAL_FROM](state, from) {
        state.newProposal.from = from.replace(/ +/g, " ").trim()
        state.newProposalValidated.from = state.newProposal.from !== ''
        state.newProposalEdited.from = true
    },

    /**
     * Редактирование поля Куда, формы Новая задача
     * @param state
     * @param to
     */
        [types.EDIT_NEW_PROPOSAL_TO](state, to) {
        state.newProposal.to = to.replace(/ +/g, " ").trim()
        state.newProposalValidated.to = state.newProposal.to !== ''
        state.newProposalEdited.to = true
    },

    /**
     * Выбор значения списка Количество пассажиров, формы Новая задача
     * @param state
     * @param count
     */
        [types.EDIT_NEW_PROPOSAL_COUNT](state, count) {
        state.newProposal.count = count
    },

    /**
     * Выбор опции Багаж, формы Новая задача
     * @param state
     * @param baggage
     */
        [types.EDIT_NEW_PROPOSAL_BAGGAGE](state, baggage) {
        state.newProposal.baggage = baggage
    }

}

export default {
    state,
    mutations
}