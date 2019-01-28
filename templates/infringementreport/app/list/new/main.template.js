function listsNewPageTemplate(){
    const page = `
    <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <p class="">
            
                <strong>List Name:</strong><br>
                <input type=text class='form-control' id="container_list_label" style="width:100%" value="">
                <br>This will be used to group and identify your images
                <div class="row">
                
                    <div class="col-md-6" style="text-align:right">
                        <strong class="subhead tiny">Active Monitoring:</strong><br>
                        
                        <p class="subhead tiny">When a list is active, we constantly search its images to find new matches.</p>
                     
                    </div>
                    <div class="col-md-4"><div class="onoffswitch " style="margin-left: 5.5em;">
                        <input type="checkbox" selected="selected" class="onoffswitch-checkbox" id="container_monitor" checked >
                        <label class="onoffswitch-label" for="container_monitor">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <center><a href="#" id="createNewList" class="btn btn-mid">Save and Add Images</a> <a href="/list" class="btn btn-mid">Cancel</a></center>
      
      `

    return page
}

