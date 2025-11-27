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
                const amount = parseFloat(row.getValue("checkSize") || "0") + parseFloat(row.getValue("reserves") || "0")
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount)
                return <div className="font-medium">{formatted}</div>
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    })

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-carta-text">Portfolio Investments</h3>
                <button
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => {
                        // Placeholder for adding new investment
                        console.log("Add investment clicked")
                    }}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Investment
                </button>
            </div>
            <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id} className="px-6 py-3">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b bg-white hover:bg-gray-50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4">
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
    )
}
