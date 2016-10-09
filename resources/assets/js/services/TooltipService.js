export default {
    createTooltips(){
        // Tooltips
        $(function () {
            $('[data-toggle="tooltip"]:not(:disabled)').tooltip()
        });
    },

    hideTooltip(){
        $(function () {
            $('body [data-toggle="tooltip"]').tooltip('hide')
        });
    }
}