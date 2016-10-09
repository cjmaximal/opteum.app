// список Активных заявок
export const isActiveTasks = state => state.tasksList.tasks

// Заявки
export const tasks = state => state.tasksList.tasks

// ошибки выполнения запросов
export const error = state => state.tasksList.error

// индикатор загрузки заявок
export const loadingProcess = state => state.tasksList.loadingProcess

// индикатор добавления заявки
export const addingProcess = state => state.tasksList.addingProcess

// открыта/закрыта форма Новая зявка
export const isNewTask = state => state.tasksList.isNewTask

// поля Новой заявки
export const newTaskForm = state => state.tasksList.newTask

// ошибки валидации Новой заявки
export const isValidForm = state => state.tasksList.newTaskValidation

// изменения состояний полей формы Новая заявка
export const isEditedForm = state => state.tasksList.newTaskEdited
