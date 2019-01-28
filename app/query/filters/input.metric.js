function populateMetricField(params,query_meta){
    var html = `<select class="metricInput filterfield">`
    Object.values(metrics).forEach(function(v){
        html += `<option 
            value="${v.metric}" 
            data-type="${v.type}"
            ${((params.metric && params.metric == v.metric) ? "selected=selected" : "")}>${v.label}</option>`
    })
    html += `</select>`
    var callback = function(params,query_meta)  {
        $("select.metricInput").change(function(event) {
            defaultMetricOnClick(event,query_meta)
        })
    }
    return {html, callback}
    
}

function defaultMetricOnClick(event,query_meta){

    event.preventDefault()
    var metric = $(event.target).val()
    var params = {metric,state: getState()}
    
    var operator = populateOperatorField(params,query_meta)
    var value = populateValueField(params,query_meta)
    var this_container = $(event.target).closest(".filter_container")
    $(this_container).find($(".operator_container")).html(operator.html)
    $(this_container).find($(".value_container")).html(value.html)
    if(operator.callback){
        operator.callback(params,query_meta)
    }
    if(value.callback){
        value.callback(params,query_meta)
    }
}
