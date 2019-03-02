function notifyListPageTemplate(result){
    
    const page = `
    <h1 class="headline">Notifications</h1>
    <p class="subhead sm">We can send notification emails or API callbacks when we find any new domains using the images in your lists. Customise your notification frequency and settings here.</p>
  


    <table class="table subhead sm left" style="width:100%">
    <tr>
        <td><strong>Lists</strong></td>
        <td><strong>Filters</strong></td>
        <td><strong>Notification Frequency</strong></td>
        <td><strong>Last Notification</strong></td>
        <td><strong>Notification Type</strong></td>
        <td><strong>Actions</strong></td>
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
                <a href="/notify/${list.notify_id}"><img alt="Edit Notification Settings" title="Edit Notification Settings" src="https://png.icons8.com/windows/24/7f8c8d/edit.png"/></a> 
                <a href="#" id="deleteNotify" data-notify_id="${list.notify_id}"><img alt="Delete Notification" title="Delete Notification" src="https://png.icons8.com/windows/24/7f8c8d/trash.png"/></a>
                
            </td>
        </tr>`
    }).join("") ) : ""}
    </table> 
    <a class="pull-right btn btn-mid" href="/notify/new">New Notification</a>`

    return page
}

