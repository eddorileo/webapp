
function loginPageTemplate(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Acesse sua conta</h1>

    <fieldset>
        <div class="row login-form">
            <div class="col-sm-2 col-md-2"></div>
            <div class="col-sm-8 col-md-8" id="loginbit">
                <h2>Entrar | <a href="/register" class="link">Registrar</a></h2>
                
                <input id="email" type=email placeholder="seu@email.com" name="email" />
                
                <input id="password" type=password placeholder="Senha" name="password" />
            
                <a href="#" id="loginButton" class="btn btn-medium">Entrar</a><br>
                <a href="/forgot-password"><h4>Esqueceu sua senha?</h4></a>
            </div>
               
        </div>
        <div class="col-sm-2 col-md-2"></div>
    </fieldset>

    
            
      `

    return page
}

