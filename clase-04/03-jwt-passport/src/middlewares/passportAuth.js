import passport from 'passport';

export const passportAuth = () => {
    return async (req, res, next) => {
        passport.authenticate(process.env.PASSPORT_STRATEGY, { session: false }, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).send({
                    error: info?.messages ? info.messages : info.toString()
                });
            }
            req.user = user;
            next()
        })(req, res, next)
    }
}

export const authorization = role => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ message: "No autorizado, user vacio"});
        if (req.user.role != role) return res.status(403).send({ message: "No autorizado, usted tiene prohibido entrar a esta pagina"});
        next()
    }
}