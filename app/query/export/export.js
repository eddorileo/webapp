function exportToCSV(){
    var state = getState()
    delete state.tag
    delete state.group_by
    delete state.date_range
    delete state.facet
    state.start = 0
    state.rows = 10000000
    state.output = "csv"
    state.api_key = loggedIn().apikey
    var query_params = stateToQueryParams({state})
    var url = "https://api.infringement.report/2.0/list/"+list_id+"/query?"+query_params.join("&")
    console.log(url)
    window.location = url
}