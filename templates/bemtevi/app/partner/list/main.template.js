function partnerListPageTemplate(result){

    const page = `
    <h1 class="headline">Seus Usu�rios</h1>
    <a class="pull-right btn btn-small" href="/partner/new">Novo Usu�rio</a>
    <p>
        Filter: <a href="/partner/list?active=users">Todos Usu�rios</a> | <a href="/partner/list?active=activeUsers">Usu�rios Ativos</a>
    </p>
    <div class="clearfix"></div>
    <table class="table subhead sm left"  style="width:100%!important">
        <tbody id="listInfoContainer">
            <tr>
                <td><strong>Email</strong></td>
                <td><strong>ID</strong></td>
                <td><strong>Pacote</strong></td>
                <td><strong>Permitido</strong></td> 
                <td><strong>Monitorados</strong></td>
                <td><strong>Expira��o da Assinatura</strong></td>
                <td><strong>Habilitado</strong></td>
                <td><strong>A��es</strong></td>
            </tr>
            ${result.users.map(function (user) {
                return `
                <tr>
                    <td>${user.user_id}</td>
                    <td>${user.email}</td>
                    <td>
                       ${(user.package !== null) ? user.package.package_label : ""}
                    </td>
                    <td>
                        ${(user.package !== null) ? user.package.monitor : ""}
                    </td>
                    <td>
                        ${user.monitored_images}
                    </td>
                    <td>
                        ${dynamicDate(user.expiry_time)}
                    </td>
                    <td>
                        <div class="onoffswitch"> 
                            <input type="checkbox"  ${((user.enabled==true || user.enabled == "1")? "checked" : "")}  class="onoffswitch-checkbox user_enabled" data-user_id="${user.user_id}" id="myonoffswitch${user.user_id}">
                            <label class="onoffswitch-label" for="myonoffswitch${user.user_id}">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                            </label>
                        </div>
                    </td>
                    <td>
                        <a href="#" class="link takeAccount" data-apikey="${user.apikey}"><img data-apikey="${user.apikey}" src="https://img.icons8.com/windows/24/666666/key-security.png"></a>
                        
                    </td>
                </tr>`
            }).join('')}
        </tbody>
    </table> 
        `

    return page
}
