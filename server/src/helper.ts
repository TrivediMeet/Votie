import { ZodError } from "zod"
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from "ejs";
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