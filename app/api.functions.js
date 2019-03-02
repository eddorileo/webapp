function apiCall(obj){
    if(obj.precheck){
        var r = confirm(obj.precheck);
    }else{
        var r = true
    }

    if (r == true) {
        var x_api_key = ""
        var logged_in = loggedIn()
        if(obj.apikey && obj.apikey.length > 0){
            x_api_key = obj.apikey
        }else if (logged_in.status === true){
            x_api_key = logged_in.apikey
        }else{
            x_api_key = "noapikey"
        }
        var args = {
                type: obj.method,
                url: 'https://api2.infringement.report/3.0'+obj.endpoint,
                headers: {
                    'x-api-key': x_api_key
                }
            }
        if(Rollbar){
            Rollbar.configure({
                payload: {
                    person: {
                        id: x_api_key
                    }
                }
            });
        }
        if(obj.body){
            args.contentType = 'application/json'
            args.dataType = "json"
            args.data = JSON.stringify(obj.body)
            
        }
        if(obj.raw){
            args.processData = false
            args.contentType = 'application/octet-stream'
            args.headers["X-Mime-Type"] = obj.filetype
            args.data = obj.raw
        }
        if(obj.loadingFeedback){
            $("#page_container").html(stateLoadingHTML)
        }
        jQuery.ajax(args)
        .done(function( data, textStatus, xhr) {
            switch(xhr.status){
                case 200:
                case 403:
                default:
                    if(data.status == true){
                        if(obj.postAction){
                            switch(obj.postAction.action) {
                                case "hide":
                                    console.log("Trying to hide",obj.postAction.e)
                                    obj.postAction.e.style.display="none"
                                    break;
                                case "refresh":
                                    location.reload()
                                break;
                                case "setHTML":
                                    obj.postAction.e.innerHTML="searching..."
                                    break;
                                case "setListid":
                                    list_id = data.result.list_id
                                    break;
                                default:
                                    //console.log("Unknown post action")
                            }
                        }
            
                        if(obj.callback){
                        
                            obj.callback(data.result)
                        }
                    }else{
                        handleAPIError(data,obj)
                    }

            }
            

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            switch(jqXHR.status){
                case 401:
                    window.location = "/login?r=" + encodeURI(window.location)
                break;
                case 403:
                    handleAPIError(jqXHR.responseJSON,obj)
                break; 
                case 423:
                    handleAPIError({error: "Sua conta não está habilitada e requer verificação adicional. Favor contactar suporte para obter assistência."},{apikey: x_api_key})
                break;
                default:
                    handleAPIError({error: "Esta operação não pode ser completada porque o servidor estava indisponível."},{apikey: x_api_key})
            }
           
        });
    }
}

function handleAPIError(data,obj){
    document.getElementById("messagebar").className = "alert alert-danger"
    if(!data.error){
        data.error = "Esta operação não pode ser completada por que aconteceu um erro desconhecido."
    }
    $("#messagebar").html("<p>"+data.error+"</p>")
    if(Rollbar){


        Rollbar.critical("handleAPIError Report: "+data.error)
    }
   
    if(obj && obj.postAction){
        if(obj.postAction.action == "errorHandle"){
            obj.postAction.e.checked = false
        }
    }

}
