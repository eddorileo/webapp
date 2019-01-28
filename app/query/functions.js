function doRequest(params){
    if(!params.state){
        params.state = getState()
    }
    var query_params = stateToQueryParams(params)
    query_params.push("group_by=host")
    query_params.push("date_range=host_first_found")
    query_params.push("facet=tag")
    if(params.request && params.request == "initPage"){
        if($(".panel-result-header")){
            $(".panel-result-header").html(stateLoadingHTML)
        }
    }
    var api_url = '/list/'+list_id+'/query?extend_thumbnails=true&'+query_params.join("&")


    api_params = {
        
        method:'GET',
        endpoint:api_url,
        postAction: {action: "nothing"},
        callback: function(result) {
            if(!result.query_result){
                handleAPIError({error: "An error occurred while attempting to load these results. This is likely due to the filters you have chosen, but has been logged and will be investigated."},{})
            }else{
                processResponse(params,result)
                $("#apiquery").val("https://api.infringement.report/3.0"+api_url)
            }

        }
    }
    
    apiCall(api_params)
}

function processResponse(params,result){
    if(params.request && params.request == "initPage"){
        purgeAdditional()
        var query_meta =  Object.assign({}, result, {result: {}}); 
        var resolved_tags = resolveTags(result,params.state)
        appendTagStyles(resolved_tags.tags)
        var queryPage = queryPageTemplate(result,params,resolved_tags)
        $("#page_container").html(queryPage)

        createFiltersFromState(params.state,query_meta)
        initChart(result)
        
    }
    addResultsToPage(params,result)
 
    $(".tag-select").click(function (event) {
        event.preventDefault()
        var tag_id = $(event.target).attr("data-tag_id")
        selectTag(tag_id,resolved_tags)
    }) 
    

}
function addResultsToPage(params,result){
   
    switch(params.request){
        case "append":
            var relevant_pagination_container = "#append_pagination_container"
            var opposite_pagination = "prepend"
            var jquery_remove_query = "lt("
        break;
        case "prepend":
            var relevant_pagination_container = "#prepend_pagination_container"
            var opposite_pagination = "append"
            var jquery_remove_query = "gt(-"
        break;
 
    }
    var number_of_new_rows = Object.keys(result.query_result.groups).length
    
    // maintain max of 300 results on page
    if($(".panel-result-content article").length >= 300){
        $('.panel-result-content').find("article:"+jquery_remove_query+(number_of_new_rows+1)+")").remove();
        handlePaging(Object.assign({}, params, {request:opposite_pagination}))
        
    }
    var newResultHtml = queryResultTemplate(result)
     if(params.request == "prepend"){
        $(".panel-result-content").prepend(newResultHtml)
    }else{
        $(".panel-result-content").append(newResultHtml)
    }
    
    setImageEvents()
    setClickEvents(result)
    $("#settingsArea").hide()
    if( (params.request == "initPage" && params.state.start > 0)){
        handlePaging(Object.assign({}, params, {request: "prepend"})) 
    }
    if(number_of_new_rows == params.state.rows){
        handlePaging(params)
    }else{
        $(relevant_pagination_container).html( "" )
    }


}
function initPage(){
    doRequest({request: "initPage"})
    
}

function setImageEvents(){
    $("img").unveil()
    $('img').error(function(e){
        $(this).attr('src', '/templates/infringementreport/app/query/image-not-loaded.png');
    });
}

function setClickEvents(result){
    click(".ignoreDomain", function(event){
        var host = $(event.target).attr("data-host")
        console.log("Host is ",host)
        if(host != null){
            ignoreDomain(host)
        }
        
    })

    click(".additional_rows", function(event){
        var host = $(event.target).attr("data-host")
        var addData = getAdditional(host)
        var html = additionalResultTemplate(addData,result.resolved_tags)
        $("article[data-host='"+host+"']").append(html)
        $("article[data-host='"+host+"'] a.additional_rows").hide()
        $("article[data-host='"+host+"'] a.additional_rows_alt").show()
        setImageEvents()
        setClickEvents(result)
    })
    click(".additional_rows_alt", function(event){
        var host = $(event.target).attr("data-host")
        $("article[data-host='"+host+"'] table").remove()
        $("article[data-host='"+host+"'] a.additional_rows").show()
        $("article[data-host='"+host+"'] a.additional_rows_alt").hide()
    })

    click(".setTag",function(event){
        var result_id = $(event.target).attr("data-result_id"),
        tag_id = $(event.target).attr("data-tag_id")
        host = $(event.target).attr("data-host")
        hostTag({host,result_id,tag: tag_id,resolved_tags:result.resolved_tags})
    })

    click("#exportToCSV",function(event){
        exportToCSV()
    })
    click("#select-none",function(event){
        $('.result-check').prop('checked', false);
        resultChecked();
    })
    click("#select-all-page",function(event){
        $('.result-check').prop('checked', true);
        resultChecked();
    })
    click("#select-all",function(event){
        selectAll('query');
    })
    click("#toggleSettings",function(event){
        $("#settingsArea").toggle()
    })
    click("#applySettings",function(event){
        var updateState = {
            rows: $("#rowsSelect").val(),
            sort: $("#sortSelect").val(),
            use_ignore_lists: $("#use_ignore_listsSelect").val()
        }

        updateStateAttributes(updateState)
    })

    click("#showAPI",function(event){

        $(event.target).hide()
        $("#apiquery").show()
    })
    resultChecked()
}

