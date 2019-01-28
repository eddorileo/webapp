function appendTagStyles(tags){
    var style_content = []
    tags.forEach(function(tag){
        style_content.push(
            ".tag-"+tag.tag_id+" { border: 1px #"+tag.colour+" solid; background: #ffffff;}"
        )
        style_content.push(
            ".tag-"+tag.tag_id+".active, .tag-"+tag.tag_id+":hover { color: #ffffff; background: #"+tag.colour+"; }"
        )
    })
    $("head").append("<style>"+style_content.join("\n")+"</style>")
}

