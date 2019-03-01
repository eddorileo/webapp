function initPage(){
    var credits = JSON.parse(localStorage.credits)
    $("#page_container").html(

        listsNewPageTemplate({monitor_strategy: credits.monitor_strategy})
    )
    $("#createNewList").click(newList)
}
        
    
function newList(){
    apiCall({
        loadingFeedback: true,
        method:'POST',
        endpoint:'/list',
        body: {
            list_label: $("#container_list_label").val(),
            monitor: $("#container_monitor").prop('checked')
        },
        postAction: {action: "nothing"},
        callback: function(result) {
            window.location = "/list/"+result.list_id+"/edit"
        }
    })
}

