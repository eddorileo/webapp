
function tagPageTemplate(list,tags){
    const page = `
    <h1 class="headline">Tags</h1>
    <p class="subhead sm">You can modify the tags which are available. Your account defaults will be used if you do not have a list-specific set of tags.</p>
    

    <table class="table subhead sm left">
        <tbody id="mainTagList">
            <tr><td><strong>Lists</strong></td><td><strong>Tags</strong></td><td><strong>Actions</strong></td></tr>
        
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
                <a href="/list/${list.list_id}/tag"><img alt="Edit Tags" title="Edit Tags" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a>            
            </td>
        </tr>`
        }).join('')}`
    
    return newRows
}