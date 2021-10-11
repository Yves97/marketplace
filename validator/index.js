exports.userSignUpValidator = (req,res,next) => {
    req.check('name','Le nom est requis').notEmpty()
    req.check('email',"Email doit être compris entre 3 et 32 caractères")
        .matches(/.+\@.+\..+/)
        .withMessage("L'email doit contenir un @")
        .isLength({
            min : 4,
            max : 32
        })
    req.check("password","le mot de passe est requis").notEmpty();
    req.check("password")
        .isLength({min : 6})
        .withMessage("le mot de passe doit contenir au minimun 6 caratères")
        .matches(/\d/)
        .withMessage("Le mot de passe doit contenir un nombre")
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error : firstError})
    }
    next()
}