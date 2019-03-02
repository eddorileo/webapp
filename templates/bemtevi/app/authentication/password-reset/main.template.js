
function passwordResetTemplate(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Digite uma nova senha</h1>
    
        <fieldset>
            <div class="row login-form">
                <div class="col-sm-2 col-md-2"></div>
                <div class="col-sm-8 col-md-8" id="loginbit">
                    
                    <input type=password placeholder="Nova Senha" name="password" />
                    <input type=password placeholder="Confirmar Nova Senha" name="confirmpassword" />
                    
                    <a href="" class="btn-medium" id="passwordResetButton">Digitar Senha</a>
                    
                </div>
                   
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </fieldset>

      `

    return page
}

