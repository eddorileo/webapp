
function initPage(){
    apiCall({
        loadingFeedback: true,
        method:'GET',
        endpoint:'/packages',
        postAction: {action: "nothing"},
        callback: function(packages) {
            $("#page_container").html(
                registerPartnerTemplate({packages})
            )
            
            click("#registerButton",function(event){
                if(localStorage.partner){
                    var partner = JSON.parse(localStorage.partner)
                }else{
                    alert ("An error occured when attempting to retrieve your unique registration key")
                }
                apiCall({
                    loadingFeedback: true,
                    method:'POST',
                    endpoint:'/register',
                    body: {
                        register_token: partner.register_token,
                        email: $("input[name='email']").val(),
                        termsagreed: true,
                        "marketing-optin": false,
                        initial_package_id: $("#package_id").val(),
                        inital_package_length: $("#inital_package_length").val()

                    },
                    postAction: {action: "nothing"},
                    callback: function(result) {
                        alert("User created. They will recieve an email with login details.")
                        initPage()
                    }
                })
            })
        }
    })
}
