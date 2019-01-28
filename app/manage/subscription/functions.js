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
            apiCall({
                method:'GET',
                endpoint:'/packages',
                postAction: {action: "nothing"},
                callback: function(packages) {


        
                    $("#page_container").html(
                        manageSubscriptionPageTemplate({user_info,packages})
                        
                    )
                    clickEvents()
                    $("#subscriptionForm").submit(function(event){
                        event.preventDefault()
                        var actionParams = {
                            package_id: $('#package-select').val(),
                            form_action: $(event.target).attr("data-form_action")
                        } 
                        switch(actionParams.form_action){
                            case "newCustomer":
                                var newCustomerHandler = StripeCheckout.configure({
                                    key: 'pk_live_rmgbV0oSouMXwtnBGudHs2qM',
                                    email: user_info.email,
                                    locale: 'auto',
                                    token: function(token) {
                                        actionParams.stripeEmail = token.email
                                        actionParams.stripeToken = token.id
                                        newCustomer(actionParams)
                                    }
                                });

                                newCustomerHandler.open({
                                    name: "Infringement.Report",
                                    description: "Start your subscription",
                                    label: "Start Subscription"

                                });
                        
                            
                            break;
                            case "newSubscription":
                                newSubscription(actionParams)
                            break;
                            case "updateSubscription":
                                updateSubscription(actionParams)
                            break;
                        }

                    })
                    var addCardHandler = StripeCheckout.configure({
                        key: 'pk_live_rmgbV0oSouMXwtnBGudHs2qM',
                        email: user_info.email,
                        locale: 'auto',
                        token: function(token) {
                                newCard({stripeToken: token.id})
                            }
                    });
                    click("#addCardButton",function(event){
                        addCardHandler.open({
                            name: "Infringement.Report",
                            description: "Add New Card",
                            label: "Add Card"
                        });
                
                    })
                    if(user_info.credits.subscription.is_subscription_customer){
                        // get cards
                        apiCall({
                                method:'GET',
                                endpoint:'/user/card',
                                postAction: {action: "nothing"},
                                callback: function(result) {
                                    result.forEach((card)=>{
                                        
                                        var cardHTML = "<li><strong>"+card.brand+"</strong> - ***"+card.last4+" exp. "+card.exp_month+"/"+card.exp_year+" - ";
                                        if(card.stripe_card_id == user_info.credits.subscription.default_card){
                                            cardHTML += "<strong>default</strong>"
                                        }else{
                                            cardHTML += "<a href=\"#\" data-stripe_card_id=\""+card.stripe_card_id+"\" class='link makeCardPrimary'>make default</a> | <a href=\"#\" data-stripe_card_id=\""+card.stripe_card_id+"\" class='link deleteCard'>delete</a>"
                                        
                                        }
                                        cardHTML += "</li>"
                                        $("#cardList").append(cardHTML)
                                        
                                        clickEvents()
                                    })
                                }
                            })
                        // get invoices
                        apiCall({
                                method:'GET',
                                endpoint:'/user/billing/invoices',
                                postAction: {action: "nothing"},
                                callback: function(result) {
                                    result.forEach((invoice)=>{
                                        var HTML = "<li><a href=\""+invoice.url+"\" class=\"link\" target=\"_blank\"><strong>"+invoice.id+"</strong> - "+invoice.date+",  \$"+invoice.amount+"</a> | "
                                        if(invoice.paid == true){
                                            HTML += "<span style=\"color:green\">Paid</span>"
                                        }else{
                                            HTML += "<span style=\"color:orange\">Unpaid</span>"
                                        }
                                        HTML += "</li>"
                                        $("#invoiceList").append(HTML)
                                        clickEvents()
                                    })
                                }
                            })
                        if(user_info.credits.subscription.is_metered_billing == true){
                            apiCall({
                                method:'GET',
                                endpoint:'/user/billing/metered_balance',
                                postAction: {action: "nothing"},
                                callback: function(result) {
                                    $("#metered_billing_balance").text("$"+result.balance)
                                }
                            })
                        }
                        
                    }
                }

            })
        }
    })
}

function newCustomer(params){
    apiCall({
        method:'POST',
        endpoint:'/user/subscription',
        body: {
            new_customer: {
                email: params.stripeEmail,
                source: params.stripeToken,
            },
            package_id: params.package_id
        },
        postAction: {action: "nothing"},
        callback: function(result) {
            initPage()
        }
    })
}
function newSubscription(params){
 
    apiCall({
        method:'POST',
        endpoint:'/user/subscription',
        body: {
            package_id: params.package_id
        },
        postAction: {action: "nothing"},
        callback: function(result) {
            initPage()
        }
    })
}
function updateSubscription(params){
    apiCall({
        method:'PATCH',
        endpoint:'/user/subscription',
        body: {
            package_id: params.package_id
        },
        postAction: {action: "nothing"},
        callback: function(result) {
            initPage()
        }
    })
}

function cancelSubscription(){
    apiCall({
        method:'DELETE',
        endpoint:'/user/subscription',
        precheck:'Cancelling your subscription will keep your current allocation until the end of your billing period, and it will not renew.\n\nAre you sure you want to do this?',
        postAction: {action: "nothing"},
        callback: function(result) {
           initPage()
        }
    })
}

function newCard(params){

    apiCall({
        method:'POST',
        endpoint:'/user/card',
        body: {
            stripe_card_token: params.stripeToken
        },
        postAction: {action: "nothing"},
        callback: function(result) {
           initPage()
        }
    })
}

function deleteCard(params){
    apiCall({
        method:'DELETE',
        endpoint:'/user/card/'+params.stripe_card_id,
        postAction: {action: "nothing"},
        callback: function(result) {
           initPage()
        }
    })
}
function makePrimary(params){
    apiCall({
        method:'PATCH',
        endpoint:'/user/card/'+params.stripe_card_id,
        postAction: {action: "nothing"},
        callback: function(result) {
           initPage()
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

function clickEvents(){
    $('.stripe-button-el').hide()

    
    
    click("#cancelSubscription",function(event){
        cancelSubscription()
    })
    click(".makeCardPrimary",function(event){
        var stripe_card_id = $(event.target).attr("data-stripe_card_id")
        makePrimary({stripe_card_id})
    })
    click(".deleteCard",function(event){
        var stripe_card_id = $(event.target).attr("data-stripe_card_id")
        deleteCard({stripe_card_id})
    })

}