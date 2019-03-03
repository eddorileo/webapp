function selectAll(type){
    bulkAction = type;
    if(type == "selected"){
        $('#check-status').html($('.result-check:checked').length +" resultados selecionados.")
    }else if(type == "query"){
        $('#check-status').html("Todos os resultados selecionados.")

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