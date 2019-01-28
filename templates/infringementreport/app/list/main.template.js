function listsPageTemplate(){
    const page = `
    <h1 class="headline">Your search lists</h1>

    <a class="pull-right btn btn-small" href="/list/new">New List</a>
    <div class="clearfix"></div>
    <table class="table subhead sm left"  style="width:100%!important">
        <tbody id="listInfoContainer">
            <tr>
                <td><strong>List</strong></td>
                <td><strong>Images</strong></td>
                <td><strong>Infringements</strong></td> 
                <td><strong>Last Search Complete</strong></td>
                <td><strong>Monitoring</strong></td>
                <td><strong>Actions</strong></td>
            </tr>

        </tbody>
    </table> 
      `

    return page
}

function listsTableTemplate(lists){
    const newRows = `${lists.map(function (list) {
        return `
        <tr id='listrow${list.list_id}'>
            <td><a href="/list/${list.list_id}/query" class="link">${list.list_label}</a></td>
            <td>
                In List: ${list.count}<br>
                With Results: ${((!list.source_images_found) ? "0" : list.source_images_found) }
            </td>
            <td>
                ${ ((list["unique_hosts"] == 0) ? "No infringements found" : "Domains: "+((!list.unique_hosts) ? 0 : list.unique_hosts)+"<br> Pages: "+((!list.unique_pages) ? 0 : list.unique_pages))}
            </td>
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
            <td>
                <a href="javascript: void(0)" onclick="apiCall({method:'GET',endpoint:'/search/${list.list_id}',postAction:{action:'setHTML',e:document.getElementById('last_search_td_${list.list_id}')}})">
                        <img class="spin" onclick="$(this).css({'transform': 'rotate(1440deg)'});" alt="Search List Now" title="Search List Now" src="https://png.icons8.com/windows/24/7f8c8d/synchronize.png"/>
                    </a>
                <a href="/list/${list.list_id}/edit">
                    <img alt="Edit List" title="Edit List" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/>
                </a> 
                <a href="javascript: void(0)" onclick="apiCall({method:'DELETE',endpoint:'/list/${list.list_id}',precheck:'Are you sure that you want to delete this list?',postAction:{action:'hide',e:document.getElementById('listrow${list.list_id}')}});">
                    <img alt="Delete List" title="Delete List" src="https://png.icons8.com/windows/24/7f8c8d/trash.png"/>
                </a>
                
            </td>
        </tr>`
    }).join('')}`
    return newRows
}