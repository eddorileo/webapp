function newFilterInputs(params,query_meta){
    if(params.blank){
        params = {
            metric: "title",
            state: {
                filters: {}
            }
        }
    }
    var metric = populateMetricField(params,query_meta),
        operator = populateOperatorField(params,query_meta),
        value = populateValueField(params,query_meta)
    $("#filters").append(`<div class="row filter_container" style="margin-right: 0px!important">
            <div class="col-xs-3 col-md-3 metric_container">
                ${metric.html}
            </div> <!-- col -->

            <div class="col-xs-2 col-md-2 operator_container" >
                ${operator.html}
            </div> <!-- cell -->

            <div class="col-xs-5 col-md-5 value_container">
                ${value.html}
            </div> <!-- cell -->

            <div class="col-xs-2 col-md-2">
                <div class="btn-action-group">
                    <a href="#" class="btn trash"><i class="icon icon-trash"></i></a>
                    <a href="#" class="btn add"><i class="icon icon-add"></i></a>
                    <a href="#" class="btn search"><i class="icon icon-search"></i></a>
                </div> <!-- btn action group -->
            </div> <!-- col -->
        </div> <!--  row -->`)
    if(metric.callback){
        metric.callback(params,query_meta)
    }
    if(operator.callback){
        operator.callback(params,query_meta)
    }
    if(value.callback){
        value.callback(params,query_meta)
    }
    $('#filters .filter_container:last a.add').click(function(event) {
        event.preventDefault()
        newFilterInputs({blank: true},query_meta)
    })
    $('#filters a.trash').click(function(event){
        event.preventDefault()
        removeFilter(event,query_meta)
    }) 
    $('#filters .filter_container:last a.search').click(function(event)  {
        event.preventDefault()
        var state = createStateFromFilters()
        setState(state,"initPage")
    })
    resetFilterControls()

}

function resetFilterControls(){
    $('#filters div.btn-action-group').find('a.search,a.add').hide()
    $('#filters').find('.row:last-child').find('a.search,a.add').show()
}

function createFiltersFromState(state,query_meta){
    if(state.filters && Object.keys(state.filters).length >0){
        Object.keys(state.filters).forEach(function(key){
            var key_split = key.split("-"),
                metric = key_split[0],
                operator = key_split[1],
                value = state.filters[key]
            newFilterInputs({metric,operator,value,state},query_meta)
        })
    }else if (state.filters && Object.keys(state.filters).length == 0){
        newFilterInputs({blank: true},query_meta)
    }
}

function createStateFromFilters(){

    var state = getState()
    var filters = $("#filters")
    var each_filter = $(filters).find($(".filter_container"))

    var newFilters = {}
    $(each_filter).each(function(index){

        var metric = $(this).find($(".metricInput")).val()

        var operator = $(this).find($(".operatorInput")).val()
        
        if($(this).find($(".valueInput.multiselect")).length>0){
            var value = $(this).find($(".valueInput.multiselect")).val().join(",")

        }else{
            var value = $(this).find($(".valueInput")).val()
        }
        if(value.length > 0){
            newFilters[metric+"-"+operator] = value
        }
    } );
    state.filters = newFilters
    state.start = 0
    return state
}

function removeFilter(e,query_meta){
    $(e.target).parents( ".filter_container" ).remove()
    if($('.filter_container').length===0){
        newFilterInputs({blank: true},query_meta)
    }
    resetFilterControls()

}

function addFilterSetState(metric,operator,value){
    var state = getState()
    var temp = {}

    temp[metric+"-"+operator] = value
    if(state.filters[metric+"-"+operator]){
        delete state.filters[metric+"-"+operator]
    }
    state.filters = Object.assign({}, temp, state.filters);
    state.start = 0
    setState(state,"initPage")

}