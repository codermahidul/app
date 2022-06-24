export default function ShowModal(events, fun = [], param = [], ids = []) {

    fun.forEach((value,key) => {
        if (param.length > 0 && ids.length > 0) {
            value(param[key], ids[key]);
        }

        if (param.length > 0 && ids.length <= 0) {
            value(param[key]);
        }
        if (param.length <= 0 && ids.length <= 0) {
            value();
        }
    });

    let id = events.currentTarget.dataset.id;
    $("#" + id).modal("show");


}