

function ignoreDomain(host){
    apiCall({
        method:'PATCH',
        endpoint:'/list/'+list_id+"/ignore",
        body: { add: [host] },
        postAction: {action: "nothing"},
        callback: function(data) {
            $("article[data-host='"+host+"']").remove()
            removeAdditional(host)
        }
    })
}