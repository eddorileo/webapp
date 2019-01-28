
function passwordResetTemplate(){
    const page = `
    <h1 class="headline base-sm-medium-buffer">Set a new password</h1>
    
        <fieldset>
            <div class="row login-form">
                <div class="col-sm-2 col-md-2"></div>
                <div class="col-sm-8 col-md-8" id="loginbit">
                    
                    <input type=password placeholder="New Password" name="password" />
                    <input type=password placeholder="Confirm Password" name="confirmpassword" />
                    
                    <a href="" class="btn-medium" id="passwordResetButton">Set Password</a>
                    
                </div>
                   
            </div>
            <div class="col-sm-2 col-md-2"></div>
        </fieldset>

      `

    return page
}

