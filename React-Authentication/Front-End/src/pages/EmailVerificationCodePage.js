import { useState } from 'react';
import axios from 'axios';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerificationFail';
import { useToken } from '../auth/useToken';
import { useQueryParams } from '../util/useQueryParams';

export const EmailVerificationCodePage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    const [verificationString, setVerificationString] = useState('');
    const { email } = useQueryParams();
    const [, setToken] = useToken();

    const onSubmitVerificationString = async () => {
        try {
            const response = await axios.put('/api/verify-email', { email, verificationString });
            const { token } = response.data;
            setToken(token);
            setIsSuccess(true);
        } catch (e) {
            setIsFailure(true);
        }
    }

    if (isSuccess) return <EmailVerificationSuccess />
    if (isFailure) return <EmailVerificationFail />

    return (
        <div className="content-container">
            <h1>Please Verify Your Email</h1>
            <p>You should have received a verification code at the email your provided. Please enter it here:</p>
            <input
                value={verificationString}
                onChange={e => setVerificationString(e.target.value)}
                placeholder="e.g. 123456" />
            <button onClick={onSubmitVerificationString}>Submit</button>
        </div>
    )
}