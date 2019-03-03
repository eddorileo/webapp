function queryPageTemplate(result,request,resolved_tags){

    const page = `
        <div class="search-panel-top">
        <h1 class="headline txt-left">${result.list.list_label}</h1>
            ${((result.list.search_in_progress > 0) ? '<div class="alert alert-info sm" role="alert">'+result.list.search_in_progress+' imagens nesta lista est&atilde;o na fila para serem pesquisadas. Você poder&aacute; encontrar mais resultados em breve.</div>' : "")}
 
        <div id="chart_div" style="width:100%;overflow:none"></div>
    </div> <!-- search panel top -->

    <div id="filters" class="search-panel-filter"></div>
    <a href="#" id="showAPI" class="link-a pull-right">Ver chave de busca</a>
    <input type=text id='apiquery' style='display:none; width:100%' />
    <div class="search-panel-content">
        <div class="row">
            <div class="col-md-3 primary-sidebar">
                
                    <header class="widget-toggle"><i class="ion ion-android-options"></i> TAGS <i class="ion ion-arrow-down-b"></i></header>
                    <div class="widget-group"> 
                    <div class="widget widget-tags">
                        <span class="h5"><i class="icon icon-tags"></i> &nbsp;Tags</span>

                        <ul class="tags-list block">
                        ${resolved_tags.tags.map(function (tag) {
                            return `
                                <li>
                                    <a href="#" data-tag_id="${tag.tag_id}" class="tag-select tag tag-${tag.tag_id} ${(resolved_tags.selected_tag == tag.tag_id) ? "active" : "" } " >
                                        ${tag.tag_label} ${(tag.tag_id != "all") ? ((resolved_tags.tags_found[tag.tag_id]) ? "("+ resolved_tags.tags_found[tag.tag_id]+")" : "(0)") : ""}
                                    </a>
                                </li>`

                            }).join('')
                        }
                                
                            <li><a href="#" data-tag_id="untagged" class="tag-select tag tag-default ${(resolved_tags.selected_tag == "untagged") ? "active" : "" } ">Sem r&oacute;tulo</a></li>
                            <li><a href="/list/${result.list.list_id}/tag">Editar r&oacute;tulos...</a></li>
                        </ul> <!-- tags list -->
                        
                    </div> <!-- widget -->
                </div> <!-- widget group -->
            </div> <!-- primary sidebar -->

            <div class="col-md-9 primary-content">

                <div class="panel-result-header">
                <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6">
                        <h5>${result.query_result.ngroups} domínios com ${result.query_result.matches} infraç&atilde;o</h5>
                    </div> <!-- col -->

                    <div class="col-xs-6 col-sm-6 col-md-6 controls txt-sm">
                        <a href="#" id="toggleSettings"><i class="icon icon-settings"></i></a> &nbsp; 
                        <a href="#" id="exportToCSV"><i class="icon icon-export"></i> Exportar</a>
                    </div> <!-- col -->
                </div> <!-- row -->
                <div id="settingsArea" style="display:none" class="row">
                       
                        <div class="col-xs-3 col-sm-3 col-md-3">
                            <select id="rowsSelect" class="form-control">
                                ${[15,50,100,500,1000].map(function (opt) {
                          
                                    return `
                                    <option value="${opt}" ${(opt == request.state.rows) ? "selected" : ""}>${opt} Resultados/P&aacute;gina</option>
                                    `
                                    
                                }).join('')}
                            </select>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3">
                            <select id="use_ignore_listsSelect" class="form-control">
                                        <option value="true" ${(Boolean(request.state.use_ignore_lists) === true)? "selected" : ""}>Esconder Ignorados</option>
                                        <option value="false" ${(Boolean(request.state.use_ignore_lists) === false)? "selected" : ""}>Mostrar Ignorados</option>
                            </select>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3">
                            <select name="sort" id="sortSelect" class="form-control" style="width:100%">

                                ${Object.keys(metrics).map(function(metric){
                                    if(metrics[metric].sortable === true){
                                        return `<option value="${metric} asc" ${(request.state.sort == metric+" asc") ? "selected" : "" }>Ordenar por ${metrics[metric].label} (${metric_types[metrics[metric].type].sort.asc})</option>
                                        <option value="${metric} desc" ${(request.state.sort == metric+" desc") ? "selected" : "" }>Ordenar por ${metrics[metric].label} (${metric_types[metrics[metric].type].sort.desc})</option>`
                                    }
                                }).join("")}
                                
                            </select>
                        </div>
                        <div class="col-xs-3 col-sm-3 col-md-3">
                            <p>
                                <a href="#" id="applySettings" class="btn btn-normal" style="font-size:1em">Aplicar Configurações</a>
                            </p>
                     
                        </div>
                    </div>
                </div> <!-- panel result header -->
                    <span id="prepend_pagination_container"></span>
                <div class="panel-result-content">
                    
                </div> <!-- panel result content -->
                    <span id="append_pagination_container"></span>
                <div class="panel-result-footer">
                
                    <ul class="tags-list inline" style="padding: 0.8em">
                        <!--- pagination --->
                    </ul>
                    <div class="row" id="check-status-cont">
                        <div class="col-md-9">
                        <p id="check-status" style="margin:0px"></p><BR>
                            ${tagButtons(result.resolved_tags,{host: "", result_id: "bulk", tag_id:0})}

                        </div> <!-- col -->

                        <div class="col-md-3">
                            <div class="page-options">
                                <a href="#" id="select-all-page" >All</a> <a href="#" id="select-none" >None</a>
                            </div> <!-- page options -->
                        </div> <!-- col -->
                    </div> <!-- row -->
                </div> <!-- panel result footer -->
            </div> <!-- primary content -->
        </div> <!-- row -->
    </div> <!-- search panel content -->
      `

    return page
}

