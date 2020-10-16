import React, { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../ui/Table'
import { forwardingNotes } from '../../redux/actions'

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const data: any = useMemo(
        () => {
            if (!Array.isArray(state.history)) return null
            return state.history.map((trace: any) => ({
                number: trace?.number,
                date: new Date(trace?.date).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
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
                state: trace?.getStateName
            }))
        },
        [state]
    )

    const columns: any = useMemo(
        () => [
            {
                header: '№ Заказа',
                accessor: 'number',
            },
            {
                header: 'Дата заказа',
                accessor: 'date',
            },
            {
                header: (
                    <React.Fragment>
                        <span>Откуда</span>
                        <span>Куда</span>
                    </React.Fragment>
                ),
                accessor: 'points',
            },
            {
                header: (
                    <React.Fragment>
                        <span>Отправитель</span>
                        <span>Получитель</span>
                    </React.Fragment>
                ),
                accessor: 'members',
            },
            {
                header: (
                    <React.Fragment>
                        <span>Вес</span>
                        <span>Объем</span>
                    </React.Fragment>
                ),
                accessor: 'specification',
            },
            {
                header: 'Статус груза',
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