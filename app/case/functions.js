function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/case',
        postAction: {action: "nothing"},
        callback: function(result) {
            $("#page_container").html(casesListPageTemplate(result))
        }
    })
}
