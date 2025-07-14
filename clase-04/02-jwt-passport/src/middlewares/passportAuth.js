import passport from 'passport';

export const passportAuth = passport.authenticate('jwt', { session: false });
