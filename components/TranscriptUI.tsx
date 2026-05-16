import { Button } from "./ui/button"

type TranscriptUIProps = {
    transcription?: string
    setTranscription?: (value: string) => void
}

function TranscriptUI({
    transcription = "",
    setTranscription = () => {},
}: TranscriptUIProps) {
    return (
        <>
            <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                Transcription
            </h2>
            <p className="mt-4 rounded-md bg-gray-200 p-4 whitespace-pre-wrap text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                {transcription}
            </p>
            <Button className="mt-4" onClick={() => setTranscription("")}>
                Transcribe Another
            </Button>
        </>
    )
}

export { TranscriptUI }