"use strict";
var VerifyRegiser;
(function (VerifyRegiser) {
    const form = document.getElementById('registerForm');
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const email = document.getElementById('email');
    let nameListener = false;
    let emailListener = false;
    form.addEventListener('submit', e => {
        e.preventDefault();
        let nameValid = CheckName();
        let emailValid = CheckEmail();
        if (!nameValid && !nameListener) {
            AddInputListener(firstname, CheckName);
            AddInputListener(lastname, CheckName);
            nameListener = true;
        }
        if (!emailValid && !emailListener) {
            AddInputListener(email, CheckEmail);
            emailListener = true;
        }
        if (nameValid && emailValid)
            form.submit();
    });
    function AddInputListener(input, method) {
        input.addEventListener('input', e => {
            method();
        });
    }
    function CheckName() {
        const firstnameValue = firstname.value.trim();
        const lastnameValue = lastname.value.trim();
        if (firstnameValue === '' && lastnameValue === '') {
            SetErrorFor(firstname, 'Enter first and last name', 'name-alert');
            SetErrorFor(lastname, 'Enter first and last name', 'name-alert');
            return false;
        }
        else if (firstnameValue === '') {
            SetErrorFor(firstname, 'Enter firstname', 'name-alert');
            return false;
        }
        else if (lastnameValue === '') {
            SetErrorFor(lastname, 'Enter lastname', 'name-alert');
            return false;
        }
        else {
            SetSuccessFor(firstname, 'name-alert');
            SetSuccessFor(lastname, 'name-alert');
            return true;
        }
    }
    function CheckEmail() {
        const emailValue = email.value.trim();
        if (emailValue === '') {
            SetErrorFor(email, 'Email cannot be blank', 'email-alert');
            return false;
        }
        else if (!IsEmail(emailValue)) {
            SetErrorFor(email, 'Not a valid email', 'email-alert');
            return false;
        }
        else {
            SetSuccessFor(email, 'email-alert');
            return true;
        }
    }
    function IsEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
    function SetErrorFor(input, message, div) {
        input.className = 'form_input error';
        var wrapper = document.getElementById(div);
        wrapper.innerHTML = "<span class=\"form_error_alert_span\"><svg aria-hidden=\"true\" class=\"form_error_alert_svg\" fill=\"currentColor\" focusable=\"false\" width=\"16px\" height=\"16px\" viewBox=\"0 0 24 24\" xmlns=\"https://www.w3.org/2000/svg\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"></path></svg></span>" + message;
        wrapper.style.opacity = "1";
        wrapper.style.maxHeight = "20px";
    }
    function SetSuccessFor(input, div) {
        input.className = 'form_input success';
        var wrapper = document.getElementById(div);
        wrapper.style.opacity = "0";
        wrapper.style.maxHeight = "0";
    }
})(VerifyRegiser || (VerifyRegiser = {}));
//# sourceMappingURL=VerifyRegister.js.map