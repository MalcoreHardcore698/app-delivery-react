import {
    loginSuccess,
    logoutSuccess,
    requestError,
    addToHistory,
    saveTemplate,
    setForwardingRequest,
    setTemplates,
    setLoading,
    setNotes,
    deleteTemplate
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
export const forwardingRequest = () => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/create`)
            .then((res) => res.json())
            .then((data) => dispatch(setForwardingRequest(data)))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}

export const forwardingRequestCreate = (form: any) => {
    const document: any = {
        ...form,
        departureCityId: form.departureCityId.value,
        destinationCityId: form.destinationCityId.value,
        sender: {
            ...form.sender,
            name: form.sender.name.value
        },
        recipient: {
            ...form.recipient,
            name: form.recipient.name.value
        },
        tariffType: form.tariffType.value
    }

    const formData = new FormData()
    formData.append('payer', form.payer)
    formData.append('departureCityId', form.departureCityId.value)
    formData.append('destinationCityId', form.destinationCityId.value)
    formData.append('senderId', form.sender.name)
    formData.append('recipientId', form.recipient.name)
    formData.append('tariffType', form.tariffType)
    formData.append('timeFrom', form.timeFrom)
    formData.append('timeTo', form.timeTo)
    formData.append('isCreateRequired', form.isCreateRequired)
    formData.append('isCreateNew', form.isCreateNew)
    formData.append('isDeliveryRequired', form.isDeliveryRequired)
    formData.append('isIncludeVAT', form.isIncludeVAT)
    formData.append('isSameDayForwarding', form.isSameDayForwarding)
    formData.append('isSumIncludesVAT', form.isSumIncludesVAT)
    formData.append('isUrgentRequest', form.isUrgentRequest)

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
            .then((data) => dispatch(addToHistory(data)))
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

export const forwardingRequestSaveTemplate = (template: any) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/saveastemplate`, {
            method: 'POST',
            body: JSON.stringify(template)
        })
            .then((res) => res.json())
            .then((data) => dispatch(saveTemplate(data)))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}

export const forwardingRequestDeleteTemplate = (template: any) => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingrequest/deletetemplateconfirmed`, {
            method: 'POST',
            body: JSON.stringify(template)
        })
            .then((res) => res.json())
            .then((data) => dispatch(deleteTemplate(data)))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}
// END FORWARDING REQUEST

// BEGIN FORWARDING NOTE
export const forwardingNotes = () => {
    return async (dispatch: any) => {
        dispatch(setLoading(true))

        await fetch(`${apiHost}/forwardingnote`)
            .then((res) => res.json())
            .then((data) => dispatch(setNotes(data)))
            .catch(() => dispatch(requestError()))

        dispatch(setLoading(false))
    }
}
// END FORWARDING NOTE