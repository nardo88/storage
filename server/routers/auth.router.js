import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { check, validationResult } from "express-validator";

const router = new Router()

router.post('/registration', [
    check('email', 'Unicorrect email').isEmail(),
    check('password', 'Password must be longer than 3 and shorted then 12').isLength({min:3, max:12}),
], async (req, res) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: 'incorrect data', errors})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        console.log(candidate)
        if(candidate){
           return res.json({message: `User with email: ${email} alredy exist`})
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const user = new User({
            email,
            password: hashPassword
        })
        await user.save()
        res.json({message: 'User was created'})


    }catch(e){
        console.log(e)
        res.json({message: 'Server error', error: e})
    }
})

export default router