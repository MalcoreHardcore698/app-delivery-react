import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from 'react-modal-hook'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Subtitle from './../ui/Subtitle'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Button from './../ui/Button'
import Loading from '../ui/Loading'
import FreightPiece from '../ui/FreightPiece'
import Member from '../ui/Member'
import Templates from '../modals/Templates'
import { setForm } from '../../redux/actions'
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
        if (isMore) jump('/addition')
    }

    const handleAddPlace = (register: any, errors: any, setValue: any, getValues: any) => {
        dispatch(setForm(getValues()))
        setFreightPieces((prev: any) => ([
            ...prev, <FreightPiece
                register={register}
                errors={errors}
                index={prev.length + 1}
                setValue={setValue}
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
            {({ register, errors, control, setValue, getValues }: any) => (
                <React.Fragment>
                    <Button onClick={showModal}>Загрузить из шаблона</Button>

                    <Row grid col2>
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
            
                    <FreightPiece register={register} errors={errors} setValue={setValue} getValues={getValues} />

                    {freightPieces.map((place: any, index: number) => (
                        <Column key={index} classNames="place">
                            <hr />
                            {place}
                            <Button onClick={() => handleRemovePlace(index, getValues)} classNames="accent clear small">Удалить место</Button>
                        </Column>
                    ))}
                    
                    <Button onClick={() => handleAddPlace(register, errors, setValue, getValues)} classNames="accent clear small">Добавить еще место</Button>

                    {(isMore) && (
                        <React.Fragment>
                            <Row stretch nowrap>
                                <Column>
                                    <Subtitle text="Дата экспедирования *" />
                                    <Field>
                                        <Controller
                                            name="forwardingDate"
                                            control={control}
                                            defaultValue={state.form?.forwardingDate || null}
                                            rules={{ required: true }}
                                            render={props => (
                                                <DatePicker
                                                    {...props}
                                                    placeholderText="Дата экспедирования"
                                                    selected={props.value}
                                                    className={(state.form && errors.forwardingDate) ? 'required' : ''}
                                                />
                                            )}
                                        />
                                    </Field>
                                </Column>

                                <Column>
                                    <FieldSet title="Время забора *">
                                        <Field label="с">
                                            <Controller
                                                name="timeFrom"
                                                control={control}
                                                defaultValue={state.form?.timeFrom || null}
                                                rules={{ required: true }}
                                                render={props => (
                                                    <DatePicker
                                                        {...props}
                                                        placeholderText="Начало"
                                                        selected={props.value}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={5}
                                                        timeCaption="Время"
                                                        dateFormat="h:mm aa"
                                                        className={(state.form && errors.timeFrom) ? 'required' : ''}
                                                    />
                                                )}
                                            />
                                        </Field>

                                        <Field label="до">
                                            <Controller
                                                name="timeTo"
                                                control={control}
                                                defaultValue={state.form?.timeTo || null}
                                                rules={{ required: true }}
                                                render={props => (
                                                    <DatePicker
                                                        {...props}
                                                        placeholderText="Конец"
                                                        selected={props.value}
                                                        showTimeSelect
                                                        showTimeSelectOnly
                                                        timeIntervals={5}
                                                        timeCaption="Время"
                                                        dateFormat="h:mm aa"
                                                        className={(state.form && errors.timeTo) ? 'required' : ''}
                                                    />
                                                )}
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

                    <Button type="submit" classNames="accent">Далее</Button>
                </React.Fragment>
            )}
        </Form>
    )
}