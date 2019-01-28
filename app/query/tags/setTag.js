var bulkAction = "selected"
function hostTag(params){
    if(params.result_id == "bulk"){
        setTag({result_id:params.result_id,tag:params.tag,resolved_tags:params.resolved_tags})
    }else{
        setTag({result_id:params.result_id,tag:params.tag,bulkAction:'single',resolved_tags:params.resolved_tags})

        var newHTML = "<p><strong>Tag saved.</strong> Apply this tag to:<br><ul class=\"tags-list inline\">";
    
    
        newHTML += "<li><a href=\"#\" class=\" tag tag-success\">All "+params.host+" Results</a></li> "
        newHTML += "<li><a href=\"#\" class=\" tag tag-danger\">This result only</a></li></ul> </P>"
        $('#'+params.result_id+'-tagfollowup').html(newHTML)
        $('#'+params.result_id+'-thetags').hide();
        $('#'+params.result_id+'-tagfollowup').show();
        $('#'+params.result_id+'-tagfollowup').find($(".tag-success")).click(function(event){
            event.preventDefault()
            setTag({
                result_id:'bulk',
                tag:params.tag,
                bulkAction:'query',
                q:'host:'+params.host,
                q_behaviour:'overwrite',
                resolved_tags:params.resolved_tags
            });
            $("#"+params.result_id+"-thetags").show();
            $("#"+params.result_id+"-tagfollowup").hide();
        })
        $('#'+params.result_id+'-tagfollowup').find($(".tag-danger")).click(function(event){
            event.preventDefault()
            $("#"+params.result_id+"-thetags").show();
            $("#"+params.result_id+"-tagfollowup").hide();
        })
    
    }
   
}
function setTag(params){

    if (typeof params.bulkAction == 'undefined'){
        params.bulkAction = bulkAction
    }
    var removeAll = false
    var apiTag = params.tag
    if($( '#'+params.result_id+'-'+params.tag ).hasClass( "active" )){
        apiTag = ""
        removeAll = true
    }
    postData = { "tag": apiTag }
    if(params.result_id == "bulk"){
        if(params.bulkAction == "selected"){
            postData.result_ids  = []
            $('.result-check:checked').each(function(){
                postData.result_ids.push($(this).attr("data-id"));
            });
            
        }else if(params.bulkAction == "query"){
            if(params.q && params.q_behaviour == "overwrite"){
                postData.q = params.q
            }
            postData.list_id = list_id        
        }
        

    }
    apiCall({
        method:'PATCH',
        endpoint:'/result/'+params.result_id,
        body: postData,
        postAction: {action: "nothing"},
        callback: function(data) {
            $('#'+params.result_id+'-'+params.tag).parent().parent().find('a.tag').removeClass('active');
            $('#'+params.result_id+'-'+params.tag).removeClass('active');
            if(removeAll === false){
                if(params.result_id != "bulk"){
                    
                    $('#'+params.result_id+'-'+params.tag).addClass('active');
                    
                    $('#'+params.result_id+'-tagicon').attr('src','https://png.icons8.com/ios/24/'+getTagColour(params.tag,params.resolved_tags)+'/price-tag-filled.png')
                }else{
                    data.request.result_ids.forEach(function(result_id){
                        $('#'+result_id+'-tagicon').attr('src','https://png.icons8.com/ios/24/'+getTagColour(params.tag,params.resolved_tags)+'/price-tag-filled.png')
                        $('#'+result_id+'-'+params.tag).closest('ul').find('a.tag').removeClass('active');
                        $('#'+result_id+'-'+params.tag).addClass('active');
                    })
                }
                
            }
        }
    })
    
}

function getTagColour(tag_id,resolved_tags){
    Object.keys(resolved_tags).forEach(function(tag){
        if(tag.tag_id == tag_id){
            return tag
        }
    })
}