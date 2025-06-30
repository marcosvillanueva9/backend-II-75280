import passport from 'passport';

export const passportAuth = passport.authenticate(process.env.PASSPORT_STRATEGY, { session: false });