function queryResultTemplate(result){
    
    const newRows = `${result.query_result.groups.map(function (res) {
        const main = res.doclist.docs[0]
        const other_matches = res.doclist.numFound - 1
        const other = res.doclist.docs
        delete other[0]
        registerAdditional(res.groupValue,other)
        return `
        
        <article class="host-${res.groupValue}" data-host="${res.groupValue}">
    
        <input type=checkbox class="result-check qcheckbox" data-id="${main.id}" onchange="resultChecked()" > &nbsp; 
        <a href="${main.url}" target=_blank class="link"><h3 class="font-md " style="display:inline;color:#000000;text-decoration:underline;">${main.host}:</h3> <h3 class="font-md text-primary-a" style="display:inline">${main.title}</h3></a>
        <div class="result-description">
            <div class="result-content">
                <span class="meta base-sm-buffer">${main.host} ${(other_matches>0) ? `<span style="color: grey">&plus; ${other_matches} other matches</span>` : ""}</span>
            </div>
            <div class="tag-overlay">
                <span class="meta base-sm-buffer text-primary-a"><a href="${main.url.substring(0,4)+"://"+main.host}" class="text-primary-a" target=_blank>${main.host}</a> ${(other_matches>0) ? `<a href="#" class="additional_rows link" data-host="${res.groupValue}">&plus; ${other_matches} other matches</a><a href="#" class="additional_rows_alt link" style="display:none" data-host="${res.groupValue}">- hide other matches</a>` : ""} - <a href="#" class="link text-primary-a  ignoreDomain"  data-host="${main.host}">Ignorar domínio</a> </span>
            </div>
        </div>

        <div class="figures">
            <a href="${main.search_image_url_signed}" target=_blank><img src="/images/bg.png" class="lazyload" data-src="${main.search_image_url_thumbnail}" class="img-responsive" title="Imagem fonte" alt="Imagem fonte" style="width:300px" /></a>

            <a href="${main.image_url}" target=_blank><img src="/images/bg.png" data-src="${main.image_url_thumbnail}" class="img-responsive"  title="Imagem encontrada" alt="Imagem encontrada"  style="width:300px" data-found="true" /></a>
        </div> <!-- figures -->

        <p class="base-sm-small-buffer">${(main.description) ? main.description : ""}</p>
        <div class="result-description">
            <div class="result-content">
                <span class ="meta"> ${languageCodeToLanguage(main.language)} -Encontrado: ${date_relative_short(atomToUnixTimestamp(main.found_timestamp))}.${(main.hasOwnProperty("verified")) ? ((main.verified == true) ?'<span class="text-primary-b"><i class="icon icon-check-success"></i> Verificado '+date_relative_short(atomToUnixTimestamp(main.verified_timestamp)) +'</i></span>': '<img src="https://png.icons8.com/windows/18/95a5a6/help.png" alt="Imagem n&atilde;o encontrada na p&aacute;gina"  title="Imagem n&atilde;o encontrada na p&aacute;gina"> Imagem n&atilde;o encontrada na p&aacute;gina'): ""}</span>
                
            </div>
            <div class="tag-overlay">
                <span class ="meta"> ${languageCodeToLanguage(main.language)} -Encontado: ${dynamicDate(atomToUnixTimestamp(main.found_timestamp))}.${(main.hasOwnProperty("verified")) ? ((main.verified == true) ?'<span class="text-primary-b"><i class="icon icon-check-success"></i> Verified '+dynamicDate(atomToUnixTimestamp(main.verified_timestamp)) +'</i></span>': '<img src="https://png.icons8.com/windows/18/95a5a6/help.png" alt="Imagem n&atilde;o encontrada na p&aacute;gina"  title="Imagem n&atilde;o encontrada na p&aacute;gina"> Imagem n&atilde;o encontrada na p&aacute;gina'): ""}</span>
                
            </div>
        </div>
        

        <div id="${main.id}-thetags">${tagButtons(result.resolved_tags,{host: main.host,result_id: main.id, tag_id:((main.tag && main.tag.length > 0) ? main.tag : 0)})}</div>
        <div id="${main.id}-tagfollowup"></div>
    </article>
        `
    }).join('')}`
    return newRows
}
function additionalResultTemplate(results,resolved_tags){
    const newRows = `<table style="width:100%">${results.map(function (main) {
        if(typeof main == "object"){
            return `<tr>
                    
                    <td style="width:90px;font-size:0.8em"><span class="meta base-sm-buffer"><small>FONTE</small></span>
                    <a href="${main.search_image_url}" target=_blank><img src="/images/bg.png" class="lazyload" data-src="${main.search_image_url_thumbnail}" class="img-responsive" title="Searched (source) image" alt="Searched (source) image" style="width:90px" /></a>
                </td>
                    <td style="width:150px;font-size:0.8em">
                    <span class="meta base-sm-buffer"><small>ENCONTRADO - ${main.image_width} × ${main.image_height}</small></span>
                    <a href="${main.image_url}" target=_blank><img src="/images/bg.png" data-src="${main.image_url_thumbnail}" class ="img-responsive"  title="Imagem Encontrada" alt="Imagem Encontrada"  style="width:90px" data-found="true" /></a>
                </td><td>
                <a href="${main.url}" target=_blank class="link" style="font-size: 14px;" >${main.title}</a>
                <span class="meta base-sm-buffer">
                
                    ${main.description}
                </small></span>
                    <div class="result-description">
                                <div class="result-content">
                                    <span class ="meta"> ${languageCodeToLanguage(main.language)} -Encontrado: ${date_relative_short(atomToUnixTimestamp(main.found_timestamp))}.${(main.hasOwnProperty("verified")) ? ((main.verified == true) ?'<span class="text-primary-b"><i class="icon icon-check-success"></i> Verificado '+date_relative_short(main.verified_timestamp) +'</i></span>': '<img src="https://png.icons8.com/windows/18/95a5a6/help.png" alt="Imagem n&atilde;o encontrada na p&aacute;gina"  title="Imagem n&atilde;o encontrada na p&aacute;gina"> Imagem n&atilde;o encontrada na p&aacute;gina'): ""}</span>
                    
                                </div>
                                <div class="tag-overlay">
                                    <span class ="meta"> ${languageCodeToLanguage(main.language)} -Encontrado: ${dynamicDate(atomToUnixTimestamp(main.found_timestamp))}.${(main.hasOwnProperty("verified")) ? ((main.verified == true) ?'<span class="text-primary-b"><i class="icon icon-check-success"></i> Verificado '+dynamicDate(main.verified_timestamp) +'</i></span>': '<img src="https://png.icons8.com/windows/18/95a5a6/help.png" alt="Imagem n&atilde;o encontrada na p&aacute;gina"  title="Imagem n&atilde;o encontrada na p&aacute;gina"> Imagem n&atilde;o encontrada na p&aacute;gina'): ""}</span>
                                    
                                </div>
                            </div>
                            <div id="${main.id}-thetags">${tagButtons(resolved_tags,{host: main.host,result_id: main.id, tag_id:((main.tag && main.tag.length > 0) ? main.tag : 0)})}</div>
                            <div id="${main.id}-tagfollowup"></div>

                </td>
            </tr>`
        }
    }).join('')}</table>`
    return newRows
}

function tagButtons(tags,result){
    const tagSpan = `<ul class="tags-list inline"><li>${(result.result_id=="bulk") ? 'Seleç&atilde;o: ' : ''} <i class="icon icon-tags"></i></li>
    ${tags.map(function (tag) {
       
        return `<li>
            <a href="javascript: void(0);" id="${result.result_id}-${tag.tag_id}" class="setTag tag tag-${tag.tag_id} ${(tag.tag_id == result.tag_id) ? "active" : ""}" data-result_id="${result.result_id}" data-tag_id="${tag.tag_id}" data-host="${result.host}">
            ${tag.tag_label}
            </a>
        </li>
        `
    }).join('')}
    </ul> <!-- tags list -->`
    return tagSpan
}

