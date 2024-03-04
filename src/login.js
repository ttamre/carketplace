/**
 * Login form functionality
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */


document.addEventListener("DOMContentLoaded", connectLoginButtons);


/** Connect all event listeners */
function connectLoginButtons() {
    // login button
    let loginSubmit = document.getElementById("loginSubmit")
    loginSubmit.addEventListener('click', () => {
        let userData = getLoginData();
        let user = login(userData);
        console.log(user);
    });

    // create button
    let loginCreate = document.getElementById("loginCreate")
    loginCreate.addEventListener('click', () => {
        let userData = getLoginData();
        let user = create(userData);
        console.log(user);
    });

    // forgot password button
    let loginForgot = document.getElementById("loginForgot")
    loginForgot.addEventListener('click', () => {
        let userData = getLoginData();
        let user = forgot(userData);
        console.log(user);
    });
}


/**
 * 
 * @returns 
 */
function getLoginData() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    return {"email": email, "password": password}
}


/**
 * 
 * @param {*} user 
 * @returns 
 */
function login(user) {
    alert("login: " + JSON.stringify(user));
    return user;
}


/**
 * 
 * @param {*} user 
 * @returns 
 */
function create(user) {
    alert("create: " + JSON.stringify(user));
    return user;
}


/**
 * 
 * @param {*} user 
 * @returns 
 */
function forgot(user) {
    alert("forgot: " + JSON.stringify(user));
    return user;
}