"use strict";
(function () {
    document.addEventListener("DOMContentLoaded", function () {

        function randomString() {
            var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
            var string = "";

            for (var i = 0; i < 10; i++) {
                string += chars[Math.floor(Math.random() * chars.length)];
            }
            return string;
        }















    })
})();