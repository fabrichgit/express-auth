import express from 'express'
import cors from 'cors'
import parser from 'body-parser'
import routerUser from './users/users.handler'
import routerAuth from './auth/auth.handler'
import { TUser, users } from './data'

const app = express()
const port = 8000;

app.use(cors({
    origin: '*'
}))
app.use(parser.json());
app.use(routerUser)
app.use(routerAuth)


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// app.post('/register', (req, res) => {
//     const user: TUser = req.body;
//     // verifier le user.email si valid
//     const isValid = emailRegex.test(user.email);
//     console.log(isValid);
    
//     if (isValid) {
//         users.push(user)
//         // res.json({status: 'ok', data: user, isValid})
//     }else{
//         res.status(400).json({message: 'email invalid'})
//     }
// })

// app.post('/login', (req, res) => {
//     const user: TUser = req.body;

//     const userFound = users.find(userCurrent => userCurrent.email === user.email && userCurrent.password === user.password)

//     if (userFound) {
//         /** 
//          * status Code: 200 success, 400 failed --> client, 500 failed ---> server
//          */
//         res.status(400).json({message: "Athentification failed !"})
//     }else{
//         res.json({status: 'ok', data: user})
//     }
// })

// app.get('/users', (req, res) => {
//     res.json(users)
// })

app.listen(port, () => {
    console.log('server running on port '+port+' ******');
    
})