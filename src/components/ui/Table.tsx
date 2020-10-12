import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { useTable } from 'react-table'

export default () => {
    const state: any = useSelector(state => state)

    const data: any = useMemo(
        () => {
            return state.history.map((trace: any) => ({
                id: trace.id,
                date: <Moment date={trace.createdAt} format="DD.MM.YYYY" />,
                points: (
                    <React.Fragment>
                        <span>{trace.cityFrom}</span>
                        <span>{trace.cityTo}</span>
                    </React.Fragment>
                ),
                members: (
                    <React.Fragment>
                        <span>{trace.sender.name}</span>
                        <span>{trace.reciever.name}</span>
                    </React.Fragment>
                ),
                specification: (
                    <React.Fragment>
                        <span>{trace.weight}</span>
                        <span>{trace.width}</span>
                    </React.Fragment>
                ),
                status: trace.status || 'Прибыл на склад'
            }))
        },
        [state]
    )

    const columns: any = useMemo(
        () => [
            {
                Header: '№ Заказа',
                accessor: 'id',
            },
            {
                Header: 'Дата заказа',
                accessor: 'date',
            },
            {
                Header: <React.Fragment><span>Откуда</span><span>Куда</span></React.Fragment>,
                accessor: 'points',
            },
            {
                Header: <React.Fragment><span>Отправитель</span><span>Получитель</span></React.Fragment>,
                accessor: 'members',
            },
            {
                Header: <React.Fragment><span>Вес</span><span>Объем</span></React.Fragment>,
                accessor: 'specification',
            },
            {
                Header: 'Статус груза',
                accessor: 'status',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data })

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