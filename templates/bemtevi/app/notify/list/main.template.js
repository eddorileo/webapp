function notifyListPageTemplate(result){
    
    const page = `
    <h1 class="headline">Notifica��es</h1>
    <p class ="subhead sm"> N�s podemos enviar notifica��es por email quando novos resultados de busca forem encontrados em suas listas.
    Customize aqui as configura��es e frequ�ncia de suas notifica��es.
    </p>
  


    <table class="table subhead sm left" style="width:100%">
    <tr>
        <td><strong>Listas</strong></td>
        <td><strong>Filtros</strong></td>
        <td><strong>Frequ�ncia</strong></td>
        <td><strong>�ltima Notifica��o</strong></td>
        <td><strong>Tipo</strong></td>
        <td><strong>A��es</strong></td>
    </tr>
    <?php
    ${(result.length > 0) ? (result.map(function (list) {
        return `<tr id="nrow${list.notify_id}">
            <td><a href="/notify/${list.notify_id}" class="link">${(list.list_id =="all")? "All" :list.list_id.join(",")}</a></td>
            <td>
                 ${list.filter_string}
            </td>
            <td>
                ${list.schedule}
            </td>
            <td>
                ${dynamicDate(list.last_notification)}
            </td>
            <td>
                ${list.type}
            </td>
            <td>
                <a href="/notify/${list.notify_id}"><img alt="Editar Configura��es de Notifica��o" title="Editar Configura��es de Notifica��o" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a>
                <a href="#" id="deleteNotify" data-notify_id="${list.notify_id}"><img alt="Deletar Notifica��o" title="Deletar Notifica��o" src="https://png.icons8.com/windows/24/7f8c8d/trash.png"/></a>
                
            </td>
        </tr>`
    }).join("") ) : ""}
    </table> 
    <a class="pull-right btn btn-mid" href="/notify/new">Nova Notifica��o</a>`

    return page
}

