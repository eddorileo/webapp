
function registerPartnerTemplate(params){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Criar nova conta</h1>
    <fieldset>
        <div class="row login-form">
            <div class="col-sm-2 col-md-2"></div>
            <div class="col-sm-8 col-md-8">
                
                <input id="email" type=email placeholder="client@email.com" name="email" /><BR>
                <select id="package_id">
                <option value='0'>Sem pacote inicial</option>
                ${ Object.keys(params.packages).map(function(i){
                    var package = params.packages[i]

                    return `<option value="${package.package_id}" data-package-id="${package.package_id}" data-package-label="${package.package_label}" data-price="${package.price}" data-credits="${package.searches}" data-monitor="${package.monitor}">
                            ${package.package_label} - ${package.monitor.toLocaleString()} monitored images & ${package.searches.toLocaleString()} searches</option>`
                  
                }).join('')}
                </select><br><BR>
                Pacote inicial expira em (dias)
                <input id="inital_package_length" type=number placeholder="30" value='0' /><BR>
                <a href="#" class="btn-medium" id="registerButton">Criar Usuário</a>
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </div>
    </fieldset>
      `

    return page
}

