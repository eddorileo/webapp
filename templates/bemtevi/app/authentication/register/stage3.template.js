
function registerStage3Template(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Create new account</h1>
    <fieldset>
        <div class="row login-form">
            <div class="col-sm-2 col-md-2"></div>
            <div class="col-sm-8 col-md-8">
                <h2><a href="/login" class="link">Login</a> | Register</h2>
                <p>The registration is complete. We have sent a verification code your email address - please enter this code below or click the link in the email.</p>
                <input type=text placeholder="a1b2c3d4e5f6a7b8c9d0e1f2" name="verifyCode" />
                <a href="#" class="btn-medium" id="resetPasswordButton">Continue</a>
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </div>
    </fieldset>

      `

    return page
}

