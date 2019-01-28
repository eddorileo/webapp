function defaultValueField(params,query_meta){
    return {html: `<input class="valueInput form-control" value="${((params.value) ? params.value : "" )}" type="text">`}
}
function populateValueField(params,query_meta){
    var value_html = "",
        metric_has_specific_value = metrics[params.metric].hasOwnProperty("value_fn"),
        metric_has_type_value = metric_types[metrics[params.metric].type].hasOwnProperty("value_fn")
    if(metric_has_specific_value){
        value_html = metrics[params.metric].value_fn(params,query_meta)
    }else if(metric_has_type_value){
        value_html = metric_types[metrics[params.metric].type].value_fn(params,query_meta)
    }else{
        value_html = defaultValueField(params,query_meta)
    }

    return value_html
}