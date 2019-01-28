function manageSubscriptionPageTemplate(params){
	console.log("managesub",params)
    var page = `
    <h1 class="headline base-sm-small-buffer">Billing</h1>
		<div id="messagebar" role="alert"></div>

        <span class="account-info">
            <div class="row">
			
                <div class="col-md-6">

					<h2>Your subscription</h2>
					<p >
					<Strong>${(params.user_info.credits.total.package_labels) ? params.user_info.credits.total.package_labels : "No active subscription" }</strong><br>
                    <strong>${params.user_info.credits.total.credits.toLocaleString()}</strong> one-off searches/mo (<i>${params.user_info.credits.total.remaining.toLocaleString()} remaining</i>)<br>
                    <strong>${params.user_info.credits.total.monitor.toLocaleString()}</strong> monitored images (<i>${params.user_info.credits.total["remaining-monitor"].toLocaleString()} remaining</i>)<br>					
					${(params.user_info.credits.subscription.has_active_subscription !== null) ? ((params.user_info.credits.subscription.has_active_subscription === true) ? "<a href=\"#\" class=\"link\" id=\"cancelSubscription\">Cancel subscription</a></p>" : "No active subscription") : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_manage-paylist" class="link">Cancel subscription</a></p>'}
					</p >
                    <h2>Modify subscription</h2>

                    <fieldset class="base-lg-small-buffer">
                        <legend class="normal">Your business tax residency</legend><p>`
                        switch (params.user_info.vat_status){
								case 0:
									page += "You have indicated that your business is located outside of the EU, and so you will not be charged VAT on your subscription. You must correct your address if you are located within the EU.";
								break;
								case 1:
									page += "You are based within the UK and will be charged 20% VAT";
								break;
								case 2:
									page += "You are within the EU and have provided a VAT number. VAT for your subscription will be zero-rated.";
								break; 
								case 3:
									page += "You have not provided a valid address, so will be charged 20% UK VAT";
								break;
								case 4:
									page += "You are within the EU, but have not provided a VAT number. We must collect 20% VAT on your subscription.";
								break;
							}
						 
						 page += ` <a href="/manage/account" class="link">Update your business address</a></p>
                    </fieldset>

                    <fieldset>
                        <legend class="normal">Choose a monthly package</legend>

                        <div class="plan-details">
						<select class="form-control" style="width:100%" id="package-select">
                            ${ Object.keys(params.packages).map(function(i){
								var package = params.packages[i]
		
								return `<option ${(params.user_info.credits.package_id === package.package_id) ? "selected" : ""} value="${package.package_id}" data-package-id="${package.package_id}" data-package-label="${package.package_label}" data-price="${package.price}" data-credits="${package.searches}" data-monitor="${package.monitor}">
                                        $${package.price} - ${package.package_label} - ${package.monitor.toLocaleString()} monitored images & ${package.searches.toLocaleString()} searches</option>`
                              
                            }).join('')}
					    </select></br></br>
                        </div> <!-- END PLAN DETAILS -->`

					
						if(params.user_info.credits.subscription.is_subscription_customer == true){
							//existing customer
							if(params.user_info.credits.subscription.has_active_subscription == true){
								// patch existing sub
								var sub_button_text = "Update Subscription",formAction="updateSubscription";
							}else{
								// New subscription
								var sub_button_text = "Start Subscription",formAction="newSubscription";
							}
						}else{
							//new customer, new subscription
							var sub_button_text = "Start Subscription",formAction="newCustomer";
						}
						page += `<form id="subscriptionForm" data-form_action="${formAction}" method="POST">
								<button type="submit" class="btn btn-medium base-sm-buffer">${sub_button_text}</button>
								</form>
							
						
                        <span class="para">By subscribing, you are agreeing to our <a href="/terms" class="link">full terms of service.</a>  
					
						</div>
						<div class="col-md-6">
						${(params.user_info.credits.subscription.is_subscription_customer == true && params.user_info.credits.subscription.is_metered_billing == true) ? 
							
								`<BR><h5>Metered subscription Balance</h5>
								<span class='para'>Your metered subscription allows you to upload as many monitored images and complete as many searches as you like, and pay for exactly what you use at the end of the month. Usage logs are available on request, and will soon be visible within your account.</span>
								<span class='para'><strong>Current Metered Balance:</strong> <span id="metered_billing_balance">Loading...</span></span><BR>`
                            : ""	
                        }
							
						<h5>Cards</h5><p>
						Your default card will be charged when your subscription is due to be renewed.<BR>
						<ul id="cardList" style="font-size:1.4em">

						</ul>

						${(params.user_info.credits.subscription.is_subscription_customer == true) ? `
						<a href="#" class="btn btn-medium base-sm-buffer" id="addCardButton" >Add Card</a>` : "" }

						</p>
						<h5>Invoices</h5><p>
						<ul id="invoiceList" style="font-size:1.4em">
					
			
						</ul></p>
					
                    </fieldset>
					<?php
					
						}
					?>
                </div> <!-- END COL MD 6 -->
                
                
            </div>
       <!-- END ACCOUNT INFO -->
        </span>`

return page
}
