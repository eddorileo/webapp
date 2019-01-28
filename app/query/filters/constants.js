const metric_types = {
    string: {
        sort: {
            asc: "A to Z",
            desc: "Z to A"
        },
        operators: [
            {
                operator: "cont",
                label: "Contains"
            },
            {
                operator: "ncont",
                label: "Does not contain"
            }
        ]
    },
    number: {
        sort: {
            asc: "Low to High",
            desc: "High to Low"
        },
        operators: [
            {
                operator: "eql",
                label: "Equals"
            },
            {
                operator: "ne",
                label: "Does not equal"
            },
            {
                operator: "lt",
                label: "Less than"
            },
            {
                operator: "gt",
                label: "Greater than"
            }
        ],

        value_fn: function (params,query_meta) {
            return {html: "<input class=\"valueInput form-control\" value=\""+params.value+"\" type=\"number\">"}
        }
    },
    date: {
        sort: {
            asc:"First to Last",
            desc: "Last to First"
        },
        operators: [
            {
                operator: "between",
                label: "Between"
            }
        ],
        value_fn: function(params,query_meta) {
            return {
                html: "<input class=\"valueInput daterange form-control\" name=\"filters[value][]\" value=\""+params.value+"\"  type=\"text\">",
                callback: function(params,query_meta) { 
                    
                    var today = new Date();
                    var dateopt = {
                        "showWeekNumbers": true,
                        "autoApply": true,
                        "ranges": {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        "alwaysShowCalendars": true,
                        "startDate": moment().subtract(7, 'days'),
                        "endDate": moment(),
                        locale: {
                            separator: " TO "
                        }
                    }
                    if(params.value){
                        var timezoneoffset = today.getTimezoneOffset()*60000
                        var dateoa = params.value.split(" TO ")[0]
                        var dateob = params.value.split(" TO ")[1]
                        var datepa = Date.parse(dateoa)+timezoneoffset
                        var datepb = Date.parse(dateob)+timezoneoffset
                        var datea = new Date(datepa)
                        var dateb = new Date(datepb)

                        dateopt.startDate = (datea.getMonth()+1)+"/"+datea.getDate()+"/"+datea.getFullYear()
                        dateopt.endDate = (dateb.getMonth()+1)+"/"+dateb.getDate()+"/"+dateb.getFullYear()
                    }
                    $('.daterange').daterangepicker(dateopt);
                }
            }
        }
    },
    list: {
        sort: {
            asc: "A to Z",
            desc: "Z to A"
        },
        operators: [
            {
                operator: "in",
                label: "Is in"
            }
        ]
    },
    options: {
        sort: {
            
        },
        operators: [
            {
                operator: "opt",
                label: "Is"
            }
        ]
    }
}

const metrics = {
    title: {
        metric: "title",
        label: "Page Title",
        type: "string",
        sortable: true
    },
    description: {
        metric: "description",
        label: "Page Description",
        type: "string",
        sortable: true
    },
   url: {
        metric: "url",
        label: "Page URL",
        type: "string",
        subtype: "url",
        sortable: true
    },
    host: {
        metric: "host",
        label: "Domain",
        type: "string",
        subtype: "url",
        sortable: true
    }, 
    language: {
        metric: "language",
        label: "Language",
        type: "list",
        sortable: true,
        value_fn: function(params,query_meta)  {
            var html = "<select class=\"valueInput multiselect languageInput\" multiple=\"multiple\"></select>"
            var callback = function(params,query_meta) {
                var selectedValues = getFilterValue(params,"language-in", "object")
                var languages = convertSolrFacetToObject(query_meta.facets.facet_fields.language)
                Object.keys(languages).forEach( function(lang) {
                    if(lang != "undefined"){
                        var lang_count = languages[lang]
                        
                        $(".languageInput").append(`<option value="${lang}" ${(($.inArray(lang, selectedValues) !== -1 ) ? "selected" : "" )}>${languageCodeToLanguage(lang)} (${lang_count})</option>`)
    
                    }

                })
                $('.multiselect').multiselect();
            }
            return {
                html,
                callback
            }
            
        }
    },
    host_first_found: {
        metric: "host_first_found",
        label: "Domain First Found Date",
        type: "date",
        sortable: true
    },
    found_timestamp: {
        metric: "found_timestamp",
        label: "Result Found Date",
        type: "date",
        sortable: true
    },
    image_url: {
        metric: "image_url",
        label: "Image URL",
        type: "string",
        subtype: "url",
        sortable: false
    },
    image_width: {
        metric: "image_width",
        label: "Image Width",
        type: "number",
        sortable: true
    },
    image_height: {
        metric: "image_height",
        label: "Image Height",
        type: "number",
        sortable: true
    },
    image_width_on_page: {
        metric: "image_width_on_page",
        label: "Image Width on Page",
        type: "number",
        sortable: true
    },
    image_height_on_page: {
        metric: "image_height_on_page",
        label: "Image Height on Page",
        type: "number",
        sortable: true
    },
    verified: {
        metric: "verified",
        label: "Verified",
        type: "list",
        sortable: true,
        value_fn: function(params,query_meta) {
            var html = "<select class=\"valueInput multiselect verifiedInput\" multiple=\"multiple\" ></select>"
            var callback = function(params,query_meta) {
                var selectedValues = getFilterValue(params,"verified-in", "object")
                var opts = [
                    {
                        key: "true",
                        value: "Found"
                    },
                    {
                        key: "false",
                        value: "Not Found"
                    },
                    {
                        key: "null",
                        value: "Not Checked Yet"
                    },
                ]
                opts.forEach(function(opt) {
                    $(".verifiedInput").append(`<option value="${opt.key}" ${((selectedValues[opt.key]) ? "selected" : "" )}>${opt.value}</option>`)
                })

                $('.multiselect').multiselect();
            }
           return {
               html,
               callback
           }
        }
    },
    verified_status_code: {
        metric: "verified_status_code",
        label: "Verified Page Status",
        type: "options",
        sortable: false,
        value_fn: function(params,query_meta) {
            var html = "<select class=\"valueInput verifiedStatusCodeInput\"  ></select>"
            var selectedValues = getFilterValue(params,"verified_status_code-opt", "object")
            var callback = function(params,query_meta) {
                var opts = [
                    {
                        key: "online",
                        value: "Online"
                    },
                    {
                        key: "error",
                        value: "Error Page"
                    },
                    {
                        key: "offline",
                        value: "Offline"
                    },
                ]
                opts.forEach(function(opt) {
                    $(".verifiedStatusCodeInput").append(`<option value="${opt.key}" ${((selectedValues[opt.key]) ? "selected" : "" )}>${opt.value}</option>`)
                })

                $('.multiselect').multiselect();
            }
           return {
               html,
               callback
           }

           return {html, callback}
        }
    },
    tag: {
        metric: "tag",
        label: "Tag",
        type: "list",
        sortable: false,
        value_fn: function(params,query_meta)  {
  
            var html = "<select class=\"valueInput multiselect tagInput\" multiple=\"multiple\"></select>"
            var callback = function(params,query_meta) {
 
                var selectedValues = getFilterValue(params,"tag-in", "object")
                var tag_data = convertSolrFacetToObject(query_meta.facets.facet_fields.tag)
                query_meta.resolved_tags.forEach( function(tag) {
          
                    $(".tagInput").append(`<option value="${tag.tag_id}" ${(($.inArray(tag.tag_id, selectedValues) !== -1 ) ? "selected" : "" )}>${tag.tag_label} (${tag_data[tag.tag_id]})</option>`)

                    
                    
                })
                $('.multiselect').multiselect();
            }
            return {
                html,
                callback
            }
            
        }
    },
    image_id: {
        metric: "image_id",
        label: "Image ID",
        type: "number",
        sortable: true
    }
}

function getFilterValue(params,filter_key, type){
    var ret 
    if(params.state.filters[filter_key]){
        if(typeof params.state.filters[filter_key] == "string" && type == "object"){
            if(params.state.filters[filter_key].indexOf(",") > -1){
                ret = params.state.filters[filter_key].split(",")
            }else{
                ret =[params.state.filters[filter_key]]
            }
        }else{
            ret = params.state.filters[filter_key]
        }
        return ret
    }else{
        switch(type){
            case "object":
                return {}
            break;
            case "array": 
                return []
            break;
            case "string":
                return ""
            break;
            case "number":
                return 0
            break;
        }
    }
}