namespace VerifyLogin {

    const form = document.getElementById('account');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let emailListener = false;
    let passwordListener = false;

    form!.addEventListener('submit', e => {
        e.preventDefault();

        let emailValid = CheckEmail();
        let passwordValid = CheckPassword();

        if (!emailValid && !emailListener) {
            AddInputListener(email, CheckEmail)
            emailListener = true;
        }

        if (!passwordValid && !passwordListener) {
            AddInputListener(password, CheckPassword)
            passwordListener = true;
        }

        if (emailValid && passwordValid)
            (<HTMLFormElement>form).submit();
    });

    function AddInputListener(input, method) {
        input.addEventListener('input', e => {
            method();
        });
    }

    function CheckEmail() {
        const emailValue = (<HTMLInputElement>email).value.trim();

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

    function CheckPassword() {
        const passwordValue = (<HTMLInputElement>password).value.trim();

        if (passwordValue === '') {
            SetErrorFor(password, 'Password cannot be blank', 'password-alert');
            return false;
        }
        else {
            SetSuccessFor(password, 'password-alert');
            return true;
        }
    }

    function IsEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    function SetErrorFor(input, message, div) {
        input.className = 'form_input error';

        var wrapper = document.getElementById(div);
        wrapper!.innerHTML = "<span class=\"form_error_alert_span\"><svg aria-hidden=\"true\" class=\"form_error_alert_svg\" fill=\"currentColor\" focusable=\"false\" width=\"16px\" height=\"16px\" viewBox=\"0 0 24 24\" xmlns=\"https://www.w3.org/2000/svg\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z\"></path></svg></span>" + message;
        wrapper!.style.opacity = "1";
        wrapper!.style.maxHeight = "20px";
    }

    function SetSuccessFor(input, div) {
        input.className = 'form_input success';

        var wrapper = document.getElementById(div);
        wrapper!.style.opacity = "0";
        wrapper!.style.maxHeight = "0";
    }
}