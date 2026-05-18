import { useState } from "react"
import { Button } from "./ui/button"
import { Copy, Check, ArrowLeft } from "@phosphor-icons/react"
import type { FormattedTranscript } from "@/app/api/format/route"

type FormattedOutputUIProps = {
    formattedData: FormattedTranscript
    onReset: () => void
}

const CATEGORIES = [
    {
        key: "roleLearningDevelopment" as const,
        title: "Role & Learning Development",
        gradient: "from-blue-500/10 to-cyan-500/10",
        darkGradient: "dark:from-blue-500/20 dark:to-cyan-500/20",
        borderColor: "border-blue-500/20 dark:border-blue-400/30",
        accentColor: "bg-blue-500",
        titleColor: "text-blue-700 dark:text-blue-300",
        bulletColor: "text-blue-500 dark:text-blue-400",
    },
    {
        key: "concernsConsiderations" as const,
        title: "Concerns / Considerations",
        gradient: "from-amber-500/10 to-orange-500/10",
        darkGradient: "dark:from-amber-500/20 dark:to-orange-500/20",
        borderColor: "border-amber-500/20 dark:border-amber-400/30",
        accentColor: "bg-amber-500",
        titleColor: "text-amber-700 dark:text-amber-300",
        bulletColor: "text-amber-500 dark:text-amber-400",
    },
    {
        key: "suggestionsAppreciations" as const,
        title: "Suggestions / Appreciations",
        gradient: "from-emerald-500/10 to-green-500/10",
        darkGradient: "dark:from-emerald-500/20 dark:to-green-500/20",
        borderColor: "border-emerald-500/20 dark:border-emerald-400/30",
        accentColor: "bg-emerald-500",
        titleColor: "text-emerald-700 dark:text-emerald-300",
        bulletColor: "text-emerald-500 dark:text-emerald-400",
    },
]

function CategoryCard({
    category,
    items,
}: {
    category: (typeof CATEGORIES)[number]
    items: string[]
}) {
    const [copied, setCopied] = useState(false)

    function handleCopy() {
        const text = items.map((item) => `• ${item}`).join("\n")
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <div
            className={`group relative flex flex-col overflow-hidden rounded-2xl border ${category.borderColor} bg-gradient-to-br ${category.gradient} ${category.darkGradient} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            {/* Accent bar */}
            <div className={`h-1 w-full ${category.accentColor}`} />

            <div className="flex flex-1 flex-col p-5">
                <h3
                    className={`text-lg font-semibold tracking-tight ${category.titleColor}`}>
                    {category.title}
                </h3>

                <ul className="mt-4 flex-1 space-y-2.5">
                    {items.length > 0 ? (
                        items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                                <span
                                    className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${category.accentColor}`}
                                />
                                <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                                    {item}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li className="text-sm italic text-gray-400 dark:text-gray-500">
                            No items found in this category.
                        </li>
                    )}
                </ul>

                <Button
                    variant="outline"
                    className={`mt-5 w-full gap-2 border ${category.borderColor} transition-all duration-200 hover:scale-[1.01]`}
                    onClick={handleCopy}>
                    {copied ? (
                        <>
                            <Check size={18} weight="bold" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy size={18} />
                            Copy
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}

function FormattedOutputUI({ formattedData, onReset }: FormattedOutputUIProps) {
    return (
        <div className="w-full animate-in fade-in duration-500">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-medium tracking-tight text-gray-900 dark:text-gray-100">
                    Formatted Output
                </h2>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={onReset}>
                    <ArrowLeft size={16} />
                    Start Over
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {CATEGORIES.map((category) => (
                    <CategoryCard
                        key={category.key}
                        category={category}
                        items={formattedData[category.key]}
                    />
                ))}
            </div>
        </div>
    )
}

export { FormattedOutputUI }
