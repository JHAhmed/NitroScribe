import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ComponentProps } from "react"

type NavbarProps = {
    placeholder?: string
    id?: string
    items?: {
        label: string
        value: string
    }[]
    value?: string
    disabled?: boolean
    onValueChange?: (value: string) => void
}

const items = [
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
]

function Navbar({
    placeholder = "Language",
    value,
    id,
    onValueChange,
    disabled = false,
}: NavbarProps) {
    return (
        <nav className="max-w-7xl rounded-full border border-accent-foreground/1 bg-white p-1 transition-all duration-100 hover:border-accent-foreground/5 dark:bg-gray-900">
            <ul className="flex">
                {items.map((item) => (
                    <li
                        className="rounded-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                        key={item.href}>
                        <a
                            href={item.href}
                            className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export { Navbar }
