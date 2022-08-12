import {Request, Response, Router} from 'express'
const routerAuth = Router();
import User from '../models/User';
import bcrypt from 'bcrypt'

//REGISTRAR USUARIO
routerAuth.post('/register', async (req: Request, res: Response) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save();
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})

//LOGIN 
routerAuth.post('/login', async (req: Request, res: Response) => {
    try{
        const user = await User.findOne({name: req.body.name})
        if(!user) {
            res.status(400).json("Dados errados")
        }

        const validate = await bcrypt.compare(req.body.password, user.password)
        if(!validate){
            res.status(400).json('Dados invalidos')
        }
        const {password, ...userData} = user._doc
        res.status(200).json(userData)
    }catch(err){
        res.status(500).json(err)
    }
})
 
module.exports = routerAuth

