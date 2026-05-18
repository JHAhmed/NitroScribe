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

            <nav className="max-w-7xl border border-accent-foreground/1 rounded-full transition-all duration-100 bg-white p-1 hover:border-accent-foreground/5 dark:bg-gray-900">
                <ul className="flex ">
                    {items.map((item) => (
                        <li className="rounded-full  px-4 py-2 hover:bg-gray-800" key={item.href}>
                            <a
                                href={item.href}
                                className="text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
    )
}

export { Navbar }
