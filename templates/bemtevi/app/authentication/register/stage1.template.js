
function registerStage1Template(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Criar Nova Conta</h1>
    <fieldset>
        <div class="row login-form">
            <div class="col-sm-2 col-md-2"></div>
            <div class="col-sm-8 col-md-8">
                <h2><a href="/login" class="link">Logar</a> | Registrar</h2>
                <input id="email" type=email placeholder="seu@email.com" name="email" />
                <label class=" sm left"><input id="termsagreed" type=checkbox class="form-control" name="termsagreed"> Concordo com os <a href="/terms.php" class="link"> Termos de Serviço Buscalogo</a> e <a href="https://www.iubenda.com/privacy-policy/63177447" class="link iubenda-nostyle no-brand iubenda-embed iub-legal-only" title="Privacy Policy">Pol&iacute;tica Privada</a> <script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script> (<i>Obrigat&oacute;rio</i>)</label><BR>
                <label class=" sm left"><input type=checkbox class="form-control" name="marketing-optin"> Eu quero <i>ocasionalmente</i> receber emails sobre atualizações do produto, novos campos e novidades (<i>Opcional</i>)</label><BR>
                <a href="#" class="btn-medium" id="registerButton">Registrar</a>
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </div>
    </fieldset>
      `

    return page
}

