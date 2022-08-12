import Post from '../models/Post';
import {Request, Response, Router} from 'express';

const routerPost = Router();
import bcrypt from 'bcrypt'

//CREATE POST
routerPost.post("/", async (req: Request, res: Response) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

//UPDATE POST
routerPost.put('/:id', async (req:Request, res: Response) => {
    const id = req.params.id;
    try{
        const post = await Post.find({_id: id});
        console.log(post[0])
        if(post[0].name === req.body.name) {
            try{
                const updatedPost = await Post.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, {new:true});
                res.status(200).json(updatedPost)
            }catch(err){
                res.status(500).json('Post não encontrado')
            }       
        }else{
            res.status(401).json("Você não pode alterar um post que não é seu")
        }
    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE
routerPost.delete('/:id', async (req: Request, res:Response) => {
    const id = req.params.id
    try{
        const post  = await Post.find({_id:id});
        if(post[0].name === req.body.name){
            try{
                await Post.deleteOne({_id:id});
                res.status(200).json('Post deletado')
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("Você só pode deletar seus próprios posts")
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//GET POSTS
routerPost.get('/', async (req:Request, res: Response) => {
    const username= req.query.user
    const category = req.query.cat
    try{
        let posts;
        if(username) {
            posts = await Post.find({name: username});
        }else if(category){
            posts = await Post.find({categories: {$in :[category]}})
        }else{
            posts = await Post.find();
        }

        res.status(200).json(posts )
    }catch(err){
        res.status(500).json(err)
    }
})

//GET POST
routerPost.get('/:id', async (req:Request, res: Response) => {
    try{
        const post = await Post.find({_id: req.params.id})
        res.status(200).json(post[0])
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = routerPost