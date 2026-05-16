"use client"

import { TranscribeUI } from "@/components/TranscribeUI"
import { TranscriptUI } from "@/components/TranscriptUI"
import { useState } from "react"

export default function Page() {
    const [language, setLanguage] = useState("")
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [transcription, setTranscription] = useState("")
    const [password, setPassword] = useState("")

    async function uploadAudio() {
        if (!audioFile || !password) return

        const formData = new FormData()
        formData.append("audio", audioFile)
        formData.append("password", password)

        const res = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
        })

        const data = await res.json()
        console.log(data)
        if (res.ok) {
            setTranscription(data.transcription.text)
        } else {
            alert("Transcription failed: " + data.error)
        }
    }

    return (
        <div className="mx-8 flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-accent-foreground/1 bg-gray-100 p-6 transition-all duration-300 hover:border-accent-foreground/5 hover:shadow-xl/2 md:w-1/2 dark:bg-gray-900">
            {!transcription ? (
                <TranscribeUI
                    audioFile={audioFile}
                    setAudioFile={setAudioFile}
                    language={language}
                    setLanguage={setLanguage}
                    password={password}
                    setPassword={setPassword}
                    uploadAudio={uploadAudio}
                />
            ) : (
                <TranscriptUI
                    transcription={transcription}
                    setTranscription={setTranscription}
                />
            )}
        </div>
    )
}
