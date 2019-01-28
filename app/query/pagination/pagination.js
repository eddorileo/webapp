
function handlePaging(params){
    
    var pagination_element = "", page_link_text = "", page_start = 0
    var request_action = ""
    switch(params.request){
        case "append":
        case "initPage":
            pagination_element = "#append_pagination_container"
            page_link_text = "<center><a href=\"#\" class=\"btn btn-medium\">Load More Results</a></center>"
            page_start = Number(params.state.start)+Number(params.state.rows)
            page_rows = Number(params.state.rows)
            request_action = "append"
        break;
        case "prepend":
            pagination_element = "#prepend_pagination_container"
            page_link_text = "<center><a href=\"#\" class=\"btn btn-medium\">Load Earlier Results</a></center>"
            if((Number(params.state.start)-Number(params.state.rows)) >= 0){
                page_start = Number(params.state.start)-Number(params.state.rows)
                page_rows = Number(params.state.rows)
            }else if(Number(params.state.start) == 0){
                page_start = Number(params.state.start)-Number(params.state.rows)
                page_rows = Number(params.state.rows)
                pagination_element = "#prepend_pagination_container"
                page_link_text = ""
            }else{
                page_start = 0
                page_rows = Number(params.state.start)
            }
            request_action = "prepend"
        break;
    }

    $(pagination_element).html(
        page_link_text
    )
    $(pagination_element+ " a").click( 
        function(event) {
            event.preventDefault()
            $(pagination_element).html(stateLoadingHTML)

            var state = getState()
            state.start = page_start
            state.rows = page_rows

            setState(state,request_action)
        })
}

