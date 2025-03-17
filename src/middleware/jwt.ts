import { verify } from "jsonwebtoken";
import { secret, TPayload } from "../data";
import { NextFunction, Request, Response } from "express";

export const JwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token;
        if (!token || typeof (token) !== 'string') {
            res.status(400).json({ message: "missing information !" })
        } else {
            const payload = verify(token, secret) as TPayload;
            const id = payload.id;
            (req as unknown as { id: string }).id = id
            next()
        }
    } catch (error) {
        res.status(400).json({error})
    }
}