
export const block = () => {

    let spiner = '<div class="spinner-grow text-primary" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-secondary" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-success" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-danger" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-warning" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-info" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-light" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    spiner += '<div class="spinner-grow text-dark" role="status">';
    spiner += '<span class="sr-only">Loading...</span>';
    spiner += '</div>';
    $.blockUI({
        message: spiner,
        css: { backgroundColor: 'none', border: "none" },
        overlayCSS: { backgroundColor: '#444446' },
       // theme: true,
        baseZ: 20000000
    });
}
export const unblock = () => {
    $.unblockUI();
}


