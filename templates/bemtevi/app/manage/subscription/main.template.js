function manageSubscriptionPageTemplate(params){
	console.log("managesub",params)
    var page = `
    <h1 class="headline base-sm-small-buffer">Pagamento</h1>
		<div id="messagebar" role="alert"></div>

        <span class="account-info">
            <div class="row">
			
                <div class="col-md-6">

					<h2>Sua Assinatura</h2>
					<p >
					<Strong>${(params.user_info.credits.total.package_labels) ? params.user_info.credits.total.package_labels : "Nenhuma assinatura ativa" }</strong><br>
                    <strong>${params.user_info.credits.total.credits.toLocaleString()}</strong> busca avulsa/mo (<i>${params.user_info.credits.total.remaining.toLocaleString()} restante</i>)<br>
                    <strong>${params.user_info.credits.total.monitor.toLocaleString()}</strong> imagens monitoradas (<i>${params.user_info.credits.total["remaining-monitor"].toLocaleString()} restantes</i>)<br>					
					${(params.user_info.credits.subscription.has_active_subscription !== null) ? ((params.user_info.credits.subscription.has_active_subscription === true) ? "<a href=\"#\" class=\"link\" id=\"cancelSubscription\">Cancelar assinatura</a></p>" : "Nenhuma assinatura ativa") : '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_manage-paylist" class="link">Cancelar assinatura</a></p>'}
					</p >
                    <h2>Modificar Assinatura</h2>

                    <fieldset class="base-lg-small-buffer">
                        <legend class="normal">Sua residência fiscal</legend><p>`
                        switch (params.user_info.vat_status){
								case 0:
									page += "";
								break;
								case 1:
									page += "You are based within the UK and will be charged 20% VAT";
								break;
								case 2:
									page += "You are within the EU and have provided a VAT number. VAT for your subscription will be zero-rated.";
								break; 
								case 3:
									page += "Você ainda não indicou um endereço válido";
								break;
								case 4:
									page += "You are within the EU, but have not provided a VAT number. We must collect 20% VAT on your subscription.";
								break;
							}
						 
						 page += ` <a href="/manage/account" class="link">Atualize o seu endereço</a></p>
                    </fieldset>

                    <fieldset>
                        <legend class="normal">Escolha um pacote mensal</legend>

                        <div class="plan-details">
						<select class="form-control" style="width:100%" id="package-select">
                            ${ Object.keys(params.packages).map(function(i){
								var package = params.packages[i]
		
								return `<opção ${(params.user_info.credits.package_id === package.package_id) ? "selecionada" : ""} value="${package.package_id}" data-package-id="${package.package_id}" data-package-label="${package.package_label}" data-price="${package.price}" data-credits="${package.searches}" data-monitor="${package.monitor}">
                                        $${package.price} - ${package.package_label} - ${package.monitor.toLocaleString()} imagens monitoradas & ${package.searches.toLocaleString()} buscas</option>`
                              
                            }).join('')}
					    </select></br></br>
                        </div> <!-- END PLAN DETAILS -->`

					
						if(params.user_info.credits.subscription.is_subscription_customer == true){
							//existing customer
							if(params.user_info.credits.subscription.has_active_subscription == true){
								// patch existing sub
								var sub_button_text = "Atualizar Assinatura",formAction="updateSubscription";
							}else{
								// New subscription
							    var sub_button_text = "Nova Assinatura", formAction = "newSubscription";
							}
						}else{
							//new customer, new subscription
							var sub_button_text = "Nova Assinatura",formAction="newCustomer";
						}
						page += `<form id="subscriptionForm" data-form_action="${formAction}" method="POST">
								<button type="submit" class="btn btn-medium base-sm-buffer">${sub_button_text}</button>
								</form>
							
						
                        <span class="para">Ao assinar, você está concordando com nossos <a href="/terms" class="link">termos de serviço completo.</a>  
					
						</div>
						<div class="col-md-6">
						${(params.user_info.credits.subscription.is_subscription_customer == true && params.user_info.credits.subscription.is_metered_billing == true) ? 
							
								`<BR><h5>Saldo da sua Assinatura</h5>
								<span class ='para'>Sua assinatura permite que você carregue imagens monitoradas e faça buscas na quantidade que você desejar e pague por exatamente o que você usar no final do mês.</span>
								<span class='para'><strong>Saldo Atual:</strong> <span id="metered_billing_balance">Carregando...</span></span><BR>`
                            : ""	
                        }
							
						<h5>Cartões</h5><p>
						Seu cartão padrão será cobrado quando sua assinatura estiver para ser renovada.<BR>
						<ul id="cardList" style="font-size:1.4em">

						</ul>

						${(params.user_info.credits.subscription.is_subscription_customer == true) ? `
						<a href="#" class="btn btn-medium base-sm-buffer" id="addCardButton" >Adicionar Cartão</a>` : "" }

						</p>
						<h5>Recibos</h5><p>
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
