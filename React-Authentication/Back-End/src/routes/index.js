import { testRoute } from './testRoute.js';
import { signUpRoute } from './signUpRoute.js';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute.js';
import { logInRoute } from './logInRoute.js';
import { updateUserInfoRoute } from './updateUserInfoRoute.js';
import { testEmailRoute } from './testEmailRoute.js';
import { verifyEmailRoute } from './verifyEmailRoute.js';
import { forgotPasswordRoute } from './forgotPasswordRoute.js';
import { resetPasswordRoute } from './resetPasswordRoute.js';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute.js';
 const Rotes = [
    logInRoute,
    signUpRoute,
    testEmailRoute,
    testRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,

];
 export default Rotes
