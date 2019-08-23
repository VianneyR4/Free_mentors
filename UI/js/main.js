'use strict'
window.onload = function() {
    let showEvent = document.getElementById('show_menu'),
        hideEvent = document.getElementById('hide_menu'),
        menu = document.getElementById('menu_to_show');

    showEvent.addEventListener("click", function() {
        menu.style = "bottom: 0%";
    });
    hideEvent.addEventListener("click", function() {
        menu.style = "bottom: 100%";
    });
}