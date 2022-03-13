const signUpForm = document.querySelector('#sign-up-form');
const loginForm = document.querySelector('#login-form');

const signUpName = document.querySelector('#sign-up-name');
const signUpEmail = document.querySelector('#sign-up-email');
const signUpPassword = document.querySelector('#sign-up-password');

const loginEmail = document.querySelector('#login-email');
const loginPassword = document.querySelector('#login-password');


// error messages
const errMsg = document.querySelector('#error');

signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const signUpDetails = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    };

    fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(signUpDetails)
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                errMsg.innerHTML = response.error;
            } else {
                errMsg.innerHTML = '';
                localStorage.setItem('auth-token', response.token);
                location.href = response.redirect;
            }
        })
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginDetails = {
        email: loginEmail.value,
        password: loginPassword.value,
    };

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginDetails)
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                errMsg.innerHTML = response.error;
            } else {
                errMsg.innerHTML = '';
                localStorage.setItem('auth-token', response.token);
                location.href = response.redirect;
            }
        })
});

    // loginForm.addEventListener('submit', e => {
    // });