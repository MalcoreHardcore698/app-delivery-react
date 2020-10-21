import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from 'react-modal-hook'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Subtitle from './../ui/Subtitle'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import Button from './../ui/Button'
import { setForm } from '../../redux/actions'
import Loading from '../ui/Loading'
import FreightPiece from '../ui/FreightPiece'
import Member from '../ui/Member'
import Templates from '../modals/Templates'
import { SelectProps } from '../../utils/interfaces'

const defaultValues = [{ value: 'element', text: 'Элемент' }]

export default ({ jump, members }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [freightPieces, setFreightPieces]: any = useState([])
    const [isMore, setMore] = useState(false)

    const [showModal, hideModal] = useModal(() =>
        <Templates hideModal={hideModal} setMore={setMore} />
    , [setMore])

    const departureCityItemsList = state?.forwardingRequest?.departureCityItemsList || defaultValues
    const departureCityOptions = useMemo(() => departureCityItemsList
        .filter((f: SelectProps) => f && f?.text && f?.value)
        .map((city: SelectProps) => ({
            label: city.text, value: city.value
        }))
    , [departureCityItemsList])

    const destinationCityItemsList = state?.forwardingRequest?.destinationCityItemsList || defaultValues
    const destinationCityOptions = useMemo(() => destinationCityItemsList
        .filter((f: SelectProps) => f && f?.text && f?.value)
        .map((city: SelectProps) => ({
            label: city.text, value: city.value
        }))
    , [destinationCityItemsList])

    const handleSubmit: any = (form: any) => {
        if (isMore) jump('/services')
        dispatch(setForm({
            ...form,
            sender: {
                ...state.form?.sender,
                ...form.sender
            },
            recipient: {
                ...state.form?.recipient,
                ...form.recipient
            }
        }))
        setMore(true)
    }

    const handleAddPlace = (register: any, errors: any, getValues: any) => {
        dispatch(setForm(getValues()))
        setFreightPieces((prev: any) => ([
            ...prev, <FreightPiece
                register={register}
                errors={errors}
                index={prev.length + 1}
                getValues={getValues}
            />
        ]))
    }

    const handleRemovePlace: any = (index: number, getValues: any) => {
        dispatch(setForm(getValues()))
        setFreightPieces((prev: any) => prev.filter((_: any, i: number) => i !== index))
    }

    useEffect(() => {
        if (!state.form?.freightPieces) {
            dispatch(setForm({
                freightPieces: [{
                    weight: null,
                    length: null,
                    width: null,
                    height: null,
                    description: null,
                    amount: null,
                    isTemperatureMode: null,
                    isOversizedFreight: null,
                    isFragileFreight: null,
                    isPalet: null
                }]
            }))
        }
    }, [state.form, dispatch])

    if (state.loading)
        return <Loading />

    return (
        <Form onSubmit={handleSubmit}>
            {({ register, errors, getValues, control }: any) => (
                <React.Fragment>
                    <Row>
                        <Button onClick={showModal}>Загрузить из шаблона</Button>
                    </Row>

                    <Row stretch>
                        <Column>
                            <Subtitle text="Откуда *" />

                            <Controller
                                as={<Select
                                    options={departureCityOptions}
                                    placeholder="Откуда"
                                    isSearchable
                                    isClearable
                                />}
                                name="departureCityId"
                                rules={{ required: true }}
                                control={control}
                                defaultValue={state.form?.departureCityId || null}
                            />
                        </Column>
                        <Column>
                            <Subtitle text="Куда *" />

                            <Controller
                                as={<Select
                                    options={destinationCityOptions}
                                    placeholder="Куда"
                                    isSearchable
                                    isClearable
                                />}
                                name="destinationCityId"
                                rules={{ required: true }}
                                control={control}
                                defaultValue={state.form?.destinationCityId || null}
                            />
                        </Column>
                    </Row>
            
                    <FreightPiece register={register} errors={errors} getValues={getValues} />

                    {freightPieces.map((place: any, index: number) => (
                        <Column key={index} classNames="place">
                            <hr />
                            {place}
                            <Button onClick={() => handleRemovePlace(index, getValues)} classNames="accent clear small">Удалить место</Button>
                        </Column>
                    ))}
                    
                    <Button onClick={() => handleAddPlace(register, errors, getValues)} classNames="accent clear small">Добавить еще место</Button>

                    {(isMore) && (
                        <React.Fragment>
                            <Row stretch nowrap>
                                <Column>
                                    <Subtitle text="Дата экспедирования *" />
                                    <Field>
                                        <Input
                                            type="date"
                                            name="forwardingDate"
                                            inputRef={register({ required: true })}
                                            classNames={(state.form && errors.forwardingDate) ? 'required' : ''}
                                            defaultValue={state.form?.forwardingDate || null}
                                            placeholder="Дата экспедирования"
                                        />
                                    </Field>
                                </Column>

                                <Column>
                                    <FieldSet title="Время забора *">
                                        <Field label="с">
                                            <Input
                                                type="time"
                                                name="timeFrom"
                                                inputRef={register({ required: true })}
                                                classNames={(state.form && errors.timeFrom) ? 'required' : ''}
                                                defaultValue={state.form?.timeFrom || null}
                                                placeholder="Начало"
                                            />
                                        </Field>

                                        <Field label="до">
                                            <Input
                                                type="time"
                                                name="timeTo"
                                                inputRef={register({ required: true })}
                                                classNames={(state.form && errors.timeTo) ? 'required' : ''}
                                                defaultValue={state.form?.timeTo || null}
                                                placeholder="Конец"
                                            />
                                        </Field>
                                    </FieldSet>
                                </Column>
                            </Row>

                            {members.map((member: any, index: number) =>
                                <Member
                                    key={index}
                                    member={member}
                                    register={register}
                                    errors={errors}
                                    control={control}
                                    getValues={getValues}
                                />
                            )}
                        </React.Fragment>
                    )}

                    <Row>
                        <Button type="submit" classNames="accent">Далее</Button>
                    </Row>
                </React.Fragment>
            )}
        </Form>
    )
}