"use client"

import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
    const [mounted, setMounted] = useState(false)
    const [localStorageAvailable, setLocalStorageAvailable] = useState(false)
    const [password, setPassword] = useState("")

    useEffect(() => {
        try {
            localStorage.getItem("elevenLabsAPIKey")
            setLocalStorageAvailable(true)
        } catch (error) {
            console.error("Local storage is not available:", error)
        }
        setPassword(localStorage.getItem("elevenLabsAPIKey") || "")
        setMounted(true)
    }, [])

    async function clearAPIKey() {
        try {
            localStorage.removeItem("elevenLabsAPIKey")
            setLocalStorageAvailable(false)
            setPassword("")
            return { message: "API key cleared!" }
        } catch (error) {
            console.error("Failed to clear API key:", error)
            return new Response("Failed to clear API key. Please try again.", {
                status: 500,
            })
        }
    }

    async function setAPIKey() {
        if (!password) return

        try {
            localStorage.setItem("elevenLabsAPIKey", password)
            setLocalStorageAvailable(true)
            return { message: "API key saved!" }
        } catch (error) {
            console.error("Failed to save API key:", error)
            return new Response("Failed to save API key. Please try again.", {
                status: 500,
            })
        }
    }

    if (!mounted) {
        return (
        <div className="mx-8 mt-8 space-y-8 flex min-h-[50vh] flex-col items-center justify-start rounded-3xl border border-accent-foreground/1 bg-gray-100 p-8 transition-all duration-300 hover:border-accent-foreground/5 hover:shadow-xl/2 md:w-1/2 md:py-12 dark:bg-gray-900">
                <Skeleton className="h-10 w-40" />
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

            <div className="mt-6 flex flex-col items-center gap-6">
                <Field>
                    <FieldLabel htmlFor="password">
                        ElevenLabs API Key
                    </FieldLabel>
                    <Input
                        disabled={localStorageAvailable}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        type="password"
                        placeholder="API Key"
                    />
                    <FieldDescription>
                        Your API key is only ever stored locally.
                    </FieldDescription>
                </Field>
            </div>

            <div className="flex gap-2">
                <Button
                    disabled={!password || localStorageAvailable}
                    className="mt-6"
                    onClick={() => {
                        toast.promise(setAPIKey(), {
                            loading: "Saving API key...",
                            success: "API key saved!",
                            error: "Failed to save API key. Please try again.",
                        })
                    }}>
                    Save
                </Button>

                <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                        toast.promise(clearAPIKey(), {
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
