import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import useInfiniteScroll from 'react-infinite-scroll-hook'
import Table from '../ui/Table'
import Loading from '../ui/Loading'
import { forwardingNotes } from '../../redux/creators'

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    // eslint-disable-next-line
    const [page, setPage] = useState(1)

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
                Header: '№ Заказа',
                accessor: 'number',
            },
            {
                Header: 'Дата заказа',
                accessor: 'date',
            },
            {
                Header: (
                    <React.Fragment>
                        <span>Откуда</span>
                        <span>Куда</span>
                    </React.Fragment>
                ),
                accessor: 'points',
            },
            {
                Header: (
                    <React.Fragment>
                        <span>Отправитель</span>
                        <span>Получитель</span>
                    </React.Fragment>
                ),
                accessor: 'members',
            },
            {
                Header: (
                    <React.Fragment>
                        <span>Вес</span>
                        <span>Объем</span>
                    </React.Fragment>
                ),
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
        dispatch(forwardingNotes(page))
    }, [dispatch, page])

    return (    
        <div className="content">
            {(state.loading) ? <Loading /> : <Table columns={columns} data={data} />}
        </div>
    )
}