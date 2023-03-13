import express, { Request, Response } from "express";
import { Sender } from "./sender";

const sender = new Sender();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/status', (req: Request, res: Response)=> {

})

app.get('/send', (req: Request, res: Response)=> {
  try{

  } catch {

  }
})
