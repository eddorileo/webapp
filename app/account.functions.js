var stateLoadingHTML = "<center><img src=\"/images/loading.gif\"></center>"

function loggedIn(){
    var ret = {
        status: (localStorage.getItem("apikey")) ? true : false
    }
    var urlParams = new URLSearchParams(window.location.search);
    if(window.infringementreport_custom_apikey){
        ret.apikey = window.infringementreport_custom_apikey
    }else if(urlParams.has('share')){
        ret.status = true
        ret.apikey = "share:"+urlParams.get('share')
    }else if(ret.status === true){
        ret.apikey = localStorage.getItem("apikey")
    }else{
        if(typeof apikey !== 'undefined'){
            ret = {
                status: true,
                apikey: apikey
            }
        }
    }
    return ret
}
function setLogin(user){
    Object.keys(user).forEach(function(key){
        var val = (typeof user[key] === "object") ? JSON.stringify(user[key]) : user[key]
        localStorage.setItem(key,val)
    })
}
function click(selector,callback){
    $(selector).unbind("click")
    $(selector).click( function(event){
        event.preventDefault()
        callback(event)
    })
}

$( document ).ready(function(){
    var logged = loggedIn().status
    if(logged === true){
        $("#topRightLink").html(
            `<li><a href="/logout">Desconectar</a></li>`
        )
        if(localStorage.is_partner == "true" || localStorage.partner_initial_apikey){
            $("#topRightLink").append(
                `<a href="/partner?active=activeUsers" class="link">Parceiros</a>`
            )
        }
        $("#top_naviation").prepend(
            `<center><p class="subhead sm" style="text-align:center!important">
                <a href="/list" class="link">Listas de Imagens</a> | 
                <a href="/manage/account" class="link">Gerenciar Conta</a><BR><BR>
            </p></center>`
        )
        if(localStorage.credits){
            var credits = JSON.parse(localStorage.getItem("credits"))
            if(Object.keys(credits).length > 0){
                if(credits.active && credits.active.length > 0 && credits.active[0].package_id == 1){
                    $("#top_naviation").prepend(
                        '<div id="loginmessage" class="alert alert-success" role="alert"><center><p style="margin-bottom:0px">Seu período de testes expira em '+Math.round((credits.active[0].expiry_time-Math.round(new Date().getTime() / 1000))/60/60/24,0)+' dias - <a href="/manage/subscription"><u>atualize sua assinatura</u></a>.<br>O que faria BuscaLogo melhor? Fale conosco em <a href="mailto:dorileo@gmail.com">dorileo@gmail.com</a></p></center></div>'
                    )
                }
                if( !credits.active || credits.active.length == 0){
                    $("#top_naviation").prepend(
                        '<div id="loginmessage" class="alert alert-danger" role="alert"><center><p style="margin-bottom:0px">Vocë n&aacute;o tem assinatura ativa. Todas as suas listas e dados ser&atilde;o apagados em 07 dias. <a href="/manage/subscription"><u>Adicionar novo pacote para sua conta</u></a></p></center></div>'
                    )
                }
            }
        }

    }else{
        $("#topRightLink").html(
            `<a href="/login">Logar / Registrar</a>`
        )
    }

})