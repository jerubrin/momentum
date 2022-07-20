function onLogin(){
    document.getElementById("login-pop-up").classList.add("popup-show");
}

function onCloseLogin(){
    document.getElementById("login-pop-up").classList.remove("popup-show");
    showLogin();
}

function showSingUp(){
    document.getElementsByClassName('login-box')[0].childNodes[1].textContent = "Create account";
    document.getElementsByClassName('sing-button')[0].childNodes[0].textContent = "Sign Up";
    document.getElementsByClassName('reg-bottom-text')[0].textContent = 
        "Already have an account?";
    document.getElementsByClassName('reg-bottom-link')[0].textContent = 
        "Log in";
    document.getElementsByClassName('reg-bottom-link')[0].href="javascript:showLogin()";
    
    document.getElementsByClassName('button-facebook')[0].style.display = "none";
    document.getElementsByClassName('button-google')[0].style.display = "none";
    document.getElementsByClassName('or-box')[0].style.display = "none";
    document.getElementsByClassName('link-forgot')[0].style.display = "none";
    
    document.getElementsByClassName('login-round')[0].classList.add('new-height');
}

function showLogin(){
    document.getElementsByClassName('login-round')[0].classList.remove('new-height');
    document.getElementsByClassName('login-box')[0].childNodes[1].textContent = "Log in to your account";
    document.getElementsByClassName('sing-button')[0].childNodes[0].textContent = "Sign In";
    document.getElementsByClassName('reg-bottom-text')[0].textContent = 
        "Don’t have an account?";
    document.getElementsByClassName('reg-bottom-link')[0].textContent = 
        "Register";
    document.getElementsByClassName('reg-bottom-link')[0].href="javascript:showSingUp()";
    setTimeout(() => {
        document.getElementsByClassName('button-facebook')[0].style.display = "flex";
        document.getElementsByClassName('button-google')[0].style.display = "flex";
        document.getElementsByClassName('or-box')[0].style.display = "flex";
        document.getElementsByClassName('link-forgot')[0].style.display = "flex";
    }, 200)
}

function showAlert(){
    let str = document.getElementsByClassName('login-box')[0].childNodes[1].textContent + '\n';
    str += 'e-mail: ' + document.getElementsByClassName('e-mail-box')[0].childNodes[3].value + '\n';
    str += 'password: ' + document.getElementsByClassName('pass-box')[0].childNodes[3].value + '\n';
    alert(str);
}