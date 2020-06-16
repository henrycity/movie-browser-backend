import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { JSON_EXPIRE, JSON_SECRET } from '../constants';

interface JwtPayload {
    id: string;
}

export const newToken = (userId: number) => {
    return jwt.sign({ id: userId }, JSON_SECRET, {
        expiresIn: JSON_EXPIRE,
    });
};

export const verifyToken = (token: string): Promise<JwtPayload> =>
    new Promise((resolve, reject) => {
        jwt.verify(token, JSON_SECRET, (err, payload) => {
            if (err) return reject(err);
            resolve(payload as JwtPayload);
        });
    });

export const signup = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'need email and password' });
    }

    try {
        const user = await User.create(req.body);
        const token = newToken(user.id);
        return res.status(201).send({ token });
    } catch (e) {
        res.status(500).end();
    }
};

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'need email and password' });
    }

    const invalid = { message: 'Invalid email and password combination' };

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).send(invalid);
        }

        const match = await user.checkPassword(req.body.password);

        if (!match) {
            return res.status(401).send(invalid);
        }

        const token = newToken(user.id);
        res.status(201).send({ token });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
};

export const protect = async (req: Request, res: Response, next: () => void) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).end();
    }

    const token = bearer.split('Bearer ')[1].trim();
    let payload: JwtPayload | null = null;
    try {
        payload = await verifyToken(token);
    } catch (e) {
        return res.status(401).end();
    }

    const user = await User.findByPk(payload.id, { attributes: ['id', 'email', 'lists'] });

    if (!user) {
        return res.status(401).end();
    }

    req.user = user;
    next();
};
