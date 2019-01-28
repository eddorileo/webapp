
function getListTags(list_id){
    apiCall({
        method:'GET',
        endpoint:'/tag',
        postAction: {action: "nothing"},
        callback: function(result) {
            var tagsHTML = tagPageTemplate()
            $("#page_container").html(tagsHTML)
            $('#mainTagList').append(tagTableTemplate(result))
            $("#pagination_container").html("")


        }
    })
}