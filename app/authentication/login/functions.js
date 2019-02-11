function initPage(){
    var searchParams = new URLSearchParams(window.location.search)
    if(searchParams.has('r')){
        var redirect = decodeURIComponent(searchParams.get('r'))
    }
    if(loggedIn().status === true){
        window.location = (redirect) ? redirect : "/list"
    }
    $("#page_container").html(
        loginPageTemplate()
    )
    $("#loginButton").click(function(event){
        event.preventDefault()
        var loginParams = { 
            email: $("#email").val(),
            password: $("#password").val(),
            redirect
        }
        
        login(loginParams)
    })
}

function login(params){

    apiCall({
        loadingFeedback: true,
        method:'POST',
        endpoint:'/login',
        body: {
            email: params.email,
            password: params.password
        },
        postAction: {action: "nothing"},
        callback: function(result) {
            setLogin(result.user)
            if(!params.redirect){
                params.redirect = "/list"
            }
            window.location = params.redirect
        }
    })
}
