function handleAuth(auth) {
    if (auth.isAuthorized) {
        // The user is logged in and has authorized your site. You may launch the Asset Browser now.
        launchAssetBrowser();
  
    } else {
        // Else, trigger a login
        AdobeCreativeSDK.login(handleAuth);
    }
}

function getRendition(asset, callback) {
    var assetType = AdobeCreativeSDK.Constants.Asset.RenditionType.PNG;
    var assetSize = 800;
    var photoSize = AdobeCreativeSDK.Constants.Photo.RenditionSize.THUMBNAIL_2X;

    // Use the assetType parameter to determine which getRendition() method to use
    if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.FILES) {
        AdobeCreativeSDK.API.Files.getRendition({
            path: asset.path,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.LIBRARY_ASSETS) {
        AdobeCreativeSDK.API.Libraries.getRendition({
            itemId: asset.id,
            libraryId:asset.libraryId,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOS) {
        AdobeCreativeSDK.API.Photos.getRendition({
            catalogId: asset.catalogId,
            collectionId: asset.collectionId,
            photoId: asset.id,
            size: photoSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_DRAW) {
        AdobeCreativeSDK.API.Draw.getRendition({
            fileId: asset.fileId,
            pageId: asset.id,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if( asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_SKETCH) {
        AdobeCreativeSDK.API.Sketch.getRendition({
            fileId: asset.fileId,
            pageId: asset.id,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PHOTOSHOP_MIX) {
        AdobeCreativeSDK.API.PSMix.getRendition({
            fileId: asset.fileId,
            pageId: asset.id,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.COMP_CC) {
        AdobeCreativeSDK.API.Comp.getRendition({
            fileId: asset.fileId,
            pageId: asset.id,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.ILLUSTRATOR_LINE) {
        AdobeCreativeSDK.API.Line.getRendition({
            fileId: asset.fileId,
            pageId: asset.id,
            type: assetType,
            size: assetSize
        }, callback);
    }
    else if(asset.assetType == AdobeCreativeSDK.Constants.AssetType.PREMIERE_CLIP) {
        AdobeCreativeSDK.API.Clip.getRendition({
            fileId: asset.fileId,
            pageId: asset.id,
            type: assetType,
            size: assetSize
        }, callback);
    }
}



        

function launchAssetBrowser() {
    var assetBrowser = new AdobeCreativeSDK.UI.AssetBrowser({
        // openType: 'embed', // options include: embed, lightbox and window. Default is lightbox
        // element: 'domid', // use the element parameter parameter when specifying the "embed" openType
        onOpen: function() {
            // asset browser launched
        },
        onClose: function() {
            // asset browser closed
        },
        onError: function() {
            // a launch error occured
        }
    });

    assetBrowser.open({        
        multiSelect: true, // allow the user to select multiple assets
    }, function(response) {
        if (response.error) {
            console.log('Something went wrong...')
        } else {
            console.log(response)
            // response.data is an array of Creative Cloud Assets
            var returned =0
            var required = response.data.length

            response.data.forEach(function(rd){
                getRendition(rd, function(res) {
                    if (res.error) {
                        console.log('Something went wrong...')
                    } else {
                        // data contains a base64 encoded string representing the image
                        if (res.data.split(",")[0].indexOf("base64") >= 0) {
                            b64file = res.data.split(",")[1]
                            byteString = atob(res.data.split(",")[1]);
                            apiCall({
                                method:'PUT',
                                endpoint:'/list/'+list_id+'/file/'+rd.name+'?base64=true',
                                filetype: rd.type,
                                raw: b64file,
                                postAction: {action:"none"},
                                callback: function(){
                                    returned++;
                                    if(returned >= required){
                                        initPage()
                                    }
                                }
                            });
                        } 
                    }
                });
            })
            
        }
    });
}
AdobeCreativeSDK.init({
    clientID: 'ca35d32ff5c84c9793176cae03a6e404',
    API: ["Asset"],
    redirectURI: "https://infringement.report/list/"+list_id+"/edit",
    redirect_uri: "https://infringement.report/list/"+list_id+"/edit",
    onError: function(error) {
        // Handle any global or config errors here
        if (error.type === AdobeCreativeSDK.ErrorTypes.AUTHENTICATION) {
            // Note: this error will occur when you try and launch the asset browser without checking if the user has authorized your app. From here, you can trigger AdobeCreativeSDK.loginWithRedirect().
            console.log('You must be logged in to use the Creative SDK');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.GLOBAL_CONFIGURATION) {
            console.log('Please check your configuration');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.COMPONENT_CONFIGURATION) {
            console.log('Please check your component configuration');
        } else if (error.type === AdobeCreativeSDK.ErrorTypes.SERVER_ERROR) {
            console.log('Oops, something went wrong');
        }
    }
});

