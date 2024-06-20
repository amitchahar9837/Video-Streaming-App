import express from "express";
import { createReadStream, statSync } from "fs";
import {dirname} from 'path'
import { fileURLToPath } from "url";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname)
app.get('/',(req,res)=>{
      res.send("Server running")
})

app.get('/video',(req,res)=>{
      const file = `${__dirname}/public/video.mkv`;
      const range = req.headers.range;
      const stat = statSync(file);
      const fileSize = stat.size;
      if(!range){
           return res.status(400).send("Requires Range header")
      }

      const chunkSize = 10**6;
      const start = Number(range.replace(/\D/g,""));
      const end = Math.min(start + chunkSize, fileSize - 1);
      const contentLength = end - start + 1

      const header = {
            "Content-Range" : `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges" : "bytes",
            "Content-Length" : contentLength,
            "Content-Type" : "video/mp4"
      }
      
      res.writeHead(206, header)
      const fileStream = createReadStream(file,{
            start,
            end
      })
      fileStream.pipe(res)
})

app.listen(3000,()=>{
      console.log("server running on 3000")
})