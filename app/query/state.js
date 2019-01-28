
function getState(){
    var state = {
        filters: {}
    }
    var urlParams = new URLSearchParams(window.location.search);
    var entries = urlParams.entries();
    for(pair of entries) { 

        var key = "", value = ""

        if(pair[0].substring(0,7) == "filters"){
            key = pair[0].substring(8,pair[0].length-1)
            value = pair[1]
            var is_list_metric = (key.split("-")[1] == "in")
            var has_multiple_values = (value.indexOf(",") >= 0)
            if(is_list_metric && has_multiple_values){
                value = value.split(",")
            }else{
                value = decodeURIComponent(value) 
            }
            state.filters[key] = value
        }else if(pair[0].substring(0,7) == "filter["){
            // don't add this to the thing
            key = pair[0].substring(7,pair[0].length-1).replace("_c_text","")
            value = pair[1].replace("filter[","filters[")
            var is_list_metric = (key.split("-")[1] == "in")
            var has_multiple_values = (value.indexOf(",") >= 0)
            if(is_list_metric && has_multiple_values){
                value = value.split(",")
            }else{
                value = decodeURIComponent(value) 
            }
            state.filters[key] = value
        }else if(pair[0].substring(0,3) == "tag"){
            key = pair[0].substring(4,pair[0].length-1)
            value = pair[1]
            state.tag = {}
            state.tag[key] = value
        }else{
            key = pair[0]
            value = pair[1]
            state[key] = decodeURIComponent(value)
        }
        
    }
    
    var stateDefaults = {
        start: 0,
        rows: 15,
        use_ignore_lists: true,
        sort: "found_timestamp asc"
    }
    Object.keys(stateDefaults).forEach(function (key) {
        if(!state[key]){
            state[key] = stateDefaults[key]
        }
    })
    return state
}

function setState(state,request){
    if(!request){
        var request = "append"
    }
    var fragments = []
    Object.keys(state).forEach(function(key) {
        switch(key){
            case "filters":
            case "tag":
                
                Object.keys(state[key]).forEach(function(v){
                    if(typeof v !== "undefined"){
                        fragments.push(key+"["+v+"]="+encodeURIComponent(state[key][v]))

                    }
                })
                
                
            break;
            default:
                fragments.push(key+"="+encodeURIComponent(state[key]))
        }
    })
    window.history.pushState(state,"Results", "/list/"+list_id+"/query?"+fragments.join("&"))
    doRequest({state,list_id,request})
}

function updateStateAttributes(attr){
    var state = getState()
    Object.keys(attr).forEach(function(a){
        state[a] = attr[a]
    })
    state.start = 0
    setState(state,"initPage")
}
function updateStateAttribute(attr,value){
    var state = getState()
    state[attr] = value
    state.start = 0
    setState(state,"initPage")

}
function stateToQueryParams(params){
    var query_params = []
    
    Object.keys(params.state).forEach(function(key){
        switch(key){
            case "tag":
                query_params.push(key+"["+Object.keys(params.state[key])[0]+"]"+"="+params.state[key][Object.keys(params.state[key])[0]])
            break;
            case "filter":
            case "filters":
                if(Object.keys(params.state[key]).length > 0){
                    Object.keys(params.state[key]).forEach(function(metric){
                        query_params.push("filter["+metric+"]"+"="+params.state[key][metric])
                    })
                    
                }
            break;
            default:
                query_params.push(key+"="+encodeURIComponent(params.state[key]))
        }
    })
    return query_params
}

