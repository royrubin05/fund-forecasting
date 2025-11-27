"use client"

import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    SortingState,
} from "@tanstack/react-table"
import { ArrowUpDown, Plus } from "lucide-react"
import { Investment } from "@/lib/types"

interface InvestmentGridProps {
    data: Investment[]
    setData: (data: Investment[]) => void
}

export function InvestmentGrid({ data, setData }: InvestmentGridProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])

    const columns: ColumnDef<Investment>[] = [
        {
            accessorKey: "name",
            header: "Company",
            cell: ({ row }) => (
                <div className="font-medium text-carta-text">{row.getValue("name")}</div>
            ),
        },
        {
            accessorKey: "sector",
            header: "Sector",
            cell: ({ row }) => <div className="text-carta-subtext">{row.getValue("sector")}</div>,
        },
        {
            accessorKey: "stage",
            header: "Stage",
            cell: ({ row }) => (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {row.getValue("stage")}
                </span>
            ),
        },
        {
            accessorKey: "entryYear",
            header: "Entry Year",
            cell: ({ row }) => <div className="text-center text-carta-subtext">{row.getValue("entryYear")}</div>,
        },
        {
            id: "totalCost",
            header: ({ column }) => {
                return (
                    <button
                        className="flex items-center"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Total Cost
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </button>
                )
            },
            cell: ({ row }) => {
                const total = row.original.checkSize + row.original.reserves;
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }).format(total)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            id: "realizedValue",
            header: "Realized Value",
            cell: ({ row }) => {
                const total = row.original.checkSize + row.original.reserves;
                const val = total * row.original.realizedMultiple;
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }).format(val)
                return <div className="text-right text-green-600">{formatted}</div>
            },
        },
        {
            id: "unrealizedValue",
            header: "Unrealized Value",
            cell: ({ row }) => {
                const total = row.original.checkSize + row.original.reserves;
                const val = total * row.original.unrealizedMultiple;
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }).format(val)
                return <div className="text-right text-carta-text">{formatted}</div>
            },
        },
        {
            id: "tvpi",
            header: "TVPI",
            cell: ({ row }) => {
                const tvpi = row.original.realizedMultiple + row.original.unrealizedMultiple;
                return <div className="text-right font-bold">{tvpi.toFixed(2)}x</div>
            },
        },
        {
            accessorKey: "exitYear",
            header: "Exit Year",
            cell: ({ row }) => <div className="text-right text-carta-subtext">{row.getValue("exitYear") || "-"}</div>,
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })

    const addInvestment = () => {
        const newInv: Investment = {
            id: Math.random().toString(36).substr(2, 9),
            name: "New Company",
            sector: "TBD",
            stage: "Seed",
            checkSize: 1000000,
            reserves: 0,
            entryYear: 1,
            exitYear: 0,
            realizedMultiple: 0,
            unrealizedMultiple: 1.0,
        }
        setData([...data, newInv])
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-carta-text">Portfolio Investments</h3>
                <button
                    onClick={addInvestment}
                    className="inline-flex items-center justify-center rounded-md bg-carta-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Investment
                </button>
            </div>
            <div className="rounded-md border bg-card">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        </div >
    )
}
