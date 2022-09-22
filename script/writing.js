import '../style/writing.css'

import { Timer } from '../script/timer'

window.writeTimer = new Timer();
$(document).ready(function () {
    writeTimer.start();
})

$(window).unload(function () {
    writeTimer.end();
});


//https://codepen.io/soulrider911/pen/DdeGao
$(function () {
    var email = $("#email");
    var name = $("#name");

    function validate(field) {
        if (field.val().length === 0) {
            field.removeClass().addClass("error");
            field.next().removeClass().addClass("fa fa-times");
        } else {
            field.removeClass().addClass("success");
            field.next().removeClass().addClass("fa fa-check");
        }
        return field;
    }

    $('input').blur(function () {
        validate($(this));
    });

    $("#submitBtn").on("click", function () {
        validate(email);
        validate(name);
        if ($(email).val().length === 0 || $(name).val().length === 0)
            $(this).removeClass().addClass("submit-error");
        else {
            $(this).removeClass().addClass("submit-success");
        }
        window.setTimeout(function () {
            console.log("done");
            $("#submitBtn").removeClass();
        }, 3000)
        return false;
    });

});

