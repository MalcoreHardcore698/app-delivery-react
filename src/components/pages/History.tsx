import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Table from '../ui/Table'
import Loading from '../ui/Loading'
import { forwardingNotes } from '../../redux/creators'

export default () => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [isFetching, setIsFetching] = useState(false);

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

    const handleScroll = useCallback(() => {
        const total = window.innerHeight + document.documentElement.scrollTop
        const offset = document.documentElement.offsetHeight

        if ((total !== offset) || isFetching) return

        setIsFetching(true)
    }, [isFetching])

    // Listening scroll event
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    // Setting new page
    useEffect(() => {
        if (!isFetching) return
        setIsFetching(false)
        setPage((prev: number) => prev + 1)
    }, [isFetching, dispatch, page])

    // Fetching notes
    useEffect(() => {
        dispatch(forwardingNotes(page))
    }, [dispatch, page])

    return (
        <div className="content">
            <Table columns={columns} data={data} />
            {(state.loading && (state.history.length > 0)) && <Loading />}
        </div>
    )
}