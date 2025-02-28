import { Router } from "express";
import { TUser, users } from "../data";
import { findUserByEmailAndPassword } from "../users/user.service";
import bcrypt from "bcrypt";


const router = Router()
const saltRounds= 10; 

router.post('/register', async (req, res) => {
    const user: TUser = req.body;
    const crypted = await bcrypt.hash(user.password, saltRounds)
    user.password = crypted
    users.push(user)

    res.json({ status: 'ok', data: user })
})



router.post('/login', (req, res) => {
    const user: TUser = req.body;

    // const userFound = users.find(userCurrent => userCurrent.email === user.email && userCurrent.password === user.password)
    const userFound = findUserByEmailAndPassword(user)

    if (userFound) {
        /** 
         * status Code: 200 success, 400 failed --> client, 500 failed ---> server
         */
        res.status(400).json({ message: "Athentification failed !" })
    } else {
        res.json({ status: 'ok', data: user })
    }
})

export default router;