import Prompt from "../../../../models/prompt"
import { connectToDB } from "../../../../utils/database"

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) {
      return new Response(JSON.stringify("Prompt not found"), { status: 404 })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response(`Failed to create a new prompt, error : ${error}`, { status: 500 })
  }
}

export const PATCH = async (req, { params }) => {
  try {
    const { prompt, tag } = await req.json();

    await connectToDB();

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.id,
      { prompt, tag },
      { new: true }
    );

    if (!updatedPrompt) {
      return new Response(JSON.stringify("Prompt not found"), { status: 404 });
    }

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    console.error('Error updating prompt:', error);
    return new Response(JSON.stringify(`Failed to edit the prompt, error: ${error}`), { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response(JSON.stringify("Prompt deleted successfully"), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify(`Failed to delete the prompt, error : ${error}`), { status: 500 })
  }
}