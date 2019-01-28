function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/ignore',
        postAction: {action: "nothing"},
        callback: function(result) {
            $("#page_container").html(ignoreListPageTemplate(result))
        }
    })
}
