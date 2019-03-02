function ignoreEditPageTemplate(result){
    console.log(result)
    const page = `
    <h1 class="headline">${result.list.list_label}</h1>
        ${(list_id != 0)? `<center><a href="/list/${result.list.list_id}" class="subhead sm link">Voltar para configuração da lista</a> -- <a href="/list/0/ignore" class="subhead sm link">Domínios da Conta Ignorado</a></center>` : "."}
        
        <div class="row">
        <div class="col-md-1"></div>
            <div class="col-md-5">
        <strong class="subhead sm">Add domains to ignore</strong><br>

        <textarea id="lsv_domains" placeholder="Domínimos (um por linha)\nUse * como caracter coringa, e.g., paginasamarelas.* ou *valsa*.com" class="form-control" style="width:100%;height: 270px;" ></textarea><br>
        <a href="#" id="addLsvDomainsButton" class="btn btn-mid pull-right">Adicionar domínimos ignorados</a>
        </div>
        <div class="col-md-5"><strong  class="subhead sm">Domínios Ignorados</strong><br>
            <div style="overflow:auto ;height: 330px;width:100%;border: 2px #f2cd13 solid;padding:0.7em;"><p>
        ${(result.ignored_hosts.length > 0) ? (result.ignored_hosts.map(function (host) {
            return `<span>
                <img alt="Deletar Domínio Ignorado" title="Deletar Domínios Ignorados" src="https://png.icons8.com/windows/24/e74c3c/trash.png" class="deleteIgnoredDomain" data-ignore_id="${host.ignore_id}" style="cursor: pointer" />
                <a href="http://${host.host}" target=_blank>
                ${host.host}
                </a><BR>
            </span>`
        }).join("") ) : ""}

        
        </p></div></div></div>
  
   </p>`

    return page
}

