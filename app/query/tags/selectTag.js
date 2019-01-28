function selectTag(tag_id,resolved_tags){
    var state = getState()
    switch(tag_id){
        case "all":
            delete state.tag
        break;
        case "untagged":
            var untagged_arr = []
            
            resolved_tags.tags.forEach(function(res){
        
                untagged_arr.push(res.tag_id)
            })
            state.tag = {ne: '("'+untagged_arr.join('" OR "')+'")'}
        break;
        default:
            state.tag = {eql: tag_id}
    }
    state.start = 0
    setState(state,"initPage")
}
