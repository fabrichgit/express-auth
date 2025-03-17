import { Router } from "express";
import { secret, TPayload, TUser, updateUser, users } from "../data";
import { findUserByEmailAndPassword } from "../users/user.service";
import { sign, verify } from "jsonwebtoken";
import { v4 } from "uuid";
import { JwtMiddleware } from "../middleware/jwt";

const router = Router()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', (req, res) => {
    const user: TUser = req.body;
    // verifier le user.email si valid
    const isValid = emailRegex.test(user.email);

    if (isValid) {
        users.push(user)
        res.json({ status: 'ok', data: user, isValid })
    } else {
        res.status(400).json({ message: 'email invalid' })
    }
})

router.post('/login', (req, res) => {
    const user: TUser = req.body;
    const id = v4()
    user.id = id

    // const userFound = users.find(userCurrent => userCurrent.email === user.email && userCurrent.password === user.password)
    const userFound = findUserByEmailAndPassword(user)

    if (!userFound) {
        /** 
         * status Code: 200 success, 400 failed --> client, 500 failed ---> server
         */
        res.status(400).json({ message: "Athentification failed !" })
    } else {

        const payload = { id }
        const token = sign(payload, secret)

        res.json({ status: 'ok', Token: token })
    }
})


router.patch('/update_email', (req, res) => {

    const email = req.body.email;
    const token = req.headers.token;

    try {
        if (!email || !token || typeof (token) !== 'string') {
            res.status(400).json({ message: "missing information !" })
        } else {
            const payload = verify(token, secret) as TPayload
            const id = payload.id

            users.forEach(userCurrent => {
                if (userCurrent.id === id) {
                    userCurrent.email = email;
                }
            })
            res.status(200).json({ message: 'ok' })
        }
    } catch (error) {
        res.status(401).json({ error })
    }
})

router.delete('/delete_account', JwtMiddleware, (req, res) => {
    const usersFiltered = users.filter(userCurrent => userCurrent.id !== (req as unknown as { id: string }).id)

    const modifiedUsers = updateUser(usersFiltered)

    res.json(modifiedUsers)
})

export default router;