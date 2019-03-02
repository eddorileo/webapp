function listsEditPageTemplate(params){
    const page = `
    <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-8">
                <p class="">
            
                <div id="list_label_box">
                    <h2 id="container_list_label" style="color: #f2cd13;display:inline" contenteditable="true">Carregando...</h2>
                    <a class="btn btn-small" id="save_list_label">Salvar</a>
                </div>
                ${(params.credits.monitor_strategy == "classic") ? `
                <div class="row">
                
                    <div class="col-md-6" style="text-align:right">
                        <strong class="subhead tiny">Monitorando:</strong><br>
                        <i class="subhead tiny">${params.credits.total["remaining-monitor"]} imagens monitoradas restantes.<BR>
                        Listas não monitoradas serão removidas após uma semana.</i>
                    </div>
                    <div class="col-md-4"><div class="onoffswitch " style="margin-left: 5.5em;">
                        <input type="checkbox"  class="onoffswitch-checkbox" id="container_monitor" >
                        <label class="onoffswitch-label" for="container_monitor">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>` : ``}
            </div>
        </div>
        </div>
        
        <BR><BR><BR>
        <div class="row">
            <div class="col-md-2">
            </div>
            <div class="col-md-10">
                <h2 style="color: #f2cd13;">Imagens</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div id="addImagesArea">
                        
                        <strong class="subhead sm">Adicionar Imagens</strong><br>
                        <span id="uploader-select" class="subhead tiny">
                        <table width="100%">
                            <tr>
                                <td width="33%"><center>
                                    <a href="#" id="chooseUrl"><img src="https://png.icons8.com/windows/80/000000/domain.png"><br>Colar URLs</a>
                                    </center>
                                </td>
                                <td width="33%"><center>
                                    <a href="#" id="chooseUpload"><img src="https://png.icons8.com/windows/80/000000/upload-to-cloud.png"><br>Carregar Imagens</a>
                                    </center>
                                </td>
                                <td width="33%"><center>
                                    <a href="#" id="chooseAdobe"><img src="/app/list/edit/images/creativecloud_appicon_176x168.png" style="width:80px"><br>Importar de <br>Creative Cloud</a>
                                    </center>
                                </td>
                            </tr>
                        </table><BR>
                            <small>Max size: 10MB and 8000px x 6000px</small>
                        </span>
                        <span id="uploader-container"></span>

                        <BR><BR>
                    </div>
                    <div id="addImagesButtonArea">
                        <a href="#" class="btn btn-small" id="addImagesButton">Adicionar Novas Imagens</a>
                    </div>
                    <div style="border: 2px #f2cd13 solid;" id="container_images">
                    
                    </div>
                    
                        
            
                
                </div>
            </div>
            
      `

    return page
}

