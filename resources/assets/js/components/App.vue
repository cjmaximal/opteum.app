<template>
    <div id="app">
        <div class="container">
            <div class="row">
                <proposals-list></proposals-list>
            </div>
        </div>
    </div>
</template>
<script>
    import ProposalsList from './ProposalsList.vue'
    export default{
        components: {
            ProposalsList
        }
    }
</script>
