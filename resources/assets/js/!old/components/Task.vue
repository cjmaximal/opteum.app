<template>
    <li class="list-group-item">
        <input type="hidden" :value="id" :on="setId">
        <div class="row">
            <!-- User Info -->
            <div class="col-xs-offset-3 col-xs-9">
                <h4 class="list-group-item-heading task-name">{{ task.name }}</h4>
                <code>{{ task.phone }}</code>
            </div>
        </div>
        <!-- Task Info -->
        <span class="small">{{ task.user.name }}: <mark>Заявка №{{ task.id }}</mark></span>
        <!-- Task Data -->
        <div class="row">
            <div class="col-md-9">
                <div class="list-group-item-text">
                    <!-- From -->
                    <div class="row">
                        <div class="col-xs-3 text-right"><strong>Откуда</strong></div>
                        <div class="col-xs-9">{{ task.from }}</div>
                    </div>
                    <!-- To -->
                    <div class="row">
                        <div class="col-xs-3 text-right"><strong>Куда</strong></div>
                        <div class="col-xs-9">{{ task.to }}</div>
                    </div>
                    <!-- Count -->
                    <div class="row">
                        <div class="col-sm-3 col-xs-6 text-right"><strong>Пассажиров</strong></div>
                        <div class="col-sm-9 col-xs-6">{{ task.count }}</div>
                    </div>
                    <!-- Baggage -->
                    <div class="row">
                        <div class="col-sm-3 col-xs-6 text-right"><strong>Багаж</strong></div>
                        <div class="col-sm-9 col-xs-6">
                            {{ task.baggage ? 'Имеется' : 'Отсутствует' }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 text-right">
                <!--<h4 class="danger-text">Удаление <i class="fa fa-refresh fa-spin fa-fw"></i>-->
                <!--</h4>-->
                <!--<h4 class="success-text">Завершение <i-->
                <!--class="fa fa-refresh fa-spin fa-fw"></i></h4>-->

                <!-- Button Finish Task -->
                <button class="btn btn-primary"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Выполнено"
                        @click="finishTask(task)">
                    <i class="fa fa-check-square-o fa-fw"></i>
                </button>
                <!-- Button Delete Task -->
                <button class="btn btn-danger"
                        type="button"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Удалить"
                        @click="deleteTask(task)">
                    <i class="fa fa-trash fa-fw"></i>
                </button>
            </div>
        </div>
    </li>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import TaskService from '../services/TaskService'

    export default{
        props: ['task', 'id'],
        data() {
            return {
                id: -1,
                finishing: false,
                deleting: false
            }
        },
        computed: {
            ...mapGetters([
                'error',
                'deletingProcess',
                'finishingProcess'
            ])
        },
        methods: {
            ...mapActions([
                'deleteTask',
                'finishTask',
            ]),
            setId(event){
                this.id = event.target.value
            },
            deleteTask(){
                this.deleting = true
                // todo: отправить событие другому диспетчеру о том что заявка удаляется (надо заблокировать)
                TaskService.deleteTasks((response)=> {
                    this.error = {ok: response.ok, status: response.status, statusText: response.statusText}
                    // todo: отправить событие другому диспетчеру о том что заявка удалена (надо удалить)
                    this.deleting = false
                }, (response) => {
                    this.error = {ok: response.ok, status: response.status, statusText: response.statusText}
                    // todo: отправить событие другому диспетчеру о том что завка не удалена (надо разблокировать)
                    this.deleting = false
                }, this.id)
            },
        }
    }
</script>
