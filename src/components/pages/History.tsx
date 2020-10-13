import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import Table from '../ui/Table'
import {
    forwardingNotes
} from '../../redux/actions'

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const data: any = useMemo(
        () => {
            return state.history.map((trace: any) => ({
                number: trace?.number,
                date: <Moment date={trace?.date} format="DD.MM.YYYY" />,
                points: (
                    <React.Fragment>
                        <span>{trace?.departureCity?.description}</span>
                        <span>{trace?.destinationCity?.description}</span>
                    </React.Fragment>
                ),
                members: (
                    <React.Fragment>
                        <span>{trace?.sender?.fullName}</span>
                        <span>{trace?.recipient?.fullName}</span>
                    </React.Fragment>
                ),
                specification: (
                    <React.Fragment>
                        <span>{trace?.weight}</span>
                        <span>{trace?.volume}</span>
                    </React.Fragment>
                ),
                state: trace?.state || 'Прибыл на склад'
            }))
        },
        [state]
    )

    const columns: any = useMemo(
        () => [
            {
                Header: '№ Заказа',
                accessor: 'number',
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
                accessor: 'state',
            },
        ],
        []
    )

    useEffect(() => {
        dispatch(forwardingNotes())
    }, [dispatch])

    return (    
        <div className="content">
            <Table columns={columns} data={data} />
        </div>
    )
}