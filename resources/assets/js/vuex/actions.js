import vm from '../app'
import ProposalService from '../services/ProposalsService'
import TooltipService from '../services/TooltipService'
import * as types from '../vuex/mutations-types'

// Добавить заявку в список
export const eventAddProposal = ({commit}, proposal) => {
    commit(types.EVENT_ADD_PROPOSAL, proposal)
}

// Завершить заявку
export const eventFinishProposal = ({commit}, proposal) => {
    commit(types.EVENT_FINISH_PROPOSAL, proposal)
}

// Удалить заявку
export const eventDeleteProposal = ({commit}, proposalId) => {
    commit(types.EVENT_DELETE_PROPOSAL, proposalId)
}

// Завершение заявки
export const eventProposalFinishing = ({commit}, {proposalId, finishing}) => {
    commit(types.FINISHING_PROPOSAL, {proposalId, finishing})
}

// Удаление заявки
export const eventProposalDeleting = ({commit}, {proposalId, deleting}) => {
    commit(types.DELETING_PROPOSAL, {proposalId, deleting})
}


// Загрузка заявок - запрос
export const loadProposals = ({commit}) => {
    commit(types.LOADING_PROPOSALS, true)
    ProposalService.getProposals(
        (response) => {
            console.info('Loading Proposals SUCCESS', response)
            var error = {statusText: response.statusText, status: response.status, ok: response.ok}
            var proposals = response.body
            commit(types.LOADING_PROPOSALS_SUCCESS, proposals, error)
            commit(types.LOADING_PROPOSALS, false)
            TooltipService.createTooltips()
        },
        (response) => {
            console.error('Loading Proposals ERROR', response)
            var error = {statusText: response.statusText, status: response.status, ok: response.ok}
            commit(types.LOADING_PROPOSALS_ERROR, error)
            commit(types.LOADING_PROPOSALS, false)
        }
    )
}

// новая заявка - показать/скрыть форму добавления заявки
export const addProposal = ({commit}) => {
    commit(types.ADD_PROPOSAL)
}

// Добавление Новой заявки (POST)
export const postProposal = ({commit}, newProposal) => {
    commit(types.ADDING_PROPOSAL, true)
    ProposalService.addProposal(
        (response) => {
            console.info('Adding New Proposal SUCCESS', response)
            var error = {statusText: response.statusText, status: response.status, ok: response.ok}
            var proposal = response.data[0]
            commit(types.ADDING_PROPOSAL_SUCCESS, {proposal, error})
            commit(types.ADDING_PROPOSAL, false)
            commit(types.ADD_PROPOSAL)
            TooltipService.createTooltips()

            vm.$socket.emit('ProposalAdd', proposal)
        },
        (response) => {
            console.error('Adding New Proposal ERROR', response)
            var error = {statusText: response.statusText, status: response.status, ok: response.ok}
            commit(types.ADDING_PROPOSAL_ERROR, error)
            commit(types.ADDING_PROPOSAL, false)
        },
        newProposal
    )
}

// Завершить заявку
export const finishProposal = ({commit}, proposal) => {
    TooltipService.hideTooltip()
    let proposalId = proposal.id
    let data = {proposalId, finishing:true}
    commit(types.FINISHING_PROPOSAL, data)
    vm.$socket.emit('ProposalFinishing', data)
    ProposalService.finishProposal(
        (response) => {
            console.info('Finishing Proposal SUCCESS', response)
            var error = {statusText: response.statusText, status: response.status, ok: response.ok}
            var updatedProposal = response.data[0]
            commit(types.FINISHING_PROPOSAL_SUCCESS, {proposal, updatedProposal, error})
            // commit(types.FINISHING_PROPOSAL, {proposal, finishing:false})
            vm.$socket.emit('ProposalFinish', updatedProposal)
        },
        (response) => {
            console.error('Finishing Proposal ERROR', response)
            let error = {statusText: response.statusText, status: response.status, ok: response.ok}
            commit(types.FINISHING_PROPOSAL_ERROR, error)
            let proposalId = proposal.id
            let data = {proposalId, finishing:false}
            commit(types.FINISHING_PROPOSAL, data)
            vm.$socket.emit('ProposalFinishing', data)
        },
        proposal.id
    )
}

// Удалить заявку
export const deleteProposal = ({commit}, proposal) => {
    TooltipService.hideTooltip()
    let proposalId = proposal.id
    let data = {proposalId, deleting:true}
    commit(types.DELETING_PROPOSAL, data)
    vm.$socket.emit('ProposalDeleting', data)
    ProposalService.deleteProposal(
        (response) => {
            console.info('Deleting Proposal SUCCESS', response)
            var error = {statusText: response.statusText, status: response.status, ok: response.ok}
            commit(types.DELETING_PROPOSAL_SUCCESS, {proposal, error})
            // commit(types.DELETING_PROPOSAL, {proposal, deleting:false})
            vm.$socket.emit('ProposalDelete', proposal.id)
        },
        (response) => {
            console.error('Deleting Proposal ERROR', response)
            let error = {statusText: response.statusText, status: response.status, ok: response.ok}
            commit(types.DELETING_PROPOSAL_ERROR, error)
            let proposalId = proposal.id
            let data = {proposalId, deleting:false}
            commit(types.DELETING_PROPOSAL, data)
            vm.$socket.emit('ProposalDeleting', data)
        },
        proposal.id
    )
}

// Редактирование полей формы Новая заявка
export const editNewProposalName = ({commit}, e) => {
    commit(types.EDIT_NEW_PROPOSAL_NAME, e.target.value)
}
export const editNewProposalPhone = ({commit}, e) => {
    commit(types.EDIT_NEW_PROPOSAL_PHONE, e.target.value)
}
export const editNewProposalFrom = ({commit}, e) => {
    commit(types.EDIT_NEW_PROPOSAL_FROM, e.target.value)
}
export const editNewProposalTo = ({commit}, e) => {
    commit(types.EDIT_NEW_PROPOSAL_TO, e.target.value)
}
export const editNewProposalCount = ({commit}, e) => {
    commit(types.EDIT_NEW_PROPOSAL_COUNT, e.target.value)
}
export const editNewProposalBaggage = ({commit}, e) => {
    commit(types.EDIT_NEW_PROPOSAL_BAGGAGE, e.target.checked)
}