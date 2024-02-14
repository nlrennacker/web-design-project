const checkUsername = (username) => {
    /**
     * Regex Explanation
     * ^    --> start of string
     * \D   --> anything NOT a digit [^0-9]
     * \w   --> anything that is an alphanumeric character [a-zA-Z0-9]
     * {2,} --> 2 or more characters w/ no UPPER LIMIT
     */
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
}

const checkPassword = (password) => {
    let passwordChecker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[/*\-+!@#$^&]).{8,}$/;
    return passwordChecker.test(password);
}

const checkEmail = (email) => {
    let emailChecker = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailChecker.test(email);
}


const registerValidation = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    if(!checkUsername(username)){
        req.flash('error', "Invalid username!!!");
        req.ession.save(err => {
            res.redirect("/registration");
        });
    }else if(!checkPassword(password)){
        req.flash('error', "Invalid password!!!");
        req.ession.save(err => {
            res.redirect("/registration");
        });
    }else if(!checkEmail(email)){
         req.flash('error', "Invalid email!!!");
         req.ession.save(err => {
            res.redirect("/registration");
        });
    }else {
        next();
    }
}

module.exports = {registerValidation}