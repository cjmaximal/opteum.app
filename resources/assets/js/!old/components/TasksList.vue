<style scoped>
    .task-name {
        display: inline-flex;
        margin-right: 10px;

    }
</style>
<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <!-- Panel Heading -->
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-md-9 col-sm-8 col-xs-12">
                                <span class="lead">{{ title }}</span>
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-12">

                                <!-- Button Add Task -->
                                <button class="btn btn-success btn-block"
                                        type="button"
                                        :disabled="loadingProcess || isNewTask"
                                        @click="addTask">
                                    <i class="fa fa-plus-square"></i> Добавить
                                </button>

                            </div>
                        </div>
                    </div>

                    <!-- Panel Body -->
                    <div class="panel-body">
                        <div class="btn-group btn-group-justified" role="group" aria-label="Заявки">

                            <!-- Active Tasks Button -->
                            <div class="btn-group" role="group">
                                <button type="button"
                                        :class="classActiveTasks"
                                        :disabled="loadingProcess || isNewTask">Активные&nbsp;
                                    <span class="badge">{{ activeTasksCount }}</span>
                                </button>
                            </div>

                            <!-- Finished Tasks Button -->
                            <div class="btn-group" role="group">
                                <button type="button"
                                        :class="classFinishedTasks"
                                        :disabled="loadingProcess || isNewTask">Завершённые
                                </button>
                            </div>

                        </div>
                    </div>
                    <ul class="list-group">

                        <!-- Loading Data -->
                        <li class="list-group-item"
                            id="loading-tasks"
                            v-if="loadingProcess"
                            v-show="!isNewTask">
                            <div class="text-center">
                                <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                                <span class="sr-only">Loading...</span>
                                <div class="clearfix"></div>
                                Список заявок загружается...
                            </div>
                        </li>

                        <!-- Empty Data -->
                        <li class="list-group-item"
                            id="empty-tasks"
                            v-if="activeTasksCount === 0 && !loadingProcess"
                            v-show="!isNewTask">
                            <div class="text-center">
                                <i class="fa fa-warning fa-3x fa-fw"></i>
                                <div class="clearfix"></div>
                                <span class="text-muted"><strong>Нет активных заявок</strong></span>
                            </div>
                        </li>

                        <!-- New Task -->
                        <li class="list-group-item"
                            id="new-task"
                            v-show="isNewTask">
                            <form class="form-horizontal" id="new-task-form">
                                <fieldset :disabled="addingProcess">

                                    <!-- Name -->
                                    <div :class="classHasErrorInputName">
                                        <label for="inputName" class="col-sm-2 control-label">Имя</label>
                                        <div class="col-sm-10">
                                            <input type="text"
                                                   class="form-control"
                                                   id="inputName"
                                                   autofocus
                                                   required
                                                   placeholder="Имя"
                                                   :value="newTaskForm.name"
                                                   @input="editNewTaskName">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!isValidForm.name"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="isValidForm.name && isEditedForm.name"></span>
                                        </div>
                                    </div>

                                    <!-- Phone -->
                                    <div :class="classHasErrorInputPhone">
                                        <label for="inputPhone" class="col-sm-2 control-label">Телефон</label>
                                        <div class="col-sm-10">
                                            <input type="tel"
                                                   class="form-control"
                                                   id="inputPhone"
                                                   placeholder="Телефон"
                                                   required
                                                   :value="newTaskForm.phone"
                                                   @input="editNewTaskPhone">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!isValidForm.phone"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="isValidForm.phone && isEditedForm.phone"></span>
                                        </div>
                                    </div>

                                    <!-- From -->
                                    <div :class="classHasErrorInputFrom">
                                        <label for="inputFrom" class="col-sm-2 control-label">Откуда</label>
                                        <div class="col-sm-10">
                                            <input type="text"
                                                   class="form-control"
                                                   id="inputFrom"
                                                   placeholder="Откуда"
                                                   required
                                                   :value="newTaskForm.from"
                                                   @input="editNewTaskFrom">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!isValidForm.from"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="isValidForm.from && isEditedForm.from"></span>
                                        </div>
                                    </div>

                                    <!-- To -->
                                    <div :class="classHasErrorInputTo">
                                        <label for="inputTo" class="col-sm-2 control-label">Куда</label>
                                        <div class="col-sm-10">
                                            <input type="text"
                                                   class="form-control"
                                                   id="inputTo"
                                                   placeholder="Куда"
                                                   required
                                                   :value="newTaskForm.to"
                                                   @input="editNewTaskTo">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!isValidForm.to"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="isValidForm.to && isEditedForm.to"></span>
                                        </div>
                                    </div>

                                    <!-- Count -->
                                    <div class="form-group">
                                        <label for="selCount" class="col-sm-4">Количество пассажиров</label>
                                        <div class="col-sm-8">
                                            <select class="form-control"
                                                    id="selCount"
                                                    :value="newTaskForm.count"
                                                    @input="editNewTaskCount">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Baggage -->
                                    <div class="form-group">
                                        <div class="col-sm-offset-4 col-sm-8">
                                            <div class="checkbox">
                                                <label>
                                                    <input type="checkbox"
                                                           :checked="newTaskForm.baggage"
                                                           @change="editNewTaskBaggage"> Багаж
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Buttons -->
                                    <div class="form-group">

                                        <!-- Create Task -->
                                        <div class="col-sm-offset-2 col-sm-4">
                                            <button type="button"
                                                    class="btn btn-success btn-block"
                                                    :disabled="!isValidNewTaskForm"
                                                    @click="attemptAddTask">
                                                <i :class="classAddingTask"></i>&nbsp;Создать заявку
                                            </button>
                                        </div>

                                        <!-- Cancel -->
                                        <div class="col-sm-4">
                                            <button type="button"
                                                    class="btn btn-danger btn-block"
                                                    @click="hideNewTaskForm">
                                                <i class="fa fa-ban fa-fw"></i> Отмена
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </li>

                        <!-- Tasks -->
                        <task v-for="task in tasks" :task="task" :id="task.id"></task>
                    </ul>
                    <!-- Panel Footer -->
                    <div class="panel-footer">
                        Активных заявок <span class="badge">{{ activeTasksCount }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Task from './Task.vue'
    import {mapGetters, mapActions} from 'vuex'

    const filters = {
        active: tasks => tasks.filter(task => !task.finished),
        finished: tasks => tasks.filter(task => task.finished)
    }

    export default {
        components: { Task },
        computed: {
            ...mapGetters([
                'tasks',
                'error',
                'loadingProcess',
                'addingProcess',
                'newTaskForm',
                'isNewTask',
                'isEditedForm',
                'isValidForm',
                'isActiveTasks'
            ]),
            // заголовок
            title() {
                return this.isNewTask ? 'Новая заявка' : this.subtitle
            },
            subtitle() {
                return this.isActiveTasks ? 'Активные заявки' : 'Завершённые заявки'
            },

            // классы добавления заявки
            classAddingTask() {
                return {
                    'fa fa-plus-square fa-fw': !this.addingProcess,
                    'fa fa-refresh fa-spin fa-fw': this.addingProcess
                }
            },

            // классы Кнопка Активные заявки
            classActiveTasks() {
                return {
                    btn: true,
                    'active btn-success': this.isActiveTasks,
                    'btn-default': !this.isActiveTasks
                }
            },
            // классы Кнопка Завершенные заявки
            classFinishedTasks(){
                return {
                    btn: true,
                    'active btn-primary': !this.isActiveTasks,
                    'btn-default': this.isActiveTasks
                }
            },

            // классы полей ввода Новой заявки
            classHasErrorInputName(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.isValidForm.name,
                    'has-success has-feedback': this.isValidForm.name && this.isEditedForm.name
                }
            },
            classHasErrorInputPhone(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.isValidForm.phone,
                    'has-success has-feedback': this.isValidForm.phone && this.isEditedForm.phone
                }
            },
            classHasErrorInputFrom(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.isValidForm.from,
                    'has-success has-feedback': this.isValidForm.from && this.isEditedForm.from
                }
            },
            classHasErrorInputTo(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.isValidForm.to,
                    'has-success has-feedback': this.isValidForm.to && this.isEditedForm.to
                }
            },

            // проверка валидности формы
            isValidNewTaskForm() {
                return this.isValidForm.name
                        && this.isValidForm.phone
                        && this.isValidForm.from
                        && this.isValidForm.to
                        && this.isEditedForm.name
                        && this.isEditedForm.phone
                        && this.isEditedForm.from
                        && this.isEditedForm.to
            },

            // количество активных заявок
            activeTasksCount() {
                return filters.active(this.tasks).length
            }
        },
        methods: {
            ...mapActions([
                'getTasks',
                'addTask',
                'postTask',
                'editNewTaskBaggage',
                'editNewTaskCount',
                'editNewTaskFrom',
                'editNewTaskName',
                'editNewTaskPhone',
                'editNewTaskTo'
            ]),
            setTitle() {
                document.head.title = this.subtitle + ' ' + this.title
            },
            showNewTaskForm() {
                this.$store.dispatch('addTask').then(() => {
                    document.querySelector('#inputName').focus()
                })
            },
            hideNewTaskForm() {
                this.$store.dispatch('addTask')
            },
            attemptAddTask() {
                if (this.isValidNewTaskForm) this.$store.dispatch('postTask', this.newTaskForm)
            }
        },
        created(){
            this.$store.dispatch('getTasks')
        }
    }
</script>
