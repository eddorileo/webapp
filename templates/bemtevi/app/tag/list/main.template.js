
function tagPageTemplate(list,tags){
    const page = `
    <h1 class="headline">R�tulos</h1>
    <p class ="subhead sm">Voc� pode modificar os r�tulos que est�o dispon�veis.
    Caso contr�rio, r�tulos padr�es ser�o usados.</p>
    

    <table class="table subhead sm left">
        <tbody id="mainTagList">
            <tr><td><strong>Listas</strong></td><td><strong>Tags</strong></td><td><strong>A��es</strong></td></tr>
        
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
                <a href="/list/${list.list_id}/tag"><img alt="Editar R�tulos" title="Edit Tags" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a>            
            </td>
        </tr>`
        }).join('')}`
    
    return newRows
}