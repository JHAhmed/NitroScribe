import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ComponentProps } from "react"

type DropdownProps = {
    placeholder?: string
    id?: string
    items?: {
        label: string
        value: string
    }[]
    value?: string
    onValueChange?: (value: string) => void
} & ComponentProps<"button">

const items = [
    { label: "English", value: "english" },
    { label: "Tamil", value: "tamil" },
    { label: "Hindi", value: "hindi" },
    { label: "Auto", value: "auto" },
]

function Dropdown({
    placeholder = "Language",
    value,
    id,
    onValueChange,
    ...props
}: DropdownProps) {
    return (
        <Select disabled={props.disabled} onValueChange={onValueChange} value={value} {...props}>
            <SelectTrigger id={id} className="w-[180px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export { Dropdown }
