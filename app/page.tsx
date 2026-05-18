"use client"

import { TranscribeUI } from "@/components/TranscribeUI"
import { TranscriptUI } from "@/components/TranscriptUI"
import { FormattedOutputUI } from "@/components/FormattedOutputUI"
import { useEffect, useState } from "react"
import type { FormattedTranscript } from "@/app/api/format/route"

export default function Page() {
    const [language, setLanguage] = useState("")
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [transcription, setTranscription] = useState(
        "Because democracy basically means government by the people, of the people, for the people. But the people are retarded"
    )
    const [password, setPassword] = useState("")
    const [openAIAPIKey, setOpenAIAPIKey] = useState("")
    const [mounted, setMounted] = useState(false)
    const [formattedData, setFormattedData] =
        useState<FormattedTranscript | null>(null)
    const [isFormatting, setIsFormatting] = useState(false)

    useEffect(() => {
        setMounted(true)
        setPassword(localStorage.getItem("elevenLabsAPIKey") || "")
        setOpenAIAPIKey(localStorage.getItem("openAIAPIKey") || "")
    }, [])

    async function uploadAudio() {
        if (!audioFile) return

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
            return data
        } else {
            return new Response(data.message || "Something went wrong", {
                status: res.status,
            })
        }
    }

    async function formatTranscription() {
        if (!transcription) return

        setIsFormatting(true)
        try {
            const res = await fetch("/api/format", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ transcription, openAIAPIKey }),
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setFormattedData(data.formattedTranscript)
                return data
            } else {
                throw new Error(data.message || "Something went wrong")
            }
        } finally {
            setIsFormatting(false)
        }
    }

    function handleReset() {
        setTranscription("")
        setFormattedData(null)
        setAudioFile(null)
        setLanguage("")
    }

    return (
        <div
            className={`mx-8 mt-8 flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-accent-foreground/1 bg-gray-100 p-4 transition-all duration-300 hover:border-accent-foreground/5 hover:shadow-xl/2 md:p-8 dark:bg-gray-900 ${formattedData ? "w-full max-w-6xl" : "md:w-1/2"}`}>
            {formattedData ? (
                <FormattedOutputUI
                    formattedData={formattedData}
                    onReset={handleReset}
                />
            ) : !transcription ? (
                <TranscribeUI
                    audioFile={audioFile}
                    setAudioFile={setAudioFile}
                    language={language}
                    setLanguage={setLanguage}
                    uploadAudio={uploadAudio}
                    password={password}
                    mounted={mounted}
                    setPassword={setPassword}
                />
            ) : (
                <TranscriptUI
                    transcription={transcription}
                    setTranscription={setTranscription}
                    formatTranscription={formatTranscription}
                    openAIKeyAvailable={!!openAIAPIKey}
                    isFormatting={isFormatting}
                />
            )}
        </div>
    )
}
