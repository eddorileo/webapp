function initPage(){
    $("#page_container").html(passwordResetTemplate())
    click("#passwordResetButton",function(event){
        var urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has("password_reset_hash")){
            var password_reset_hash = urlParams.get("password_reset_hash")
            if($("input[name='password']").val() != $("input[name='confirmpassword']").val() ){
                handleAPIError({error: "The passwords do not match. Please try again"},{})
            }else{
                apiCall({
                    loadingFeedback: true,
                    method:'PATCH',
                    endpoint:'/register',
                    body: {
                        password_reset_hash,
                        password: $("input[name='password']").val()
                    },
                    postAction: {action: "nothing"},
                    callback: function(result) {
                        setLogin(result.user)
                        window.location = "/list"
                    }
                })
            }
        }
    })
}
