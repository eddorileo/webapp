

function casesListPageTemplate(cases){
    const page = `
    <h1 class="headline">Sua Lista de Buscas</h1>

    <a class="pull-right btn btn-small" href="/list/new">Nova Lista</a>
    <div class="clearfix"></div>
    <table class="table subhead sm left"  style="width:100%!important">
        <tbody id="listInfoContainer">
            <tr>
                <td><strong>ID</strong></td>
                <td><strong>Imagem Buscada</strong></td> 
                <td><strong>Imagem Infratora</strong></td> 
                <td><strong>Página Infratora</strong></td> 
                <td><strong>Datas do Resultado</strong></td> 
                <td><strong>Status do Usuário</strong></td> 
                <td><strong>Parent Status</strong></td>
                <td><strong>Datas dos Casos</strong></td>
                <td><strong>Ações</strong></td>
            </tr>
            ${cases.map(function (cased) {
                return `
                <tr>
                    <td><a href="/case/${cased.case_id}" class="link">${cased.case_id}</a></td>
                    <td>
                       ${cased.image_url}
                    </td>
                    <td>
                        <a href="${cased.result_data.image_url}" target="_blank">${cased.result_data.image_url}</a>
                    </td>
                    <td>
                        <a href="${cased.result_data.url}" target="_blank">${cased.result_data.title}</a>
                    </td>
                    <td>
                        Found: ${cased.result_data.found_timestamp}
                        Last Seen: ${cased.result_data.seen_timestamp}
                    </td>
                    <td>
                        ${cased.user_status}
                    </td>
                    <td>
                        ${cased.user_status}
                    </td>
                    <td>
                        ${cased.parent_status}
                    </td>
                    <td>
                        Created: ${cased.date_created}
                        Updated: ${cased.date_updated}
                    </td>
                    <td>
                        <a href="javascript: void(0)" onclick="apiCall({method:'GET',endpoint:'/search/}',postAction:{action:'setHTML',e:document.getElementById('last_search_td_}')}})">
                                <img class="spin" onclick="$(this).css({'transform': 'rotate(1440deg)'});" alt="Search List Now" title="Search List Now" src="https://png.icons8.com/windows/24/7f8c8d/synchronize.png"/>
                            </a>
                        <a href="/list/}/edit">
                            <img alt="Edit List" title="Edit List" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/>
                        </a> 
                        <a href="javascript: void(0)" onclick="apiCall({method:'DELETE',endpoint:'/list/}',precheck:'Are you sure that you want to delete this list?',postAction:{action:'hide',e:document.getElementById('listrow}')}});">
                            <img alt="Delete List" title="Delete List" src="https://png.icons8.com/windows/24/7f8c8d/trash.png"/>
                        </a>
                        
                    </td>
                </tr>`
            }).join('')}
        </tbody>
    </table> 
      `

    return page
}

