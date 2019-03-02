function manageAccountPageTemplate(params){
    const page = `
    <h1 class="headline base-sm-small-buffer">Gerenciar Conta</h1>
		

        <span class="account-info">A
            <div class="row">
                <div class="col-md-6">
					<h2>Configura&ccedil;&otilde;es do Relat&oacute;rio</h2>
					<p class=" sm ">
						<a href="/tag" class="link">R&oacute;tulos</a><br>
						<a href="/ignore" class="link">Dom&iacute;nios Ignorados</a><br>
						<a href="/notify" class="link">Notifica&ccedil;&otilde;es</a>
					</p>
						<h2>Assinaturas</h2>
					<p >
						<Strong>${(params.user_info.credits.total.package_labels) ? params.user_info.credits.total.package_labels : "Nenhuma assinatura ativa" }</strong><br>
						<strong>${params.user_info.credits.total.credits.toLocaleString()}</strong> busca(s) avulsa(s)/mo (<i>${params.user_info.credits.total.remaining.toLocaleString()} restante</i>)<br>
						<strong>${params.user_info.credits.total.monitor.toLocaleString()}</strong> imagens monitoradas (<i>${params.user_info.credits.total["remaining-monitor"].toLocaleString()} restante</i>)<br>
						<BR><a href="/manage/subscription" class="btn btn-medium">Gerenciar Assinatura</a>
					</p>
					
					
   
                    <h2>Informa&ccedil;&atilde;o da Conta</h2>
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
                        
                        <a href="#" class="btn btn-medium" id="changePassword">Salvar Endere&ccedil;o</a>
                    </fieldset>
				</div>
				<div class="col-md-6">
                    <fieldset class="base-md-small-buffer">
                        <label class="base-xs-high-buffer">Nome e Endere&ccedil;o da Empresa</label>
                        
                        <span class="para base-sm-large-buffer">Estas informa&ccedil;&otilde;es constar&atilde;o nos recibos de pagamento</span>

						<input type=text name='address[name]' class='max base-sm-medium-buffer' placeholder='Nome da Empresa' value="${params.user_info.address.name}"><br>
						<input type=text name='address[line1]' class='max base-sm-medium-buffer' placeholder='Endereço linha 1' value="${params.user_info.address.line1}"><br>
						<input type=text name='address[line2]' class='max base-sm-medium-buffer' placeholder='Endereço linha 2' value="${params.user_info.address.line2}"><br>
						<input type=text name='address[city]' class='max base-sm-medium-buffer' placeholder='Cidade' value="${params.user_info.address.city}"><br>
						<input type=text name='address[postcode]' class='max base-sm-medium-buffer' placeholder='CEP' value="${params.user_info.address.postcode}"><br>
                        <select name='address[country]' class="form-control" style="width:100%"><option value="">Selecionar Pa&iacute;s</option> 
                        ${params.countries.map(function(country){
                            return `<option value="${country["alpha-2"]}" ${(country["alpha-2"] == params.user_info.address.country) ? " selected" : ""}>${country.name}</option>`
                        }).join('')}
						</select><br><br>
						<input type=text name='address[vatnumber]' class='max base-sm-medium-buffer' placeholder='CNPJ' value="${params.user_info.address.vatnumber}">
                        
                        <a href="#" class="btn btn-medium" id="saveAddress">Salvar Endere&ccedil;o</a> <p style="display:inline" id="changeAddressConfirm"></p>
						
                    </fieldset>
                </div> <!-- END COL MD 6 -->
            </div>
      `

    return page
}
