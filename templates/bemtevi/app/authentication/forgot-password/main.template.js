function forgotPassTemplate(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Resetar senha</h1>

    
        <fieldset>
            <div class="row login-form">
                <div class="col-sm-2 col-md-2"></div>
                <div class="col-sm-8 col-md-8">
                    
                    <input id="email" type=email placeholder="your@email.com" name="email" />
                    
                    <a href="" class="btn-medium" id="resetPasswordButton">Resetar Senha</a>
                    
                </div>
                   
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </fieldset>
    
            
      `

    return page
}

