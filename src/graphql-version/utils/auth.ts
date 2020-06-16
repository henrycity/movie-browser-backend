import jwt from 'jsonwebtoken';

import { JSON_EXPIRE, JSON_SECRET } from '../constants';

export const newToken = (userId: number) => {
    return jwt.sign({ id: userId }, JSON_SECRET, {
        expiresIn: JSON_EXPIRE,
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JSON_SECRET, (err, payload) => {
        if (err) {
            return {};
        }
        return payload;
    });
};
