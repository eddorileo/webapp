function ignoreEditPageTemplate(result){
    console.log(result)
    const page = `
    <h1 class="headline">${result.list.list_label}</h1>
        ${(list_id != 0)? `<center><a href="/list/${result.list.list_id}" class="subhead sm link">Back to list settings</a> -- <a href="/list/0/ignore" class="subhead sm link">Account Ignored Domains</a></center>` : "."}
        
        <div class="row">
        <div class="col-md-1"></div>
            <div class="col-md-5">
        <strong class="subhead sm">Add domains to ignore</strong><br>

        <textarea id="lsv_domains" placeholder="Domains (one per line)\nUse * as a wildcard, i.e. yellowpages.* or *reggae*.com" class="form-control" style="width:100%;height: 270px;" ></textarea><br>
        <a href="#" id="addLsvDomainsButton" class="btn btn-mid pull-right">Add Ignored Domains</a>
        </div>
        <div class="col-md-5"><strong  class="subhead sm">Ignored Domains</strong><br>
            <div style="overflow:auto ;height: 330px;width:100%;border: 2px #f2cd13 solid;padding:0.7em;"><p>
        ${(result.ignored_hosts.length > 0) ? (result.ignored_hosts.map(function (host) {
            return `<span>
                <img alt="Delete Ignored Domain" title="Delete Ignored Domain" src="https://png.icons8.com/windows/24/e74c3c/trash.png" class="deleteIgnoredDomain" data-ignore_id="${host.ignore_id}" style="cursor: pointer" />
                <a href="http://${host.host}" target=_blank>
                ${host.host}
                </a><BR>
            </span>`
        }).join("") ) : ""}

        
        </p></div></div></div>
  
   </p>`

    return page
}

