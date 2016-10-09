export default {
    createTooltips(){
        // Tooltips
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
    },

    hideTooltip(){
        $(function () {
            $('body [data-toggle="tooltip"]').tooltip('hide')
        });
    }
}