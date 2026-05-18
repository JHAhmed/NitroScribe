"use client"

import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

type KeyConfig = {
    storageKey: string
    label: string
    description: string
    placeholder: string
}

const API_KEYS: KeyConfig[] = [
    {
        storageKey: "elevenLabsAPIKey",
        label: "ElevenLabs API Key",
        description: "Used for audio/video transcription.",
        placeholder: "sk_...",
    },
    {
        storageKey: "openAIAPIKey",
        label: "OpenAI API Key",
        description: "Used for formatting transcripts with structured outputs.",
        placeholder: "sk-...",
    },
]

function APIKeyField({
    config,
    mounted,
}: {
    config: KeyConfig
    mounted: boolean
}) {
    const [value, setValue] = useState("")
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        if (!mounted) return
        const stored = localStorage.getItem(config.storageKey) || ""
        setValue(stored)
        setIsSaved(!!stored)
    }, [mounted, config.storageKey])

    async function saveKey() {
        if (!value) return
        try {
            localStorage.setItem(config.storageKey, value)
            setIsSaved(true)
            return { message: "API key saved!" }
        } catch (error) {
            console.error("Failed to save API key:", error)
            throw new Error("Failed to save API key. Please try again.")
        }
    }

    async function clearKey() {
        try {
            localStorage.removeItem(config.storageKey)
            setIsSaved(false)
            setValue("")
            return { message: "API key cleared!" }
        } catch (error) {
            console.error("Failed to clear API key:", error)
            throw new Error("Failed to clear API key. Please try again.")
        }
    }

    return (
        <div className="w-full">
            <Field>
                <FieldLabel htmlFor={config.storageKey}>
                    {config.label}
                </FieldLabel>
                <Input
                    disabled={isSaved}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id={config.storageKey}
                    type="password"
                    placeholder={config.placeholder}
                />
                <FieldDescription>{config.description}</FieldDescription>
            </Field>
            <div className="mt-3 flex gap-2">
                <Button
                    disabled={!value || isSaved}
                    size="sm"
                    onClick={() => {
                        toast.promise(saveKey(), {
                            loading: "Saving API key...",
                            success: "API key saved!",
                            error: "Failed to save API key. Please try again.",
                        })
                    }}>
                    Save
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={!isSaved}
                    onClick={() => {
                        toast.promise(clearKey(), {
                            loading: "Clearing API key...",
                            success: "API key cleared!",
                            error: "Failed to clear API key. Please try again.",
                        })
                    }}>
                    Clear
                </Button>
            </div>
        </div>
    )
}

export default function Page() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="mx-8 mt-8 space-y-8 flex min-h-[50vh] flex-col items-center justify-start rounded-3xl border border-accent-foreground/1 bg-gray-100 p-8 transition-all duration-300 hover:border-accent-foreground/5 hover:shadow-xl/2 md:w-1/2 md:py-12 dark:bg-gray-900">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-52" />
            </div>
        )
    }

    return (
        <div className="mx-8 mt-8 flex min-h-[50vh] flex-col items-center justify-start rounded-3xl border border-accent-foreground/1 bg-gray-100 p-8 transition-all duration-300 hover:border-accent-foreground/5 hover:shadow-xl/2 md:w-1/2 md:py-12 dark:bg-gray-900">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                Settings
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your API keys are only ever stored locally in your browser.
            </p>

            <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-8">
                {API_KEYS.map((config) => (
                    <APIKeyField
                        key={config.storageKey}
                        config={config}
                        mounted={mounted}
                    />
                ))}
            </div>
        </div>
    )
}
