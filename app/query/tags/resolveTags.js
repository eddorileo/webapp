function resolveTags(result,state){
    var tags = result.resolved_tags.concat([{tag_id: "all", "tag_label": "Todos os Resultados", colour: "92999c"}])
    var all_tag_ids = tags.map(function(x) { return String(x["tag_id"])})
    var tags_found = convertSolrFacetToObject(result.facets.facet_fields.tag);
    tags_found["all"] = result.query_result.matches
    var known_tagged_count = 0
    Object.keys(tags_found).forEach(function(key)  {
        var known_tag = ($.inArray(key, all_tag_ids) !== -1 && key != "all") 
        if(known_tag){
            if(typeof tags_found[key] == "number"){
                known_tagged_count += tags_found[key]
            }
        }
    })
    var untagged_count = tags_found["all"] - known_tagged_count
    var selected_tag = "all"
    if(state.tag){
        const tag_operator = Object.keys(state.tag)[0]
        switch(tag_operator){
            case "eql":
                selected_tag = state.tag[tag_operator]
            break;
            case "ne":
                selected_tag = "untagged"
            break;
        }
    }
    return {tags,tags_found,untagged_count,selected_tag}
} 