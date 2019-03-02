
function registerStage3Template(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Criar nova conta</h1>
    <fieldset>
        <div class="row login-form">
            <div class="col-sm-2 col-md-2"></div>
            <div class="col-sm-8 col-md-8">
                <h2><a href="/login" class="link">Logar</a> | Registrar</h2>
                <p>O registro está completo. Um código de verificação foi enviado para o seu email. Por favor, entre o código no campo abaixo ou clique no link enviado para o seu email.</p>
                <input type=text placeholder="a1b2c3d4e5f6a7b8c9d0e1f2" name="verifyCode" />
                <a href="#" class="btn-medium" id="resetPasswordButton">Continuar</a>
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </div>
    </fieldset>

      `

    return page
}

