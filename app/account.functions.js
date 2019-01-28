var stateLoadingHTML = "<center><img src=\"/images/loading.gif\"></center>"

function loggedIn(){
    var ret = {
        status: (localStorage.getItem("apikey")) ? true : false
    }
    var urlParams = new URLSearchParams(window.location.search);
    if(window.infringementreport_custom_apikey){
        ret.apikey = window.infringementreport_custom_apikey
    }else if(urlParams.has('share')){
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
            `<li><a href="/logout">Log out</a></li>`
        )
        $("#top_naviation").prepend(
            `<center><p class="subhead sm" style="text-align:center!important">
                <a href="/list" class="link">Image Lists</a> | 
                <a href="/manage/account" class="link">Manage Account</a><BR><BR>
            </p></center>`
        )
        if(localStorage.credits){
            var credits = JSON.parse(localStorage.getItem("credits"))
            if(Object.keys(credits).length > 0){
                if(credits.active[0].package_id == 1){
                    $("#top_naviation").prepend(
                        '<div id="loginmessage" class="alert alert-success" role="alert"><center><p style="margin-bottom:0px">Your Infringement.Report trial expires in '+Math.round((credits.active[0].expiry_time-Math.round(new Date().getTime() / 1000))/60/60/24,0)+' days - <a href="/manage/subscription"><u>manage your subscription</u></a>.<br>What would make Infringement.Report better? Let us know at <a href="mailto:hello@infringement.report">hello@infringement.report</a></p></center></div>'
                    )
                }
                if( !credits.active || credits.active.length == 0){
                    $("#top_naviation").prepend(
                        '<div id="loginmessage" class="alert alert-danger" role="alert"><center><p style="margin-bottom:0px">You have no active subscription. All of your lists and data will be deleted within seven days. <a href="/manage/subscription"><u>Add a new package to your account</u></a></p></center></div>'
                    )
                }
            }
        }

    }else{
        $("#topRightLink").html(
            `<a href="/login">Login / register</a>`
        )
    }

})