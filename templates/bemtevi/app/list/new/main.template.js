function listsNewPageTemplate(params){
    const page = `
    <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <p class="">
            
                <strong>Nome da Lista:</strong><br>
                <input type=text class='form-control' id="container_list_label" style="width:100%" value="">
                <br>Listas são usadas para agrupar e identificar suas imagens
                ${(params.monitor_strategy == "classic") ? `<div class="row">
                
                    <div class="col-md-6" style="text-align:right">
                        <strong class="subhead tiny">Monitoramento Ativo:</strong><br>
                        
                        <p class ="subhead tiny">Quando uma lista está ativa, suas imagens são pesquisadas constantemente para encontrar novos pareamentos.</p>
                     
                    </div>
                    <div class="col-md-4"><div class="onoffswitch " style="margin-left: 5.5em;">
                        <input type="checkbox" selected="selected" class="onoffswitch-checkbox" id="container_monitor" checked >
                        <label class="onoffswitch-label" for="container_monitor">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>` : ``}
                </div>
            </div>
        </div>
        </div>
        <center><a href="#" id="createNewList" class="btn btn-mid">Salvar e Adicionar Imagens</a> <a href="/list" class="btn btn-mid">Cancelar</a></center>
      
      `

    return page
}

