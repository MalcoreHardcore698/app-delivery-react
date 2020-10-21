import {
    loginSuccess,
    logoutSuccess,
    requestError,
    setForwardingRequest,
    setTemplates,
    setLoading,
    setNotes,
    setForm,
    clearForm
} from './actions'
import { apiHost } from '../utils/config'

// BEGIN AUTH
export const auth = () => {
    return async (dispatch: any) => {
        return await fetch(`${apiHost}/account/login`)
            .then((res) => res.json())
            .then((data) => dispatch(loginSuccess(data)))
            .catch(() => dispatch(requestError()))
    }
}

export const login = (form: any) => {
    const formData: any = new FormData()
    formData.append('tin', form.tin)
    formData.append('password', form.passwrod)

    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/account/login?tin=${form.tin}&password=${form.password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(form)
        })
            .then((res) => res.json())
            .then((data) => dispatch(loginSuccess(data)))
            .catch(() => dispatch(requestError()))
        
        dispatch(setLoading(false))
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))
        
        await fetch(`${apiHost}/account/logout`, {
            method: 'POST'
        })
            .then((res) => res.json())
            .then(() => dispatch(logoutSuccess()))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}
// END AUTH

// BEGIN FORWARDING REQUEST
export const forwardingRequest = (id?: number) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/create?templateId=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (id) {
                    const departureCityId = {
                        value: data.departureCityId,
                        label: data.departureCityItemsList.find(
                            (city: any) => ((+city.value) === data.departureCityId)
                        )?.text
                    }
                    const destinationCityId = {
                        value: data.destinationCityId,
                        label: data.destinationCityItemsList.find(
                            (city: any) => ((+city.value) === data.destinationCityId)
                        )?.text
                    }

                    dispatch(forwardingMemberInfo(data.senderId, 'sender'))
                    dispatch(forwardingMemberInfo(data.recipientId, 'recipient'))

                    dispatch(setForm({
                        departureCityId, destinationCityId,
                        forwardingDate: new Date(data.forwardingDate).toLocaleString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                        timeFrom: new Date(data.timeFrom).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit'}),
                        timeTo: new Date(data.timeTo).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit'}),
                        tariffType: data.tariffType,
                        isCrateRequired: data.isCrateRequired,
                        isCreateNew: data.isCreateNew,
                        isDeliveryRequired: data.isDeliveryRequired,
                        isIncludeVAT: data.isIncludeVAT,
                        isSameDayForwarding: data.isSameDayForwarding,
                        isSumIncludesVAT: data.isSumIncludesVAT,
                        isUrgentRequest: data.isUrgentRequest
                    }))
                } else {
                    dispatch(setForwardingRequest(data))
                }
            
            })
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}

export const forwardingRequestCreate = (form: any) => {
    const document: any = {
        departureCityId: form.departureCityId.value,
        destinationCityId: form.destinationCityId.value,

        senderId: form.sender.id,
        recipientId: form.recipient.id,
        tariffType: form.tariffType.value,
        freightPieces: form.freightPieces,

        forwardingDate: form.forwardingDate,
        timeFrom: form.timeFrom,
        timeTo: form.timeTo,

        isCreateRequired: form.isCreateRequired,
        isCreateNew: form.isCreateNew,
        isDeliveryRequired: form.isDeliveryRequired,
        isIncludeVAT: form.isIncludeVAT,
        isSameDayForwarding: form.isSameDayForwarding,
        isSumIncludesVAT: form.isSumIncludesVAT,
        isUrgentRequest: form.isUrgentRequest
    }

    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/create?forwardingRequestModel1=${JSON.stringify(document)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(document)
        })
            .then((res) => res.json())
            .then((data) => dispatch(setForm({ id: data.id })))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}

export const forwardingRequestTemplates = () => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/templateindex`)
            .then((res) => res.json())
            .then((data) => dispatch(setTemplates(data)))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}

export const forwardingRequestSaveTemplate = (id: any, name: string) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/saveastemplate?id=${id}&name=${name}`, {
            method: 'POST',
            body: JSON.stringify({ id, name })
        }).catch(() => dispatch(requestError()))

        dispatch(clearForm())
        dispatch(setLoading(false))
    }
}

export const forwardingRequestDeleteTemplate = (id: any) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/deleteTemplate?id=${id}`, {
            method: 'POST',
            body: JSON.stringify(id)
        }).catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}
// END FORWARDING REQUEST

// BEGIN FORWARDING NOTE
export const forwardingNotes = (page: number) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingnote?page=${page}`)
            .then((res) => res.json())
            .then((data) => dispatch(setNotes(data)))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}
// END FORWARDING NOTE

// BEGIN FORWARDING MEMBER
export const forwardingMemberInfo = (id: any, member: string) => {
    return async (dispatch: any) => {
        await fetch(`${apiHost}/home/forwardingMemberInfo?id=${id}`)
            .then((res) => res.json())
            .then((data) => dispatch(setForm({ [member]: data })))
            .catch(() => dispatch(requestError()))
    }
}
// END FORWARDING MEMBER