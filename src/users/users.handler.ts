import { Router } from "express"
import { users } from "../data"

const router = Router()

router.get('/users', (req, res) => {
    res.json(users)
})

export default router