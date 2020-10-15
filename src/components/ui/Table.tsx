import React from 'react'
import { useTable } from 'react-table'

export default ({ columns, data }: any) => {
    const tableInstance = useTable({
        columns: Array.isArray(columns) ? columns : [],
        data: Array.isArray(data) ? data : []
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup: any) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column: any) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            <tbody {...getTableBodyProps()}>
                {(rows.length > 0) ? rows.map((row: any) => {
                    prepareRow(row)

                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell: any) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                }) : <tr><td colSpan={6}>Отсутствуют заказы</td></tr>}
            </tbody>
        </table>
    )
}