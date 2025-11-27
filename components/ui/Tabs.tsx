import * as React from "react"
import { clsx } from "clsx"

interface TabsProps {
    defaultValue: string
    children: React.ReactNode
}

interface TabsListProps {
    children: React.ReactNode
}

interface TabsTriggerProps {
    value: string
    children: React.ReactNode
    activeValue?: string
    onClick?: (value: string) => void
}

interface TabsContentProps {
    value: string
    children: React.ReactNode
    activeValue?: string
}

export function Tabs({ defaultValue, children }: TabsProps) {
    const [activeValue, setActiveValue] = React.useState(defaultValue)

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeValue, setActiveValue } as any)
        }
        return child
    })

    return <div>{childrenWithProps}</div>
}

export function TabsList({ children, activeValue, setActiveValue }: any) {
    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { activeValue, onClick: setActiveValue } as any)
        }
        return child
    })

    return (
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {childrenWithProps}
        </div>
    )
}

export function TabsTrigger({ value, children, activeValue, onClick }: TabsTriggerProps) {
    const isActive = value === activeValue
    return (
        <button
            onClick={() => onClick?.(value)}
            className={clsx(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isActive ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground"
            )}
        >
            {children}
        </button>
    )
}

export function TabsContent({ value, children, activeValue }: TabsContentProps) {
    if (value !== activeValue) return null
    return <div className="mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">{children}</div>
}
