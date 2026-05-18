import { Button } from "./ui/button"
import { toast } from "sonner"

type TranscriptUIProps = {
    transcription?: string
    setTranscription?: (value: string) => void
    formatTranscription?: () => Promise<void>
    openAIKeyAvailable?: boolean
    isFormatting?: boolean
}

function TranscriptUI({
    transcription = "",
    setTranscription = () => {},
    formatTranscription = () => Promise.resolve(),
    openAIKeyAvailable = false,
    isFormatting = false,
}: TranscriptUIProps) {
    return (
        <>
            <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                Transcription
            </h2>
            <p className=" rounded-md bg-gray-200 my-4 p-4 whitespace-pre-wrap text-gray-900 dark:bg-gray-800 dark:text-gray-100 max-h-[40vh] overflow-y-auto">
                {transcription}
            </p>

            {!openAIKeyAvailable && (
                <div className="w-full rounded-md border border-amber-500/10 bg-amber-50 p-2 text-center text-sm font-medium text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 mb-2">
                    <p>Set your OpenAI API Key in Settings to enable formatting.</p>
                </div>
            )}

            <div className="flex gap-2">
                <Button
                    className="mt-4"
                    disabled={!openAIKeyAvailable || isFormatting}
                    onClick={() => {
                        toast.promise(formatTranscription(), {
                            loading: "Formatting transcript...",
                            success: "Formatting complete!",
                            error: "Formatting failed. Please try again.",
                        })
                    }}>
                    {isFormatting ? "Formatting..." : "Format"}
                </Button>
                <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => setTranscription("")}>
                    Transcribe Another
                </Button>
            </div>
        </>
    )
}

export { TranscriptUI }