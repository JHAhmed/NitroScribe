import { Dropdown } from "@/components/Dropdown"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type TranscribeUIProps = {
    audioFile?: File | null
    setAudioFile?: (value: File | null) => void
    language?: string
    setLanguage?: (value: string) => void
    password?: string
    setPassword?: (value: string) => void
    uploadAudio?: () => Promise<void>
    mounted?: boolean
}

function TranscribeUI({
    audioFile = null,
    setAudioFile = () => {},
    language = "",
    setLanguage = () => {},
    password = "",
    setPassword = () => {},
    mounted = false,
    uploadAudio = async () => {},
}: TranscribeUIProps) {
    return (
        <>
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                Nitro
                <span className="text-gray-600 dark:text-gray-400">Scribe</span>
            </h1>
            <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                Because Nitro {">"} Turbo
            </p>
            <div className="mt-6 flex flex-col items-center gap-6">
                <Field>
                    <FieldLabel htmlFor="audio">Audio</FieldLabel>
                    <Input
                        onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                                setAudioFile(file)
                            }
                        }}
                        id="audio"
                        type="file"
                        accept=".mp3, .aac, .wav, .flac"
                    />
                    <FieldDescription>
                        Select an audio file to upload.
                    </FieldDescription>
                </Field>

                <Field>
                    <FieldLabel htmlFor="language">Language</FieldLabel>
                    <Dropdown
                        disabled={!audioFile}
                        id="language"
                        value={language}
                        onValueChange={setLanguage}
                    />
                    <FieldDescription>
                        Select the language of the audio file.
                    </FieldDescription>
                </Field>

{mounted && !password && (
  <div className="w-full rounded-md border border-red-500/10 bg-red-50 p-2 text-center text-sm font-medium text-red-500 dark:bg-red-950/50">
    <p>You have not set your ElevenLabs API Key!</p>
  </div>
)}

            </div>
            <Button
                disabled={!audioFile || !language || !password}
                className="mt-6"
                onClick={() => {
                    toast.promise(uploadAudio(), {
                        loading: "Transcribing audio...",
                        success: "Transcription complete!",
                        error: "Transcription failed. Please try again.",
                    })
                }}>
                Transcribe
            </Button>
        </>
    )
}

export { TranscribeUI }
