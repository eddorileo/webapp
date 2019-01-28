function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/list/'+list_id+'/ignore',
        postAction: {action: "nothing"},
        callback: function(result) {
            $("#page_container").html(ignoreEditPageTemplate(result))
            click(".deleteIgnoredDomain",function(event){
                deleteIgnoredDomain(event.target)
            })
            click("#addLsvDomainsButton",function (event){
                addLSVdomains()
            })
        }
    })
}


function deleteIgnoredDomain(element){
    var ignore_id = $(element).attr("data-ignore_id")
    apiCall({
        method:'DELETE',
        endpoint:'/list/'+list_id+'/ignore/'+ignore_id,
        postAction:{action: 'hide',e: element.parentNode}
    })
}

function addLSVdomains(){
    
    apiCall({
        method:'PATCH',
        endpoint:'/list/'+list_id+'/ignore',
        body: { add_lsv_urls: $("#lsv_domains").val() },
        postAction: {action: "nothing"},
        callback: function(result) {
            initPage()
        }
    })
}
