import User from '../models/User';
import {Request, Response, Router} from 'express'
const routerUser = Router();
import bcrypt from 'bcrypt'


//UPDATE
routerUser.put('/:id', async (req: Request, res: Response) => {
    const id:string = req.params.id
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if(id === req.body.id){
        try{
            const updatedUser = await User.findByIdAndUpdate({_id:req.params.id}, {
                $set: req.body
            }, {new: true});
            res.status(200).json(updatedUser)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Você só pode atualizar sua conta")
    }
})
//DELETE
routerUser.delete('/:id', async (req: Request, res: Response) => {
    const id:string = req.params.id
    if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    if(id === req.body.id){
        try{
             await User.deleteOne({_id:req.params.id});
            res.status(200).json("User has been deleted")
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(401).json("Você só pode deletar sua conta")
    }
})


// GET USERS
routerUser.get('/', async(req: Request, res: Response) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ONE USER
routerUser.get('/:id', async(req: Request, res: Response) => {
    const id = req.params.id
    try{
        const user = await User.find({_id:id});
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = routerUser

