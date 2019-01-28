
function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/notify',
        postAction: {action: "nothing"},
        callback: function(result) {
            $("#page_container").html(notifyListPageTemplate(result))
            click(".deleteNotify",function(event){
                var notify_id = $(event.target).attr("data-notify_id")
                deleteNotify(notify_id)
            })
        }
    })
}


function deleteNotify(notify_id){
    var r = confirm("Are you sure that you want to delete this notification?");
    if (r == true) {
        apiCall({
            method:'DELETE',
            endpoint:'/notify/'+notify_id,
            postAction:{
                action: 'hide',
                e: document.getElementById('nrow'+notify_id)
            }
        })
    }
}