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

//-----------------------------------------------------------------------------------
//mascara para CELULAR e TELEFONE
//
//

function mascaraDeTelefone(telefone) {
    const textoAtual = telefone.value;
    const isCelular = textoAtual.length === 11;
    let textoAjustado;

    if (textoAtual != '') {
        if (isCelular) {
            const parte1 = textoAtual.slice(0, 2);
            const parte2 = textoAtual.slice(2, 7);
            const parte3 = textoAtual.slice(7, 11);
            textoAjustado = `(${parte1}) ${parte2}-${parte3}`
        } else {
            const parte1 = textoAtual.slice(0, 2);
            const parte2 = textoAtual.slice(2, 6);
            const parte3 = textoAtual.slice(6, 10);
            textoAjustado = `(${parte1}) ${parte2}-${parte3}`
        }


        telefone.value = textoAjustado;
    } else {
        telefone.value = ''
    }
}

//-----------------------------------------------------------------------------------
//removendo caracteres especiais ao digitar, recebendo apenas números
//
//

function tiraHP(telefone) {
    const textoAtual = telefone.value;
    const textoAjustado = textoAtual.replace(/[^\d]+/g, '');

    telefone.value = textoAjustado;
}


//-----------------------------------------------------------------------------------
//
//
//
function formatar(mascara, documento){   
    var i = documento.value.length;
    var saida = mascara.substring(0,1);
    var texto = mascara.substring(i);
    if (texto.substring(0,1) != saida){documento.value += texto.substring(0,1);}
  }