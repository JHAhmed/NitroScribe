import { Button } from "./ui/button"

type TranscriptUIProps = {
    transcription?: string
    setTranscription?: (value: string) => void
    formatTranscription?: () => Promise<void>
}

function TranscriptUI({
    transcription = "",
    setTranscription = () => {},
    formatTranscription = () => Promise.resolve(),
}: TranscriptUIProps) {
    return (
        <>
            <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                Transcription
            </h2>
            <p className=" rounded-md bg-gray-200 my-4 p-4 whitespace-pre-wrap text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                {transcription}
            </p>
            <Button className="mt-4" disabled onClick={() => formatTranscription()}>
                Format
            </Button>
            <Button className="mt-4" variant="outline" onClick={() => setTranscription("")}>
                Transcribe Another
            </Button>
        </>
    )
}

export { TranscriptUI }