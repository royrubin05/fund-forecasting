"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table"

interface CashFlowRow {
    year: number
    capitalCall: number
    distribution: number
    netCashFlow: number
    cumulativeCall: number
    cumulativeDistribution: number
}

interface CashFlowTableProps {
    data: CashFlowRow[]
}

export function CashFlowTable({ data }: CashFlowTableProps) {
    const columns: ColumnDef<CashFlowRow>[] = [
        {
            accessorKey: "year",
            header: "Year",
            cell: ({ row }) => <div className="font-medium">Year {row.getValue("year")}</div>,
        },
        {
            accessorKey: "capitalCall",
            header: "Capital Called",
            cell: ({ row }) => {
                const val = row.getValue("capitalCall") as number;
                return <div className="text-right text-red-600">
                    {val > 0 ? `(${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)})` : '-'}
                </div>
            },
        },
        {
            accessorKey: "distribution",
            header: "Distributions",
            cell: ({ row }) => {
                const val = row.getValue("distribution") as number;
                return <div className="text-right text-green-600">
                    {val > 0 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val) : '-'}
                </div>
            },
        },
        {
            accessorKey: "netCashFlow",
            header: "Net Cash Flow",
            cell: ({ row }) => {
                const val = row.getValue("netCashFlow") as number;
                return <div className={`text-right font-medium ${val >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)}
                </div>
            },
        },
        {
            accessorKey: "cumulativeCall",
            header: "Cum. Called",
            cell: ({ row }) => {
                const val = row.getValue("cumulativeCall") as number;
                return <div className="text-right text-muted-foreground">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)}
                </div>
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <div className="rounded-md border bg-card">
            <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:first-child]:text-left">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="p-4 align-middle [&:first-child]:text-left text-right">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
