import express, { Router, Request, Response } from 'express';
const app = express();
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
const routerAuth:Router = require('./routes/auth')
const routerUser:Router = require('./routes/users')
const routerPost:Router = require('./routes/posts')
const cors = require('cors');
const routerCategory: Router = require('./routes/categories')
import multer from 'multer'
import path from 'path'

dotenv.config();
app.use(express.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")))
mongoose.connect(process.env.DB_URL)
.then((message) => console.log("conectado"))
.catch(err => console.log(err));

const storage = multer.diskStorage({
    destination:(req: Request, file: any,cb:Function) => {
        cb(null, "images")
    }, filename: (req,file, cb) => {
        cb(null,req.body.name)
    }
})

const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"), (req:Request, res: Response) => {
    res.status(200).json("Arquivo foi uplado")
})

app.use('/api/auth', routerAuth);
app.use('/api/users', routerUser);
app.use('/api/posts', routerPost);
app.use('/api/categories', routerCategory)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
})