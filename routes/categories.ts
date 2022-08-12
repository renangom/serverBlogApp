import Category from "../models/Category";
import {Router, Request, Response} from 'express'

const routerCategory = Router()

routerCategory.post("/", async (req:Request, res:Response) => {
    const newCat = new Category(req.body);
    try {
      const savedCat = await newCat.save();
      res.status(200).json(savedCat);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
routerCategory.get("/", async (req: Request, res: Response) => {
      try {
        const cats = await Category.find();
        res.status(200).json(cats);
      } catch (err) {
        res.status(500).json(err);
      }
});



module.exports = routerCategory