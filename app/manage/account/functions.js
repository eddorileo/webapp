function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/user',
        postAction: {action: "nothing"},
        callback: function(user_info) {
            ["name","line1","line2","city","postcode","country","vatnumber"].forEach(function(key){
                if(!user_info.address.hasOwnProperty(key)){
                    user_info.address[key] = ""
                }
            })
            $.getJSON( "/app/manage/account/countries.json", function( countries ) {
                $("#page_container").html(
                    manageAccountPageTemplate({user_info,countries})
                    
                )
                clickEvents()
            })
        }
    })
}

function resetAPI(){
    apiCall({
        method:'DELETE',
        endpoint:'/user',
        postAction: {action: "nothing"},
        callback: function(result) {

           alert("API Key has been reset. You must now log in again.")
           window.location = "/logout"
        }
    })
}


function changePassword(params){
    if(params.new_password == params.confirm_password){
        apiCall({
            method:'PATCH',
            endpoint:'/user/password',
            body: {
                password: params.password,
                new_password: params.new_password
            },
            postAction: {action: "nothing"},
            callback: function(result) {
    
               alert("The password has been changed. You must now log in again.")
               window.location = "/logout"
            }
        })
    }else{
        alert("The new password and confirmed new passwords do not match")
    }
}

function changeAddress(address){
    $("#changeAddressConfirm").show()
    $("#changeAddressConfirm").css('color', 'orange');
    $("#changeAddressConfirm").text("Saving...")
    apiCall({
        method:'PATCH',
        endpoint:'/user/address',
        body: {
            address
        },
        postAction: {action: "nothing"},
        callback: function(result) {
           initPage()

           $("#changeAddressConfirm").css('color', 'green');
           $("#changeAddressConfirm").text("Saved")
           $( "#changeAddressConfirm" ).fadeOut( "slow");
        }
    })
}
function clickEvents(){

    click("#resetAPI",function(event){
        resetAPI()
    })

    click("#changePassword",function(event){
        var password = $("input[name='password']").val(),
        new_password = $("input[name='new_password']").val(),
        confirm_password = $("input[name='confirm_password']").val()
        changePassword({password, new_password, confirm_password})
    })

    click("#saveAddress", function(event){
        
        var address = {
            name: $("input[name='address[name]']").val(),
            line1: $("input[name='address[line1]']").val(),
            line2: $("input[name='address[line2]']").val(),
            city: $("input[name='address[city]']").val(),
            country: $("select[name='address[country]']").val(),
            postcode: $("input[name='address[postcode]']").val(),
            vatnumber: $("input[name='address[vatnumber]']").val()
        }
        console.log("address",address)
        changeAddress(address)
    })
}