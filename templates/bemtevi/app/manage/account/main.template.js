function manageAccountPageTemplate(params){
    const page = `
    <h1 class="headline base-sm-small-buffer">Gerenciar Conta</h1>
		

        <span class="account-info">
            <div class="row">
                <div class="col-md-6">
					<h2>Configuraçoes do Relatório</h2>
					<p class=" sm ">
						<a href="/tag" class="link">Rótulos</a><br>
						<a href="/ignore" class="link">Domínios Ignorados</a><br>
						<a href="/notify" class="link">Notificações</a>
					</p>
						<h2>Suas Assinaturas</h2>
					<p >
						<Strong>${(params.user_info.credits.total.package_labels) ? params.user_info.credits.total.package_labels : "Nenhuma assinatura ativa" }</strong><br>
						<strong>${params.user_info.credits.total.credits.toLocaleString()}</strong> busca(s) avulsa(s)/mo (<i>${params.user_info.credits.total.remaining.toLocaleString()} restante</i>)<br>
						<strong>${params.user_info.credits.total.monitor.toLocaleString()}</strong> imagens monitoradas (<i>${params.user_info.credits.total["remaining-monitor"].toLocaleString()} restantes</i>)<br>
						<BR><a href="/manage/subscription" class="btn btn-medium">Gerenciar Assinatura</a>
					</p>
					
					
   
                    <h2>Account information</h2>
                    <fieldset class="base-md-small-buffer">
                        <label class="base-xs-small-buffer">Email</label>
                        <input type="text" value="${params.user_info.email}" class="max" disabled />
                     
                    </fieldset>
                    
            
                    
                    <fieldset class="base-lg-buffer">
                        <label class="base-xs-small-buffer">API Key</label>
                        <input type="text" value="${params.user_info.apikey}" class="max"  />
                        <span class="para base-xs-small-buffer"><a href="#" id="resetAPI" class="link">Resetar</a> &nbsp; <a href="https://buscalogo.api-docs.io/" class="link">API Documentation</a></span>
                    </fieldset>
                    
                    <fieldset class="base-lg-small-buffer">
                        <label>Mudar Senha</label>

                        <input type="password" name="password" placeholder="Senha Atual" class="max base-sm-medium-buffer"  />
                        
                        <input type="password" name="new_password" placeholder="Nova Senha" class="max base-sm-medium-buffer"  />
                        
                        <input type="password" name="confirm_password" placeholder="Repetir Nova Senha" class="max base-sm-buffer"  />
                        
                        <a href="#" class="btn btn-medium" id="changePassword">Salvar Endereço</a>
                    </fieldset>
				</div>
				<div class="col-md-6">
                    <fieldset class="base-md-small-buffer">
                        <label class="base-xs-high-buffer">Nome e Endereço do Negócio</label>
                        
                        <span class="para base-sm-large-buffer">Isto aparecerá nos recibos de pagamento</span>

						<input type=text name='address[name]' class='max base-sm-medium-buffer' placeholder='Business Name' value="${params.user_info.address.name}"><br>
						<input type=text name='address[line1]' class='max base-sm-medium-buffer' placeholder='Address Line 1' value="${params.user_info.address.line1}"><br>
						<input type=text name='address[line2]' class='max base-sm-medium-buffer' placeholder='Address Line 2' value="${params.user_info.address.line2}"><br>
						<input type=text name='address[city]' class='max base-sm-medium-buffer' placeholder='City' value="${params.user_info.address.city}"><br>
						<input type=text name='address[postcode]' class='max base-sm-medium-buffer' placeholder='Postcode' value="${params.user_info.address.postcode}"><br>
                        <select name='address[country]' class="form-control" style="width:100%"><option value="">Selecionar País</option> 
                        ${params.countries.map(function(country){
                            return `<option value="${country["alpha-2"]}" ${(country["alpha-2"] == params.user_info.address.country) ? " selected" : ""}>${country.name}</option>`
                        }).join('')}
						</select><br><br>
						<input type=text name='address[vatnumber]' class='max base-sm-medium-buffer' placeholder='VAT Number (GBXXXXXXX)' value="${params.user_info.address.vatnumber}">
                        
                        <a href="#" class="btn btn-medium" id="saveAddress">Salvar Endereço</a> <p style="display:inline" id="changeAddressConfirm"></p>
						
                    </fieldset>
                </div> <!-- END COL MD 6 -->
            </div>
      `

    return page
}
