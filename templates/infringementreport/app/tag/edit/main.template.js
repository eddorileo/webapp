
function tagPageTemplate(list,tags){
    const page = `
    <h1 class="headline">${list.list_label} Tags</h1>

    ${((list.list_id > 0) ? "<center><a href=\"/list/"+list.list_id+"/edit\" class=\"subhead sm link\">Back to list settings</a> -- <a href=\"/list/0/tag\" class=\"subhead sm link\">Account Tags</a></center>" : "")}
    <a class="pull-right btn btn-small" href="#" id="newTagButton">New Tag</a> <div class="clearfix"></div>
        
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-11">
                <table class='table subhead sm left' style="width:100%!important">
                    <tbody id='tagtable' >
                        <tr>
                            <td><strong>Tag</strong></td>
                            <td><strong>Color</strong></td>
                            <td><strong>Mapped to</strong></td>
                            <td><strong>State</strong></td>
                            <td></td>
                        </tr>
        
                    </tbody>
                </table>
            ${((tags.length === 0 && list.list_id != 0) ? "<p>You don't have any custom tags, we'll use your account defaults, or the Infringement.Report defaults. <a href=\"#\" onclick=\"newTag(); return false;\" class=\"link\">Add a new tag</a> </p>" :  "<a class=\"sm link pull-right\" href=\"#\" onclick=\"showDefaultTags(); return false;\">Restore Defaults</a>" ) }     
            </div>

            
        </div>
    `
      

    return page
}

function tagTableTemplate(tags){
    const newRows = `${tags.map(function(tag){
        return `
 
    <tr id="tagrow${tag.tag_id}">
        <td><input type=text data-tag_id="${tag.tag_id}" value=\"${tag.tag_label}\" class=\"form-control listLabelField\"></td>
        <td>
            
            <input type=color data-tag_id="${tag.tag_id}" style=\"width:100%\" value=\"#${tag.colour}\" class=\"form-control\">
            
        </td>
        <td>
            ${((tag.alias_of) ? tag.alias_of : "")}
        </td>
        <td>
            <select data-tag_id="${tag.tag_id}" class="listStateField"><option value="live" ${((tag.state=="live")? "selected" : "")}>Live</option><option ${((tag.state=="hidden")? "selected" : "")} value="hidden">Hidden</option></select>
        </td>
        <td>

            <a href="#" class="deleteTag" data-tag_id="${tag.tag_id}"><img alt="Delete List" data-tag_id="${tag.tag_id}" title="Delete List" src="https://png.icons8.com/windows/24/7f8c8d/trash.png"/></a>         
        </td>
    </tr>`
    }).join('')}`
    return newRows
}