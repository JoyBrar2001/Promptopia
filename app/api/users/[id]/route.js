import User from "../../../../models/user";
import { connectToDB } from "../../../../utils/database";

export const GET = async (req, {params}) => {
  try {
    await connectToDB()
    const user = await User.findById(params.id)
    if(!user){
      return new Response("User does not exist", { status: 404 })
    }
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new Response("Unable to fetch user", { status: 500 })
  }
}