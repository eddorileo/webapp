function ignoreListPageTemplate(ignores){
    const page = `
    <h1 class="headline">Ignore Lists</h1>
    <p class="subhead sm">You can set domains to be ignored in searches or notifications on a per-list basis or across your entire account.</p>
    <table class="table subhead sm left" style="width:100%">
    <tr><td><strong>Lists</strong></td><td><strong>Ignored Domains</strong></td><td><strong>Actions</strong></td></tr>
    ${ignores.map(function (list) { 
        return `
    
        <tr id="nrow${list.list_id}">

            <td><a href="/list/${list.list_id}/ignore" class="link">${list.list_label}</a></td>
            <td>
                ${list.ignored_count}
            </td>
            <td>
                <a href="/list/${list.list_id}/ignore"><img alt="Edit Ignore List" title="Edit Ignore List" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a>            
            </td>
        </tr>`
        }).join('')}
    </table>`

    return page
}

