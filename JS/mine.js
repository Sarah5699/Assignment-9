var Loginbtn = document.getElementById("loginBtnId");
var SignUpbtn = document.getElementById("signUpBtnId");
var SignUpanchor = document.querySelector(".sign-up");
var loginInanchor = document.querySelector(".sign-in");
var nameInput =  document.getElementById("signupName");
var cartona;
if(localStorage.getItem("localUsers") == null)
{
    cartona= [];
} else{
    cartona = JSON.parse(localStorage.getItem("localUsers"));
}

function setValue(pId,pValue)
{
    document.getElementById(pId).innerHTML= pValue;
}

function getValue(pTagId) 
{
    return(document.getElementById(pTagId).value);
}

Loginbtn.addEventListener('click',function(){
    var correstUser = false;
    email=getValue("signinEmail");
    password=getValue("signinPassword");
    if ((email == '') || (password == '')) {
        setValue("status","all inputs is required")
        document.getElementById("status").style.color= "red"
    } else {
        for (var index = 0; index < cartona.length; index++) {
            if ((email == cartona[index].email) && (password == cartona[index].password)){
                //location.href = "../home.html";
                var Name = cartona[index].userName;
                sessionStorage.setItem("pass_to_home", Name);

                let loginAnchor = document.createElement('a');
                document.body.appendChild(loginAnchor);
                loginAnchor.style.display = 'none';
                loginAnchor.href = 'home.html';
                loginAnchor.click();
                correstUser=true;
                break;
            }
        }
        if(!correstUser){
            setValue("status","Email or password is not valid")
            document.getElementById("status").style.color= "red"
        }
    }
})

SignUpbtn.addEventListener('click',function(eInfo){
    var emailExist= false;
    var user = {
        userName : getValue("signupName"),
        email : getValue("signinEmail"),
        password : getValue("signinPassword")
    }
    if ((user.email == '') || (user.userName == '') || (user.password == '')){
        setValue("status","all inputs is required")
        document.getElementById("status").style.color= "red"
    } 
    else{
        for (var index = 0; index < cartona.length; index++) {
            if (user.email == cartona[index].email){
                setValue("status","email already exist");
                document.getElementById("status").style.color= "red";
                emailExist= true;
                break;
            }
        }
        if (!emailExist){
            cartona.push(user)
            localStorage.setItem("localUsers",JSON.stringify(cartona));
            setValue("status","success");
            document.getElementById("status").style.color= "green";
        }
    }
})

SignUpanchor.addEventListener('click',function(){
    document.getElementById("signinEmail").value = null;
    document.getElementById("signinPassword").value= null;
    nameInput.classList.replace("d-none","d-block");
    SignUpbtn.classList.replace("d-none","d-block");
    Loginbtn.classList.replace("d-block","d-none");
    loginInanchor.classList.replace("d-none","d-inline");
    SignUpanchor.classList.replace("d-inline","d-none");
})

loginInanchor.addEventListener('click',function(){
    document.getElementById("signinEmail").value = null;
    document.getElementById("signinPassword").value = null;
    nameInput.classList.replace("d-block","d-none");
    Loginbtn.classList.replace("d-none","d-block");
    SignUpbtn.classList.replace("d-block","d-none");
    loginInanchor.classList.replace("d-inline","d-none");
    SignUpanchor.classList.replace("d-none","d-inline");
})