
function registerStage1Template(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Create new account</h1>
    <fieldset>
        <div class="row login-form">
            <div class="col-sm-2 col-md-2"></div>
            <div class="col-sm-8 col-md-8">
                <h2><a href="/login" class="link">Login</a> | Register</h2>
                <input id="email" type=email placeholder="your@email.com" name="email" />
                <label class=" sm left"><input id="termsagreed" type=checkbox class="form-control" name="termsagreed"> I agree to the <a href="/terms.php" class="link">Infringement.Report Terms of Service</a> and <a href="https://www.iubenda.com/privacy-policy/63177447" class="link iubenda-nostyle no-brand iubenda-embed iub-legal-only" title="Privacy Policy">Privacy Policy</a> <script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src="https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script> (<i>Required</i>)</label><BR>
                <label class=" sm left"><input type=checkbox class="form-control" name="marketing-optin"> I want <i>very occassional</i> emails about product updates, new features, and other things concerning Infringement.Report (<i>Optional</i>)</label><BR>
                <a href="#" class="btn-medium" id="registerButton">Register</a>
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </div>
    </fieldset>
      `

    return page
}

