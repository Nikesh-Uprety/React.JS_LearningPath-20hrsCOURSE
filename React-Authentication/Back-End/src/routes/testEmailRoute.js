import { sendEmail } from '../util/sendEmail.js';

export const testEmailRoute = {
    path: '/api/test-email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'upretynikesh021@gmail.com',
                from: 'upretynikesh123@gmail.com',
                subject: 'Does this work?',
                text: 'If you\'re reading this... yes!',
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}