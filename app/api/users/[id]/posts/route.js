import Prompt from "@models/prompt";
import { connecttoDB } from "@utils/database";



export const GET=async(request,{params})=>{
    try {
        await connecttoDB();

        const prompts=await Prompt.find({
            creator:params.id
        }).populate('creator');

        return new Response(JSON.stringify(prompts),{
            status:200
        });
    } catch (error) {
        return new Response("Failed to get the prompts you created ",{
            status:500
        });
    }
}
