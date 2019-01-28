function manageAccountPageTemplate(params){
    const page = `
    <h1 class="headline base-sm-small-buffer">Manage account</h1>
		

        <span class="account-info">
            <div class="row">
                <div class="col-md-6">
					<h2>Report Settings</h2>
					<p class=" sm ">
						<a href="/tag" class="link">Tags</a><br>
						<a href="/ignore" class="link">Ignored Domains</a><br>
						<a href="/notify" class="link">Notifications</a>
					</p>
						<h2>Your subscription</h2>
					<p >
						<Strong>${(params.user_info.credits.total.package_labels) ? params.user_info.credits.total.package_labels : "No active subscription" }</strong><br>
						<strong>${params.user_info.credits.total.credits.toLocaleString()}</strong> one-off searches/mo (<i>${params.user_info.credits.total.remaining.toLocaleString()} remaining</i>)<br>
						<strong>${params.user_info.credits.total.monitor.toLocaleString()}</strong> monitored images (<i>${params.user_info.credits.total["remaining-monitor"].toLocaleString()} remaining</i>)<br>
						<BR><a href="/manage/subscription" class="btn btn-medium">Manage subscription</a>
					</p>
					
					
   
                    <h2>Account information</h2>
                    <fieldset class="base-md-small-buffer">
                        <label class="base-xs-small-buffer">Email</label>
                        <input type="text" value="${params.user_info.email}" class="max" disabled />
                     
                    </fieldset>
                    
            
                    
                    <fieldset class="base-lg-buffer">
                        <label class="base-xs-small-buffer">API Key</label>
                        <input type="text" value="${params.user_info.apikey}" class="max"  />
                        <span class="para base-xs-small-buffer"><a href="#" id="resetAPI" class="link">Reset</a> &nbsp; <a href="https://infringementreport.api-docs.io/" class="link">API Documentation</a></span>
                    </fieldset>
                    
                    <fieldset class="base-lg-small-buffer">
                        <label>Change password</label>

                        <input type="password" name="password" placeholder="Current password" class="max base-sm-medium-buffer"  />
                        
                        <input type="password" name="new_password" placeholder="New password" class="max base-sm-medium-buffer"  />
                        
                        <input type="password" name="confirm_password" placeholder="Repeat new password" class="max base-sm-buffer"  />
                        
                        <a href="#" class="btn btn-medium" id="changePassword">Save Address</a>
                    </fieldset>
				</div>
				<div class="col-md-6">
                    <fieldset class="base-md-small-buffer">
                        <label class="base-xs-high-buffer">Business name and address</label>
                        
                        <span class="para base-sm-large-buffer">This will appear on payment receipts</span>

						<input type=text name='address[name]' class='max base-sm-medium-buffer' placeholder='Business Name' value="${params.user_info.address.name}"><br>
						<input type=text name='address[line1]' class='max base-sm-medium-buffer' placeholder='Address Line 1' value="${params.user_info.address.line1}"><br>
						<input type=text name='address[line2]' class='max base-sm-medium-buffer' placeholder='Address Line 2' value="${params.user_info.address.line2}"><br>
						<input type=text name='address[city]' class='max base-sm-medium-buffer' placeholder='City' value="${params.user_info.address.city}"><br>
						<input type=text name='address[postcode]' class='max base-sm-medium-buffer' placeholder='Postcode' value="${params.user_info.address.postcode}"><br>
                        <select name='address[country]' class="form-control" style="width:100%"><option value="">Select Country</option> 
                        ${params.countries.map(function(country){
                            return `<option value="${country["alpha-2"]}" ${(country["alpha-2"] == params.user_info.address.country) ? " selected" : ""}>${country.name}</option>`
                        }).join('')}
						</select><br><br>
						<input type=text name='address[vatnumber]' class='max base-sm-medium-buffer' placeholder='VAT Number (GBXXXXXXX)' value="${params.user_info.address.vatnumber}">
                        
                        <a href="#" class="btn btn-medium" id="saveAddress">Save Address</a> <p style="display:inline" id="changeAddressConfirm"></p>
						
                    </fieldset>
                </div> <!-- END COL MD 6 -->
            </div>
      `

    return page
}
