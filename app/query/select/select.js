function selectAll(type){
    bulkAction = type;
    if(type == "selected"){
        $('#check-status').html($('.result-check:checked').length +" results selected.")
    }else if(type == "query"){
        $('#check-status').html("All results selected.")

    }
}
function resultChecked(){
  
    if($('.result-check:checked').length == 0){
        $('#check-status').hide()
        $('#check-status-cont').hide() 
    }else{
        $('#check-status-cont').show() 
        $('#check-status').show() 
    }
    selectAll("selected")
}