function listsPageTemplate(params){
    const page = `
    <h1 class="headline">Listas de Busca</h1>

    <a class="pull-right btn btn-small" href="/list/new">Nova Lista</a>
    <div class="clearfix"></div>
    <table class="table subhead sm left"  style="width:100%!important">
        <tbody id="listInfoContainer">
            <tr>
                <td><strong>Lista</strong></td>
                <td><strong>Imagens</strong></td>
                <td><strong>Infra&ccedil;&otilde;es</strong></td> 
                ${(params.monitor_strategy === "classic") ? `
                    <td><strong>&Uacute;ltima Pesquisa Realizada</strong></td>
                    <td><strong>Monitoramento</strong></td>
                ` : ``}
                <td><strong>A&ccedil;&otilde;es</strong></td>
            </tr>

        </tbody>
    </table> 
      `

    return page
}

function listsTableTemplate(params){
    const newRows = `${params.lists.map(function (list) {
        return `
        <tr id='listrow${list.list_id}'>
            <td><a href="/list/${list.list_id}/query" class="link">${list.list_label}</a></td>
            <td>
                Lista: ${list.count}<br>
                Resultado: ${((!list.source_images_found) ? "0" : list.source_images_found) }
            </td>
            <td>
                ${ ((list["unique_hosts"] == 0) ? "Nenhuma infra&ccedil;&atilde;o encontrada" : "Dom&iacute;nios: "+((!list.unique_hosts) ? 0 : list.unique_hosts)+"<br> P&aacute;ginas: "+((!list.unique_pages) ? 0 : list.unique_pages))}
            </td>
            ${(params.monitor_strategy === "classic") ? `
            <td id="last_search_td_${list.list_id}">
                ${dynamicDate(list.last_result_search)}
            </td>
            <td>
                <div class="onoffswitch">
                    <input type="checkbox"  ${((list.monitor==true)? "checked" : "")} onclick="apiCall({method:'PATCH',endpoint:'/list/${list.list_id}',body:{monitor: this.checked},postAction:{action:'errorHandle',e:this}})" class="onoffswitch-checkbox" id="myonoffswitch${list.list_id}" >
                    <label class="onoffswitch-label" for="myonoffswitch${list.list_id}">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
            </td>
            ` : ``}
            <td>
            
            ${(params.monitor_strategy === "classic") ? `
                <a href="javascript: void(0)" onclick="apiCall({method:'GET',endpoint:'/search/${list.list_id}',postAction:{action:'setHTML',e:document.getElementById('last_search_td_${list.list_id}')}})">
                        <img class ="spin" onclick="$(this).css({'transform': 'rotate(1440deg)'});" alt="Buscar lista agora" title="Buscar lista agora" src="https://png.icons8.com/windows/24/7f8c8d/synchronize.png"/>
                    </a>
            ` : `` }
                <a href="/list/${list.list_id}/edit">
                    <img alt="Editar Lista" title="Editar Lista" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/>
                </a> 
                <a href="javascript: void(0)" onclick="apiCall({method:'DELETE',endpoint:'/list/${list.list_id}',precheck:'Voc&ecirc; tem certeza de que deseja deletar esta lista?',postAction:{action:'hide',e:document.getElementById('listrow${list.list_id}')}});">
                    <img alt="Deletar Lista" title="Deletar Lista" src="https://png.icons8.com/windows/24/7f8c8d/trash.png"/>
                </a>
                
            </td>
        </tr>`
    }).join('')}`
    return newRows
}