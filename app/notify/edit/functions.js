
function initPage(){
    apiCall({
        method:'GET', 
        endpoint:'/notify/'+notify_id,
        postAction: {action: "nothing"},
        callback: function(notify) {
            apiCall({
                method:'GET',
                endpoint:'/list?per_page=100',
                postAction: {action: "nothing"},
                callback: function(all_lists) {
                    Object.keys(notify.list_id).forEach(function(i){
                        if(notify.list_id[i] != "all"){
                            notify.list_id[i] = parseInt(notify.list_id[i]) 
                        }
                    })
                    $("#page_container").html(notifyEditPageTemplate({notify,all_lists: Object.values(all_lists)}))
                    $("#list_sel").change(listSelect)
                    $("select[name='type']").change(function(event){
                        var val = $("select[name='type']").val()
                        switch(val){
                            case "email":
                                $("#email_url_label").text("Email address")
                                $("input[name='endpoint']").attr("placeholder","email@domain.com")
                                $("select[name='format']").val("htmlsummary")
                            break;
                            case "postback":
                                $("#email_url_label").text("Postback URL")
                                $("input[name='endpoint']").attr("placeholder","https://api.domain.com/infringement/hook")
                                $("select[name='format']").val("jsonfull")
                            break;
                        } 
                    }) 
                    $("#advancedNotify").hide()
                    listSelect()
                    click("#saveNotify",saveNotify) 
                    click("#advancedNotifyLink",function(event){
                        $("#advancedNotify").show()
                    }) 
                }
            })
            
        }
    })
}

function listSelect(){
    var sel = $("#list_sel")
    var list = $('#list_span')
    if($(sel).val() == "all"){
        $(list).hide()
        $('#all_list_checkbox').prop('checked', true);
        $("#each_list_span").html("<input type=text class='form-control' name=\"list_id[]\" value=\"all\">");
    }else{
        $(list).show()
    }
}

function saveNotify(){

    var list_ids = []

    $.each($("input[type=checkbox].list_id:checked"),function(i, v){
        var temp_val = $(v).attr("data-list_id")
        if(temp_val != "all"){
            temp_val =parseInt($(v).attr("data-list_id"))
        }
        list_ids.push(temp_val)
    })
    var params = {
        method: (notify_id == "new") ? "POST" : "PATCH",
        body: {
            list_id: list_ids,
            filter_string: "", // no one used for a year, so killing this feature 
            schedule: $('input[name=schedule]:checked').val(),
            type: $("select[name='type']").val(),
            endpoint: $("input[name='endpoint']").val(),
            format: $("select[name='format']").val()
        }
    }

     
    apiCall({
        loadingFeedback: true,
        method: params.method,
        endpoint:'/notify/'+notify_id,
        body: params.body,
        postAction:{action: 'none'},
        callback: function (result){
            if(notify_id == "new"){
                window.location = "/notify/"+result.notify_id
            }else{
                initPage()
            }
        }    
    })

    
}

// init