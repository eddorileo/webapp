
function tagPageTemplate(list,tags){
    const page = `
    <h1 class="headline">R&oacute;tulos</h1>
    <p class ="subhead sm">Voc&ecirc; pode modificar os r&oacute;tulos que est&atilde;o dispon&iacute;veis.
    Caso contr&aacute;rio, r&oacute; tulos padr&otilde; es ser&atilde;o usados.</p>
    

    <table class="table subhead sm left">
        <tbody id="mainTagList">
            <tr><td><strong>Listas</strong></td><td><strong>R&oacute;tulo</strong></td><td><strong>A&ccedil;&otilde;es</strong></td></tr>
        
                    </tbody>
                </table>
     

            
        </div>
    `
      

    return page
}

function tagTableTemplate(lists){
    const newRows = `${lists.map(function (list) { 
        return `
    
        <tr id="tagrow${list.list_id}">

            <td><a href="/list/${list.list_id}/tag" class="link">${list.list_label}</a></td>
            <td>
                ${list.tag_count}
            </td>
            <td>
                <a href="/list/${list.list_id}/tag"><img alt="Editar R&oacute;tulos" title="Editar R&oacute;tulos" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a>
            </td>
        </tr>`
        }).join('')}`
    
    return newRows
}