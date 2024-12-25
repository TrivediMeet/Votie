import { ZodError } from "zod"

export const formateError = (error: any) => {
    let errors:any={}
    error.errors?.map((issue: { path: string[], message: string })=>
    {
        errors[issue.path[0]] = issue.message
    }
    )

    return errors;

}
