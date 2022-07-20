function onLogin(){
    document.getElementById("login-pop-up").classList.add("popup-show");
}

function onCloseLogin(){
    document.getElementById("login-pop-up").classList.remove("popup-show");
}

function showSingUp(){
    document.getElementsByClassName('login-box')[0].childNodes[1].textContent = "Create account";
    document.getElementsByClassName('sing-button')[0].textContent = "Sing Up";
    document.getElementsByClassName('reg-bottom-text')[0].textContent = 
        "Already have an account?";
    document.getElementsByClassName('reg-bottom-link')[0].textContent = 
        "Log in";
    document.getElementsByClassName('reg-bottom-link')[0].href="javascript:showLogin()";
    
    document.getElementsByClassName('button-facebook')[0].style.display = "none";
    document.getElementsByClassName('button-google')[0].style.display = "none";
    document.getElementsByClassName('or-box')[0].style.display = "none";
    document.getElementsByClassName('link-forgot')[0].style.display = "none";
}

function showLogin(){
    document.getElementsByClassName('login-box')[0].childNodes[1].textContent = "Log in to your account";
    document.getElementsByClassName('sing-button')[0].textContent = "Sing In";
    document.getElementsByClassName('reg-bottom-text')[0].textContent = 
        "Don’t have an account?";
    document.getElementsByClassName('reg-bottom-link')[0].textContent = 
        "Register";
    document.getElementsByClassName('reg-bottom-link')[0].href="javascript:showSingUp()";
    
    document.getElementsByClassName('button-facebook')[0].style.display = "flex";
    document.getElementsByClassName('button-google')[0].style.display = "flex";
    document.getElementsByClassName('or-box')[0].style.display = "flex";
    document.getElementsByClassName('link-forgot')[0].style.display = "flex";
}