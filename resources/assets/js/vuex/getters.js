// форма Новая заявка
export const isNewProposal = state => state.ProposalsList.isNewProposal

// Заявки
export const proposals = state => state.ProposalsList.proposals

// ошибки выполнения запросов
export const error = state => state.ProposalsList.error

// Загрузка заявок - процесс
export const loadingProcess = state => state.ProposalsList.loadingProcess

// Добавление заявки - процесс
export const addingProcess = state => state.ProposalsList.addingProcess

// поля формы Новая заявка
export const newProposal = state => state.ProposalsList.newProposal

// были ли редатированы поля формы Новая заявка (состояние)
export const newProposalEdited = state => state.ProposalsList.newProposalEdited

// состояние валидации полей формы Новая заявка
export const newProposalValidated = state => state.ProposalsList.newProposalValidated