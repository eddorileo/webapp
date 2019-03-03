const default_tags = [
    
    {   "tag_id" : "approved",
        "tag_label" : "Aprovado",
        "colour" : "79E524",
        "state" : "default"
    },
    {
        "tag_id" : "unapproved",
        "tag_label" : "Desaprovado",
        "colour":"F2CD13",
        "state" : "default"
    },
    {
        "tag_id" : "investigate",
        "tag_label" : "Investigar",
        "colour" : "24E590",
        "state" : "default"
    },
    {
        "tag_id" : "followup",
        "tag_label" : "Seguir",
        "colour" : "DB6B06",
        "state" : "default"
    },
    {
        "tag_id" : "trash",
        "tag_label" : "Lixo",
        "colour" : "FF1414",
        "state" : "default"
    }
]

function getListTags(list_id){
    apiCall({
        method:'GET',
        endpoint:'/list/'+list_id+'/tag',
        postAction: {action: "nothing"},
        callback: function(result) {
            var tagsHTML = tagPageTemplate(result.list,result.tags)
            $("#page_container").html(tagsHTML)
            $('#tagtable').append(tagTableTemplate(result.tags))
            $("#pagination_container").html("")


            $(".deleteTag").click( function(event) {
                event.preventDefault()
             
                var tag_id = $(event.target).attr("data-tag_id")
                apiCall({
                    method:'DELETE',
                    endpoint:'/list/'+list_id+'/tag/'+tag_id,
                    postAction: {action: "hide", e: document.getElementById('tagrow'+tag_id)}
                })
            })
            $("#newTagButton").click(function(event) {
                $('#tagtable').append(tagTableTemplate([{
                    tag_id: "new",
                    tag_label: "Novo R&oacute;tulo",
                    "colour": "ffffff",
                    "state": "live"
                }]))
                apiCall({
                    method:'POST',
                    endpoint:'/list/'+list_id+'/tag',
                    body: {
                        tag_label: "Novo R&oacute;tulo",
                        "colour": getRandomColor(),
                        "state": "live"
                    },
                    postAction: {action: "none"},
                    callback: function(result) {
                        getListTags(list_id)
                    }
                })
            })
            $(".listLabelField").focusout(function(event){
     
                var tag_id = $(event.target).attr("data-tag_id")
                var value = $(event.target).val()
                patchTagAttribute(list_id,tag_id,"tag_label",value)
            })
            $("input[type=color]").change(function(event){
               
                var tag_id = $(event.target).attr("data-tag_id")
                var value = $(event.target).val()
                patchTagAttribute(list_id,tag_id,"colour",value)
            })
            $(".listStateField").change(function(event){
        
                var value = $(event.target).val()
                var tag_id = $(event.target).attr("data-tag_id")
                patchTagAttribute(list_id,tag_id,"state",value)
            })
        }
    })
}

function patchTagAttribute(list_id,tag_id,attribute,value){
    $("#pagination_container").html("<center><img src=\"/images/loading.gif\"></center>")
    var body = {
        "update": [
            
        ]
    }
    body.update[0] = {
        tag_id
    }
    body.update[0][attribute] = value
    apiCall({
        method:'PATCH',
        endpoint:'/list/'+list_id+'/tag/'+tag_id,
        body: body,
        postAction: {action: "none"},
        callback: function(result){
            $("#pagination_container").html("")
        }
    })
}

function showDefaultTags(){
    $('#tagtable').append(tagTableTemplate(default_tags))
    $(".deleteTag").click( function(event) {
        event.preventDefault()
     
        var tag_id = $(event.target).attr("data-tag_id")
        apiCall({
          
            method:'DELETE',
            endpoint:'/list/'+list_id+'/tag/'+tag_id,
            postAction: {action: "hide", e: document.getElementById('tagrow'+tag_id)}
        })
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }