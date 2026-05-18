"use client"

import { TranscribeUI } from "@/components/TranscribeUI"
import { TranscriptUI } from "@/components/TranscriptUI"
import { useEffect, useState } from "react"

export default function Page() {
    const [language, setLanguage] = useState("")
    const [audioFile, setAudioFile] = useState<File | null>(null)
    const [transcription, setTranscription] = useState("")
    const [password, setPassword] = useState("")
const [mounted, setMounted] = useState(false)


    useEffect(() => {
        setMounted(true)
        setPassword(localStorage.getItem("elevenLabsAPIKey") || "")
    }, [])

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
            return data
        } else {
            return new Response(data.message || "Something went wrong", {
                status: res.status,
            })
        }
    }

    async function formatTranscription() {
        if (!transcription || !password) return
        const res = await fetch("/api/format", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ transcription, password }),
        })
        const data = await res.json()
        if (res.ok) {
            setTranscription(data.formattedTranscription)
            return data
        } else {
            return new Response(data.message || "Something went wrong", {
                status: res.status,
            })
        }
    }

    return (
        <div className="mx-8 mt-8 p-4 md:p-8 flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border border-accent-foreground/1 bg-gray-100 transition-all duration-300 hover:border-accent-foreground/5 hover:shadow-xl/2 md:w-1/2 dark:bg-gray-900">
            {!transcription ? (
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
                />
            )}
        </div>
    )
}
