<style scoped>
    .proposal-name {
        display: inline-flex;
        margin-right: 10px;

    }

    .btn {
        outline: none !important;
    }

    .floatingHeader {
        position: fixed;
        top: 0;
        visibility: hidden;
        z-index: 1;
        border: 1px solid #428bca;
        border-radius: 0px;
        -webkit-box-shadow: 0px 5px 10px #888888;
        -moz-box-shadow: 0px 5px 10px #888888;
        box-shadow: 0px 5px 10px #888888;
    }

    .absoluteHeader {
        position: absolute;
        z-index: 1;
        visibility: hidden;
        border: 1px solid #428bca;
        border-bottom: 1px solid transparent;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
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

                            <!-- Title -->
                            <div class="col-md-9 col-sm-8 col-xs-6">
                                <span class="lead">{{ title }}</span>
                            </div>
                            <div class="col-md-3 col-sm-4 col-xs-6">

                                <!-- Button Add Proposal -->
                                <button class="btn btn-success btn-block"
                                        type="button"
                                        :disabled="loadingProcess || isNewProposal"
                                        @click="showNewProposalForm">
                                    <i class="fa fa-plus-square"></i> Добавить
                                </button>

                            </div>
                        </div>
                    </div>

                    <!-- Panel Body -->
                    <div class="panel-body">
                        <div class="btn-group btn-group-justified" role="group" aria-label="Заявки">

                            <!-- Active Proposals Button -->
                            <div class="btn-group" role="group">
                                <button type="button"
                                        :class="classActiveProposals"
                                        :disabled="loadingProcess || isNewProposal"
                                        @click="showActiveProposals">
                                    Активные <span class="badge">{{ activeProposalsCount }}</span>
                                </button>
                            </div>

                            <!-- Finished Proposals Button -->
                            <div class="btn-group" role="group">
                                <button type="button"
                                        :class="classFinishedProposals"
                                        :disabled="loadingProcess || isNewProposal"
                                        @click="showFinishedProposals">
                                    Завершённые <span class="badge">{{ finishedProposalsCount }}</span>
                                </button>
                            </div>

                        </div>
                    </div>
                    <ul class="list-group">

                        <!-- Loading Data -->
                        <li class="list-group-item"
                            v-if="loadingProcess"
                            v-show="!isNewProposal">
                            <div class="text-center">
                                <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                                <span class="sr-only">Loading...</span>
                                <div class="clearfix"></div>
                                Список заявок загружается...
                            </div>
                        </li>

                        <!-- Empty Data -->
                        <li class="list-group-item"
                            v-if="(activeProposalsCount === 0 && !loadingProcess && visibility==='active') || (finishedProposalsCount === 0 && visibility==='finished')"
                            v-show="!isNewProposal">
                            <div class="text-center">
                                <i class="fa fa-warning fa-3x fa-fw"></i>
                                <div class="clearfix"></div>
                                <span class="text-muted"><strong>Нет {{ visibility === 'active' ? 'активных' : 'завершённых' }} заявок</strong></span>
                            </div>
                        </li>

                        <!-- New Proposal -->
                        <li class="list-group-item"
                            v-show="isNewProposal">
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
                                                   :value="newProposal.name"
                                                   @input="editNewProposalName">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!newProposalValidated.name"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="newProposalValidated.name && newProposalEdited.name"></span>
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
                                                   :value="newProposal.phone"
                                                   @input="editNewProposalPhone">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!newProposalValidated.phone"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="newProposalValidated.phone && newProposalEdited.phone"></span>
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
                                                   :value="newProposal.from"
                                                   @input="editNewProposalFrom">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!newProposalValidated.from"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="newProposalValidated.from && newProposalEdited.from"></span>
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
                                                   :value="newProposal.to"
                                                   @input="editNewProposalTo">
                                            <span class="glyphicon glyphicon-remove form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="!newProposalValidated.to"></span>
                                            <span class="glyphicon glyphicon-ok form-control-feedback"
                                                  aria-hidden="true"
                                                  v-show="newProposalValidated.to && newProposalEdited.to"></span>
                                        </div>
                                    </div>

                                    <!-- Count -->
                                    <div class="form-group">
                                        <label for="selCount" class="col-sm-4">Количество пассажиров</label>
                                        <div class="col-sm-8">
                                            <select class="form-control"
                                                    id="selCount"
                                                    :value="newProposal.count"
                                                    @input="editNewProposalCount">
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
                                                           :checked="newProposal.baggage"
                                                           @change="editNewProposalBaggage"> Багаж
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Buttons -->
                                    <div class="form-group">

                                        <!-- Create Proposal -->
                                        <div class="col-sm-offset-2 col-sm-4">
                                            <button type="button"
                                                    class="btn btn-success btn-block"
                                                    :disabled="!isValidNewProposalForm"
                                                    @click="attemptAddProposal">
                                                <i :class="classAddingProposal"></i>&nbsp;Создать заявку
                                            </button>
                                        </div>

                                        <!-- Cancel -->
                                        <div class="col-sm-4">
                                            <button type="button"
                                                    class="btn btn-danger btn-block"
                                                    @click="hideNewProposalForm">
                                                <i class="fa fa-ban fa-fw"></i> Отмена
                                            </button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </li>

                        <!-- Proposals -->
                        <li class="list-group-item"
                            v-for="proposal in filteredProposals"
                            v-show="!isNewProposal">
                            <div class="row">
                                <!-- User Info -->
                                <div class="col-xs-offset-3 col-xs-9">
                                    <h4 class="list-group-item-heading proposal-name">{{ proposal.name }}</h4>
                                    <code>{{ proposal.phone }}</code>
                                </div>
                            </div>
                            <!-- Proposal Info -->
                            <span class="small">{{ proposal.user.name }}: <mark>Заявка №{{ proposal.id }}</mark></span>
                            <!-- Proposal Data -->
                            <div class="row">
                                <div class="col-md-9">
                                    <div class="list-group-item-text">
                                        <!-- From -->
                                        <div class="row">
                                            <div class="col-xs-3 text-right"><strong>Откуда</strong></div>
                                            <div class="col-xs-9">{{ proposal.from }}</div>
                                        </div>
                                        <!-- To -->
                                        <div class="row">
                                            <div class="col-xs-3 text-right"><strong>Куда</strong></div>
                                            <div class="col-xs-9">{{ proposal.to }}</div>
                                        </div>
                                        <!-- Count -->
                                        <div class="row">
                                            <div class="col-sm-3 col-xs-6 text-right"><strong>Пассажиров</strong></div>
                                            <div class="col-sm-9 col-xs-6">{{ proposal.count }}</div>
                                        </div>
                                        <!-- Baggage -->
                                        <div class="row">
                                            <div class="col-sm-3 col-xs-6 text-right"><strong>Багаж</strong></div>
                                            <div class="col-sm-9 col-xs-6">
                                                {{ proposal.baggage ? 'Имеется' : 'Отсутствует' }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 text-right">
                                    <h5 class="danger-text"
                                        v-show="proposal.deleting">Удаление
                                        <i class="fa fa-refresh fa-spin fa-fw"></i>
                                    </h5>
                                    <h5 class="success-text"
                                        v-show="proposal.finishing">Завершение
                                        <i class="fa fa-refresh fa-spin fa-fw"></i>
                                    </h5>

                                    <!-- Button Finish Proposal -->
                                    <button class="btn btn-primary"
                                            type="button"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Выполнено"
                                            v-show="visibility==='active'"
                                            :disabled="proposal.finishing || proposal.deleting"
                                            @click="finishProposal(proposal)">
                                        <i class="fa fa-check-square-o fa-fw"></i>
                                    </button>
                                    <!-- Button Delete Proposal -->
                                    <button class="btn btn-danger"
                                            type="button"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Удалить"
                                            :disabled="proposal.finishing || proposal.deleting"
                                            @click="deleteProposal(proposal)">
                                        <i class="fa fa-trash fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- Panel Footer -->
                    <div class="panel-footer">
                        <div v-show="visibility==='active'">Активных заявок <span class="badge">{{ activeProposalsCount }}</span>
                        </div>
                        <div v-show="visibility==='finished'">Завершённых заявок <span class="badge">{{ finishedProposalsCount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import jquery from 'jquery'
    window.$ = window.jQuery = jquery;

    import {mapGetters, mapActions} from 'vuex'

    const filters = {
        active: proposals => proposals.filter(proposal => !proposal.finished),
        finished: proposals => proposals.filter(proposal => proposal.finished)
    }

    export default {
        data(){
            return {
                visibility: 'active',
                filters: filters
            }
        },
        computed: {
            ...mapGetters([
                'proposals',
                'error',
                'isNewProposal',
                'loadingProcess',
                'addingProcess',
                'newProposal',
                'newProposalEdited',
                'newProposalValidated'
            ]),

            // отфильтрованные заявки
            filteredProposals() {
                return filters[this.visibility](this.proposals)
            },

            // Заголовок
            title() {
                return this.isNewProposal ? 'Новая заявка' : this.subtitle
            },
            subtitle() {
                return this.visibility === 'active' ? 'Активные заявки' : 'Завершённые заявки'
            },

            // количество активных заявок
            activeProposalsCount() {
                return filters['active'](this.proposals).length
            },

            // количество завершенных заявок
            finishedProposalsCount() {
                return filters['finished'](this.proposals).length
            },

            // классы добавления заявки
            classAddingProposal() {
                return {
                    'fa fa-plus-square fa-fw': !this.addingProcess,
                    'fa fa-refresh fa-spin fa-fw': this.addingProcess
                }
            },

            // классы Кнопка Активные заявки
            classActiveProposals() {
                return {
                    btn: true,
                    'active btn-success': this.visibility === 'active',
                    'btn-default': this.visibility !== 'active'
                }
            },
            // классы Кнопка Завершенные заявки
            classFinishedProposals(){
                return {
                    btn: true,
                    'active btn-primary': this.visibility === 'finished',
                    'btn-default': this.visibilty !== 'finished'
                }
            },

            // классы полей ввода Новой заявки
            classHasErrorInputName(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.newProposalValidated.name,
                    'has-success has-feedback': this.newProposalValidated.name && this.newProposalEdited.name
                }
            },
            classHasErrorInputPhone(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.newProposalValidated.phone,
                    'has-success has-feedback': this.newProposalValidated.phone && this.newProposalEdited.phone
                }
            },
            classHasErrorInputFrom(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.newProposalValidated.from,
                    'has-success has-feedback': this.newProposalValidated.from && this.newProposalEdited.from
                }
            },
            classHasErrorInputTo(){
                return {
                    'form-group': true,
                    'has-error has-feedback': !this.newProposalValidated.to,
                    'has-success has-feedback': this.newProposalValidated.to && this.newProposalEdited.to
                }
            },

            // проверка валидности формы
            isValidNewProposalForm() {
                return this.newProposalValidated.name
                        && this.newProposalValidated.phone
                        && this.newProposalValidated.from
                        && this.newProposalValidated.to
                        && this.newProposalEdited.name
                        && this.newProposalEdited.phone
                        && this.newProposalEdited.from
                        && this.newProposalEdited.to
            },
        },
        methods: {
            ...mapActions([
                'loadProposals',
                'addProposal',
                'finishProposal',
                'deleteProposal',
                'editNewProposalName',
                'editNewProposalPhone',
                'editNewProposalFrom',
                'editNewProposalTo',
                'editNewProposalCount',
                'editNewProposalBaggage'
            ]),

            // фильтр заявок - Активные/Завершенные
            showActiveProposals() {
                this.visibility = 'active'
                console.info('Show Active Proposals.')
            },
            showFinishedProposals() {
                this.visibility = 'finished'
                console.info('Show Finished Proposals.')
            },

            // отображение формы Новая заявка
            showNewProposalForm() {
                this.$store.dispatch('addProposal').then(() => {
                    document.querySelector('#inputName').focus()
                })
            },
            hideNewProposalForm() {
                this.$store.dispatch('addProposal')
            },

            // выполнить запрос на добавление заявки
            attemptAddProposal() {
                if (this.isValidNewProposalForm) this.$store.dispatch('postProposal', this.newProposal)
            }
        },
        created(){
            this.$store.dispatch('loadProposals')
        }
    }
</script>
