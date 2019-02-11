
function initPage(){
    if(localStorage.partner_initial_apikey){
        var apikey = localStorage.partner_initial_apikey
    }else{
        var apikey = loggedIn().apikey
    }
    var urlParams = new URLSearchParams(window.location.search);

    apiCall({
        apikey,
        method:'GET',
        endpoint:(urlParams.has('active')) ? "/partner/"+urlParams.get('active') : "/partner/activeUsers",
        postAction: {action: "nothing"},
        callback: function(result) {
            $("#page_container").html(partnerListPageTemplate(result))
            click(".takeAccount",function(event){
                var new_api_key = $(event.target).attr("data-apikey")
                takeAccount(new_api_key)
            })
            $(".user_enabled").change(
                function(event)  {
                   
                    var enabled = $(event.target).prop('checked')
                    var user_id = $(event.target).attr('data-user_id')
                    apiCall({
                        method:'PATCH',
                        endpoint:'/partner',
                        body: { user_id, enabled },
                        postAction: {action: "nothing"},
                        callback: function(result) {
                            
                        }
                    })
                }
            )
        }
    })
}

function takeAccount(apikey){

    if(!localStorage.partner_initial_apikey){
        //remember my original apikey
        localStorage.partner_initial_apikey = localStorage.apikey
    }
    apiCall({
        loadingFeedback: true,
        apikey,
        method:'GET',
        endpoint:'/user',
        postAction: {action: "nothing"},
        callback: function(result) {
            setLogin(result)
            window.location = "/list"
        }
    })
}
