const metric_types = {
    string: {
        sort: {
            asc: "A para Z",
            desc: "Z para A"
        },
        operators: [
            {
                operator: "cont",
                label: "Cont&eacute;m"
            },
            {
                operator: "ncont",
                label: "N&atilde;o cont&eacute;m"
            }
        ]
    },
    number: {
        sort: {
            asc: "Crescente",
            desc: "Decrescente"
        },
        operators: [
            {
                operator: "eql",
                label: "Igual a "
            },
            {
                operator: "ne",
                label: "Diferente de "
            },
            {
                operator: "lt",
                label: "Menor que "
            },
            {
                operator: "gt",
                label: "Maior que "
            }
        ],

        value_fn: function (params,query_meta) {
            return {html: "<input class=\"valueInput form-control\" value=\""+params.value+"\" type=\"number\">"}
        }
    },
    date: {
        sort: {
            asc:"Primeiro ao &Uacute/ltimo",
            desc: "Tr&aacute;s pra Frente"
        },
        operators: [
            {
                operator: "between",
                label: "Entre"
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
            asc: "A parao Z",
            desc: "Z para A"
        },
        operators: [
            {
                operator: "in",
                label: "Est&aacute; em"
            }
        ]
    },
    options: {
        sort: {
            
        },
        operators: [
            {
                operator: "opt",
                label: "&eacute;"
            }
        ]
    }
}

const metrics = {
    title: {
        metric: "title",
        label: "T&iacute;tulo da P&aacute;gina",
        type: "string",
        sortable: true
    },
    description: {
        metric: "description",
        label: "Descri&ccedil;&atilde;o da P&aacute;gina",
        type: "string",
        sortable: true
    },
   url: {
        metric: "url",
        label: "URL P&aacute;gina",
        type: "string",
        subtype: "url",
        sortable: true
    },
    host: {
        metric: "host",
        label: "Dom&iacute;nio",
        type: "string",
        subtype: "url",
        sortable: true
    }, 
    language: {
        metric: "language",
        label: "Idioma",
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
        label: "Dom&iacute;nio mais recente",
        type: "date",
        sortable: true
    },
    found_timestamp: {
        metric: "found_timestamp",
        label: "Resultado com data",
        type: "date",
        sortable: true
    },
    image_url: {
        metric: "image_url",
        label: "URL Imagem",
        type: "string",
        subtype: "url",
        sortable: false
    },
    image_width: {
        metric: "image_width",
        label: "Largura imagem",
        type: "number",
        sortable: true
    },
    image_height: {
        metric: "image_height",
        label: "Altura imagem",
        type: "number",
        sortable: true
    },
    image_width_on_page: {
        metric: "image_width_on_page",
        label: "Largura da imagem na P&aacute;gina",
        type: "number",
        sortable: true
    },
    image_height_on_page: {
        metric: "image_height_on_page",
        label: "Altura da imagem na P&aacute;gina",
        type: "number",
        sortable: true
    },
    verified: {
        metric: "verified",
        label: "Verificado",
        type: "list",
        sortable: true,
        value_fn: function(params,query_meta) {
            var html = "<select class=\"valueInput multiselect verifiedInput\" multiple=\"multiple\" ></select>"
            var callback = function(params,query_meta) {
                var selectedValues = getFilterValue(params,"verified-in", "object")
                var opts = [
                    {
                        key: "true",
                        value: "Encontrado"
                    },
                    {
                        key: "false",
                        value: "N&atilde;o encontrado"
                    },
                    {
                        key: "null",
                        value: "Ainda n&atilde;o checado"
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
        label: "P&aacute;gina com status verificado",
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
                        value: "Erro na P&aacute;gina"
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
        label: "R&oacute;tulo",
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
        label: "ID da imagem",
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