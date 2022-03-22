import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { check, validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import config from 'config'
import authMidleware from '../midleware/auth.midleware.js'
import fileService from "../servises/fileService.js";
import File from "../models/File.js";

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
        await fileService.createDir(new File({user: user.id, name: ''}))
        res.json({message: 'User was created'})


    }catch(e){
        console.log(e)
        res.json({message: 'Server error', error: e})
    }
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message: 'User not found'})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if(!isPassValid){
            return res.status(400).json({message: 'invalid password'})
        }
        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
        return res.json({
            token,
            user: {
                id: user._id ,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace:user.usedSpace,
                avatar: user.avatar
            }
            
        })
    }catch(e){
        console.log(e)
        res.json({message: 'Server error', error: e})
    }
})


router.get('/auth', authMidleware, async (req, res) => {
    try{
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})
        return res.json({
            token,
            user: {
                id: user._id ,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace:user.usedSpace,
                avatar: user.avatar
            }
            
        })
    }catch(e){
        console.log(e)
        res.json({message: 'Server error', error: e})
    }
})

export default router