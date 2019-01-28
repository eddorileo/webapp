function defaultOperatorField(params,query_meta){
    var HTML = `<select class="operatorInput filterfield">`
    metric_types[metrics[params.metric].type].operators.forEach(function(v){
        HTML += `<option 
            value="${v.operator}" 
            ${((params.operator && params.operator == v.operator) ? "selected=selected" : "")}>${v.label}</option>`
    })
    HTML += `</select>`
    return {html: HTML}
}

function populateOperatorField(params,query_meta){
    var operator_html = "",
        metric_has_specific_operator = metrics[params.metric].hasOwnProperty("operator_fn"),
        metric_has_type_operator = metric_types[metrics[params.metric].type].hasOwnProperty("operator_fn")

    if(metric_has_specific_operator){
        operator_html = metrics[params.metric].operator_fn(params,query_meta)
    }else if(metric_has_type_operator){
        operator_html = metric_types[metrics[params.metric].type].operator_fn(params,query_meta)
    }else{
        operator_html = defaultOperatorField(params,query_meta)
    }

    return operator_html
}