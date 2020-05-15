window.onload = function (e) {
    $(function(){   
        var nav = $('.header');   
        $(window).scroll(function () { 
            if ($(this).scrollTop() > 0) { 
                nav.addClass("fixed");
                $('body').css('padding-top', 150);
            } else { 
                nav.removeClass("fixed"); 
                $('body').css('padding-top', 0);
            } 
        });  
    });
}

function mascaratel(telefone) {
    if (telefone.value.length == 0)
        telefone.value = '(' + telefone.value;
    if (telefone.value.length == 3)
        telefone.value = telefone.value + ') ';
    if (telefone.value.length == 9)
        telefone.value = telefone.value + '-';
}

function mascaracel(celular) {
    if (celular.value.length == 0)
        celular.value = '(' + celular.value;
    if (celular.value.length == 3)
        celular.value = celular.value + ') ';
    if (celular.value.length == 10)
        celular.value = celular.value + '-';
}