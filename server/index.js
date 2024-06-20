import express from "express";
import {dirname} from 'path'
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get('/',(req,res)=>{
      res.send("Server running")
})

app.get('/video',(req,res)=>{
      const file = `${__dirname}/video.mp4`;
      res.send(file);
})

app.listen(3000,()=>{
      console.log("server running on 3000")
})