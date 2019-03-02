function notifyEditPageTemplate(result){
    
    const page = `
    <p class="subhead sm left">
    <strong>Listas:</strong><br>
    De quais listas voc&ecirc; gostaria de receber notifica&ccedil;&otilde;es?<br> 
    <select class="form-control" name="list_sel" id="list_sel" style="width:100%">

    <option value='all' ${($.inArray("all",result.notify.list_id)  !== -1 ) ? "selected" : ""}>Todas as Listas</option>
    <option value='custom' ${($.inArray("all",result.notify.list_id)  !== -1 ) ? "" : "selected"}>Especificar Listas ou Filtros de Relat&oacute;rio...</option>
    </select> 
    <div id="list_span">
        <div class="subhead sm left" style="display:block;overflow:auto ;height: 250px;border: 2px #f2cd13 solid;">
            <label style="display: inline"><input type=checkbox class='form-control list_id' id="all_list_checkbox" data-list_id="all" ${($.inArray("all",result.notify.list_id)  !== -1 ) ? "checked" : ""} > Todas as Listas</label><BR>
            ${result.all_lists.map(function(l,i){

                return `<label style="display: inline"><input type=checkbox class='form-control list_id' data-list_id="${l.list_id}" ${($.inArray(l.list_id,result.notify.list_id)  !== -1 ) ? "checked" : ""}> ${l.list_label}</label><BR>`
            }).join("")}
        </div>
    </div>
    <p class="subhead sm left">

    <strong>Com que frequ&ecirc;ncia voc&ecirc; gostaria de receber notifica&ccedil;&otilde;es?</strong><br>

        <label class="btn "> 
            <input type="radio" name="schedule" autocomplete="off" value="1" ${(result.notify.schedule == 1) ? "checked" : ""}> Diariamente 
        </label>
        <label class="btn "> 
            <input type="radio" name="schedule" autocomplete="off" value="7" ${(result.notify.schedule == 7) ? "checked" : ""}> Semanalmente 
        </label>
        <label class="btn ">  
            <input type="radio" name="schedule" autocomplete="off" value="14"  ${(result.notify.schedule == 14) ? "checked" : ""}> Cada 14 dias 
        </label>
        <label class="btn  "> 
            <input type="radio" name="schedule" autocomplete="off" value="30"  ${(result.notify.schedule == 30) ? "checked" : ""}> Cada 30 dias 
        </label>

    <br><br>
    <strong id="email_url_label">Endere&ccedil;o de Email:</strong><br><input placeholder="email@domain.com" type=text class='form-control' style="width:100%" name="endpoint" value="${(result.notify.endpoint.length == 0) ? "" : result.notify.endpoint}"><br><br>
    //ed* <a href="#" id="advancedNotifyLink" class="link">Mudar o formato do email ou alterar para chamadas em outros aplicativos (avan&ccedil;ado)</a><br>
    <div id="advancedNotify" class="subhead sm left">
        <strong>Notification Type:</strong><br>
        N&oacute;s podemos enviar notifica&ccedil;&otilde;es por email ou chamar seu App favorito usando IFTTT ou Zapier<br>
        <select class="form-control" name="type" style="width:100%">
            <option value='email' ${(result.notify.type == "email") ? "selected": ""}>Email</option>
            <option value='postback' ${(result.notify.type == "postback") ? "selected" : ""}>Customizar notifica&ccedil;&atilde;o (via Slack/JIRA/Zapier/IFTTT)</option>
        </select><br><br>
        
        <strong>Conte&uacute;do da Notifica&ccedil;&atilde;o:</strong><br>
        <select class="form-control" name="format" style="width:100%">
            <option value='htmlsummary' ${(result.notify.format == "htmlsummary") ? "selected" : ""}>Rich HTML Summary (Perfeito para alertas por email) </option>
            <option value='textsummary' ${(result.notify.format == "textsummary") ? "selected" : ""}>Texto Simples (para notifica&ccedil;&otilde;es via Slack/JIRA) </option>
            <option value='jsontextsummary' ${(result.notify.format == "jsontextsummary") ? "selected": ""}>Texto Simples - JSON Object (para notifica&ccedil;&otilde;es via Slack/JIRA) </option>
            <option value='jsonsummary' ${(result.notify.format == "jsonsummary") ? "selected" : ""}>Resumo Data JSON Object (gest&atilde;o customizada)</option>
            <option value='jsonfull' ${(result.notify.format == "jsonfull") ? "selected" : ""}>Dados JSON Object Pleno (Indicado para importar dados para um banco) </option>
        </select>
        <br>
    </div>
    <br>
    </p><center><a href='#' id='saveNotify' class="btn btn-normal">Salvar</a> <a href="/notify" class="btn btn-normal">Cancelar</a></center></form>
    `

    return page
}

