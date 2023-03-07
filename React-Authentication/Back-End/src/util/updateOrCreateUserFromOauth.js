import { getDbConnection } from '../db.js';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo;

    const db = getDbConnection('react-auth-db');
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        const result = await db.collection('users').findOneAndUpdate(
            { email },
            { $set: { googleId, isVerified } },
            { returnOriginal: false },
        );
        return result.value;
    } else {
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isVerified,
            info: {},
        });
        return result.ops[0];
    }
}