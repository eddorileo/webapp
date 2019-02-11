function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/cases',
        postAction: {action: "nothing"},
        callback: function(result) {
            $("#page_container").html(casesListPageTemplate(result))
        }
    })
}


