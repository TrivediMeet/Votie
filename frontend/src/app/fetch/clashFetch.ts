import { CLASH_URL } from "@/lib/apiEndPoints"

export async function fetchClashs(token:string){

    const res = await fetch(CLASH_URL ,{
        headers:{
            'Authorization': token
        },

        next:{
            revalidate:60*60,
            tags:["dashboard"],
        }
    })

    if(!res.ok)
    {
        throw new Error('Failed to fetch data')
    }

    const responece = await res.json()

    if(responece?.data)
    {
        return responece?.data
    }
    return [];

    
}