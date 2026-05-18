import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js"

export async function POST(request: Request) {
    const elevenlabs = new ElevenLabsClient({
        apiKey: process.env.ELEVENLABS_API_KEY,
    })

    const formData = await request.formData()

    const audio = formData.get("audio") as File
    const password = formData.get("password") as string

    if (password !== process.env.PASSWORD) {
        console.log("Unauthorized access attempt with password:", password)
        return new Response("Unauthorized", {
            status: 401,
        })
    }

    if (!(audio instanceof File)) {
        return new Response("No audio file uploaded", {
            status: 400,
        })
    }

    const arrayBuffer = await audio.arrayBuffer()
    const audioBlob = new Blob([await audio.arrayBuffer()], {
        type: "audio/mp3",
    })

    const transcription = await elevenlabs.speechToText.convert({
        file: audioBlob,
        modelId: "scribe_v2", // Model to use
        tagAudioEvents: true, // Tag audio events like laughter, applause, etc.
        languageCode: "eng", // Language of the audio file. If set to null, the model will detect the language automatically.
        diarize: true, // Whether to annotate who is speaking
    })

    console.log(transcription)

    return Response.json({
        transcription,
    })
}
