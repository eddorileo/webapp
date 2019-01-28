function initPage(){
    $("#page_container").html(forgotPassTemplate())
    click("#resetPasswordButton",function(event){
        apiCall({
            loadingFeedback: true,
            method:'PATCH',
            endpoint:'/register',
            body: {
                email: $("input[name='email']").val()
            },
            postAction: {action: "nothing"},
            callback: function() {
                $("#messagebar").addClass("alert")
                $("#messagebar").addClass("alert-success")
                $("#messagebar").html("<p>Please check your email to continue</p>")
                $("#page_container").html(forgotPassTemplate())
            }
        })
    })
}