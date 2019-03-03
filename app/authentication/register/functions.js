function initPage(){
    $("#page_container").html(
        registerStage1Template()
    )

    click("#registerButton",function(event){
        if(checkTerms()){
            apiCall({
                loadingFeedback: true,
                method:'POST',
                endpoint:'/register',
                body: {
                    register_token: window.infringementreport.register_token,
                    email: $("input[name='email']").val(),
                    termsagreed:$('input[name="termsagreed"]').prop("checked"),
                    "marketing-optin": $('input[name="marketing-optin"]').prop("checked")
                },
                postAction: {action: "nothing"},
                callback: function(result) {
                    var apikey = result.apikey
                    $("#page_container").html(
                        registerStage2Template()
                    )
                    click("#registerStage2Link, #registerStage2Submit", function(event){
                        $("#page_container").html(
                            registerStage3Template()
                        )
                        click("#resetPasswordButton",function(event){
                            window.location = "/password-reset?password_reset_hash="+$("input[name='verifyCode']").val().trim()
                        })
                    })
                    $('#fine-uploader-gallery').fineUploader({

                        template: 'qq-template-gallery',
                        request: {
                            endpoint: 'https://api.infringement.report/3.0/list/0/trial_file/[filename]',
                            paramsInBody: false,
                            forceMultipart: false,
                            method: "PUT",
                            filenameParam: "filename",
                            customHeaders: {"x-api-key": apikey}
                        },
                        thumbnails: {
                            placeholders: {
                                waitingPath: '/images/fineuploader-waiting-generic.png',
                                notAvailablePath: '/images/fineuploader-not_available-generic.png'
                            }
                        },
                        validation: {
                            allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'webp']
                        },
                        callbacks: {
                            onError: function(id, name, errorReason, xhrOrXdr) {
                                handleAPIError({error: errorReason})
                            }
                        }
                    });
                }
            })
        }
    })
}
function checkTerms(){

    if(!$('#termsagreed').is(':checked')){
        alert('Voc&ecirc; precisa concordar com os termos do servi&ccedil antes de registrar.')
        return false;
    }
    return true;
}
