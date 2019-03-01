function uploaderSelect(params){
    switch(params.method){
        case "url": 
        $('#uploader-container').html("<textarea id=\"add_lsv_urls\" placeholder=\"Image URLs (one per line)\" class=\"form-control\" style=\"width:100%;height: 270px;\" ></textarea><BR><button id=\"patchUrlList\" class=\"btn btn-medium\">Add Images</button>")
            $('#uploader-select').hide()
            $('#uploader-container').show()
            $("#patchUrlList").click(function(event){
                event.preventDefault()
                apiCall({
                    method:'PATCH',
                    endpoint:'/list/'+list_id,
                    body: { add_lsv_urls: $("#add_lsv_urls").val() },
                    postAction: {action: "nothing"},
                    callback: function(result) {
                        initPage()
                    }
                })
            })
            
            break;
        case "upload":
            $('#uploader-container').html("<div id=\"fine-uploader-gallery\" style=\"height:330px\"></div>")
            $('#fine-uploader-gallery').fineUploader({
                template: 'qq-template-gallery',
                request: {
                    endpoint: 'https://api.infringement.report/2.0/list/'+params.list_id+'/file/[filename]',
                    paramsInBody: false,
                    forceMultipart: false,
                    method: "PUT",
                    filenameParam: "filename",
                    customHeaders: {"x-api-key":loggedIn().apikey}
                },
                thumbnails: {
                    placeholders: {
                        waitingPath: '/images/fineuploader-waiting-generic.png',
                        notAvailablePath: '/images/fineuploader-not_available-generic.png'
                    }
                },
                validation: {
                    allowedExtensions: ['jpeg', 'jpg', 'gif', 'png', 'webp']
                },
                callbacks: {
                    onError: function(id, name, errorReason, xhrOrXdr) {
                        document.getElementById('messagebar').className = "alert alert-danger"
                        document.getElementById('messagebar').innerHTML = "<p>"+errorReason+"</p>"
                    },
                    
                    onAllComplete: function() {
                        initPage()
                    }
                }
            });
            $('#uploader-select').hide()
            $('#uploader-container').show()
            
        break;
        case "adobe":
            AdobeCreativeSDK.getAuthStatus(handleAuth);
        break;
    
    
    }
}

function initPage(){
    apiCall({
        method:'GET',
        endpoint:'/list/'+list_id+"?extend=infringements",
        postAction: {action: "nothing"},
        callback: function(list_data) {
        

            var credits = JSON.parse(localStorage.credits)
            
            $("#page_container").html(
                listsEditPageTemplate({credits})
            )
            setFromListData({field:"list_label", type: "text"},list_data)
            setFromListData({field:"monitor",type:"checkbox"},list_data)
            $('#uploader-select').show()
            $('#uploader-container').hide()
            if(list_data.count == 0){
                $("#addImagesButtonArea").hide()
                $("#addImagesArea").show()
            }else{
                $("#addImagesButtonArea").show()
                $("#addImagesArea").hide()
            }
            if(list_data.images){
                drawImages(list_data.images)
            }
            click("#chooseUrl",function(event){
                uploaderSelect({method:'url',list_id: list_id});
            })
            click("#chooseUpload",function(event){
                uploaderSelect({method:'upload',list_id: list_id});
            })
            click("#chooseAdobe",function(event){
                uploaderSelect({method:'adobe',list_id: list_id});
            })
            
            click("#addImagesButton",function(event){
                $("#addImagesButtonArea").hide()
                $("#addImagesArea").show()

            })

            $("#container_list_label").focus(function(event) {
                $("#save_list_label").show()
                $("#list_label_box").addClass("list-label-editing")
            })
            $("#container_list_label").focusout(function(event) {
                if($("#container_list_label").text() == list_data.list_label){
                    $("#save_list_label").hide()
                    $("#list_label_box").removeClass("list-label-editing")
                }
                
            })
            click("#save_list_label",
                function(event) {
                    
                    new_list_label = $("#container_list_label").text()
                    apiCall({
                        method:'PATCH',
                        endpoint:'/list/'+list_id,
                        body: { list_label: new_list_label },
                        postAction: {action: "nothing"},
                        callback: function(result) {
                            list_data.list_label = new_list_label
                            $("#save_list_label").hide()
                            $("#list_label_box").removeClass("list-label-editing")
                        }
                    })
                }
            )
            $("#container_monitor").change(
                function(event)  {
                    event.preventDefault()
                    var new_monitor = $("#container_monitor").prop('checked')
                    apiCall({
                        method:'PATCH',
                        endpoint:'/list/'+list_id,
                        body: { monitor: new_monitor },
                        postAction: {action: "nothing"},
                        callback: function(result) {
                            list_data.monitor = new_monitor
                            setFromListData({field:"monitor",type:"checkbox"},list_data)
                        }
                    })
                }
            )
        
            
            
        }
    })
}

function drawImages(images){
    $("#container_images").html("")
    if(images.length > 0){
        images.forEach(function(i){
            $("#container_images").append(
                `<div style="display: grid; grid-template-columns: 30px 150px 250px 100%; padding:10px"> 
                    <span style="width:30px;">
                        <a href="javascript: void(0)" onclick="apiCall({apikey:'`+loggedIn().apikey+`',method:'DELETE',endpoint:'/list/`+list_id+`/image/`+i.image_id+`',postAction:{action: 'hide',e: this.parentNode.parentNode}})\"><img alt=\"Delete Image\" title=\"Delete Image\" src=\"https://png.icons8.com/windows/24/e74c3c/trash.png\"/></a>                    
                    </span>
                    <span style="width:150px">
                        <a href="`+i.signed_image_url+`" target=_blank>
                            <img src="/images/bg.png" data-src="`+i.thumbnail_url+`" style="width: 140px;" >
                        </a>
                    </span>
                    <span style="width:250px">
                        <p><a href="`+i.signed_image_url+`" target=_blank>`+i.filename+`</a><br>
                        <strong>Infringing domains:</strong> `+i.unique_hosts+`<BR>
                        <strong>Infringing pages:</strong> `+i.unique_pages+`<BR>
                        <a href=\"/list/`+list_id+`/query?filters[image_id-eql]=`+i.image_id+`" class="link">View infringements</a>
                        </p> 
                    </span>
                    <span>
                        <p><strong>Last queued:</strong> `+dynamicDate(i.last_search_start)+`<br>
                        <strong>Last search:</strong> `+dynamicDate(i.last_search_complete)+`<BR>
                        </p> 
                    </span>
                </div>`
            )
        })
    }
    $("img").unveil(1000);
}

function setFromListData(params,list_data){
    if(!params.prefix){
        params.prefix = "default"
    }
    switch(params.type){
        case "text":
            $("#container_"+params.field).text(list_data[params.field])
        break;
        case "checkbox":
            $("#container_"+params.field).prop('checked',
                list_data[params.field]
            )
        break;
    }


}


initPage()


