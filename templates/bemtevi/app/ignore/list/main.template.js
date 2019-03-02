function ignoreListPageTemplate(ignores){
    const page = `
    <h1 class="headline">Ignorar Listas</h1>
    <p class="subhead sm">Você pode definir domínios a ser ignorados em pesquisas ou notificações para uma lista ou para a conta como um todo.</p>
    <table class="table subhead sm left" style="width:100%">
    <tr><td><strong>Lists</strong></td><td><strong>Domínios Ignorados</strong></td><td><strong>Ações</strong></td></tr>
    ${ignores.map(function (list) { 
        return `
    
        <tr id="nrow${list.list_id}">

            <td><a href="/list/${list.list_id}/ignore" class="link">${list.list_label}</a></td>
            <td>
                ${list.ignored_count}
            </td>
            <td>
                <a href="/list/${list.list_id}/ignore"><img alt="Edit Ignore List" title="Editar Listas Ignoradas" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a>            
            </td>
        </tr>`
        }).join('')}
    </table>`

    return page
}

