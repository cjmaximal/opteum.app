<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <tasks-list></tasks-list>
            </div>
        </div>
    </div>
</template>
<script>
    import TasksList from './TasksList.vue'
    export default{
        components: {
            TasksList
        }
    }
</script>
