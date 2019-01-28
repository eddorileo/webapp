function renderListPage(params){
    $("#page_container").html(listsPageTemplate())
    listsPage(params)
}
function listsPage(params){
    window.history.pushState(params,"Lists - Infringment Report", "/list?start=0&rows="+params.rows)
    apiCall({
        method:'GET',
        endpoint:'/list?start='+params.start+'&rows='+params.rows,
        postAction: {action: "nothing"},
        callback: function(result) {
            if(typeof result == "object"){
                var listsHTML = listsTableTemplate(Object.values(result))
                $("#listInfoContainer").append(listsHTML)
                if(Object.keys(result).length == params.rows){
                    // number of returned rows = max page size, show pagination button
                    $("#pagination_container").html(
                        "<center><a href=\"#\" class=\"btn btn-medium\">Load more lists</a>"
                    )
                    $("#pagination_container a").click( function(event) {
                            event.preventDefault()
                            $("#pagination_container").html("<center><img src=\"/images/loading.gif\"></center>")
                            listsPage({start: (Number(params.start) + Number(params.rows)),rows: params.rows})
                        }
                    )
                }else{
                    $("#pagination_container").html(
                        ""
                    )
                }
            }else{
                handleAPIError({error: "An unknown error occured: The lists object was not an object. Please contact support for more info."})
            }

        }
    })
} 

