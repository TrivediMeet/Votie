import { ZodError } from "zod"
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
import moment from "moment";
import { supportMimes } from "./config/filesystem.js";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import {v4 as uuid4} from "uuid";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const formateError = (error: any) => {
    let errors:any={}
    error.errors?.map((issue: { path: string[], message: string })=>
    {
        errors[issue.path[0]] = issue.message
    }
    )

    return errors;

}


export const renderEmailEjs = async (fileName: string, payload: any) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(
      __dirname + `/views/emails/${fileName}.ejs`,
      payload
    );
    return html;
  };

  export const checkDateHourDiff = (date:Date | string ):number =>{

    const now = moment();

    const tokenSendAt= moment(date);

    const differnece = moment.duration(now.diff(tokenSendAt)).asHours();

    return differnece;
  }


  export const imageValidator = (size:number,mime:string):string|null =>{
      
    if(bytesToMB(size) > 2){
        return "Image size must be less than 2MB";
    }
    else if(!supportMimes.includes(mime))
    {
        return "Image must be type of jpg,jpeg,gif,webp or png";
    }

    return null;

  }

  export const bytesToMB = (bytes:number):number =>{
    return bytes / (1024 * 1024);
  }

  export const uploadFile =  (image:UploadedFile) =>{

    const imgExt = image?.name.split(".")
    const imageName = uuid4() + "." + imgExt[1]
    const uploadPath = process.cwd() + "/public/images/" + imageName;
    
    image.mv(uploadPath,(err)=>{
        if(err){
            throw err;
        }
    })

    return imageName;
 
  }


  export const removeImage = (imageName:string) => {

    const path = process.cwd() + "/public/images/" + imageName;
    
    if(fs.existsSync(path))
    {
        fs.unlinkSync(path);

    }
  }