import React, { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from 'react-modal-hook'
import { Controller } from 'react-hook-form'
import Modal from 'react-modal'
import Select from 'react-select'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Subtitle from './../ui/Subtitle'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import TextArea from './../ui/TextArea'
import Checkbox from './../ui/Checkbox'
import Radiobox from './../ui/Radiobox'
import Button from './../ui/Button'
import DefinitionList from './../ui/DefinitionList'
import Definition from './../ui/Definition'
import { setForm } from '../../redux/actions'
import {
    forwardingRequest,
    forwardingRequestCreate,
    forwardingRequestSaveTemplate,
    forwardingRequestTemplates,
    forwardingMemberInfo
} from '../../redux/creators'
import Loading from '../ui/Loading'

interface SelectItemProps {
    disabled: boolean,
    group: string,
    selected: boolean,
    text: string,
    value: string
}

const defaultValues = [{ value: 'element', text: 'Элемент' }]

const GeneralFields = ({ register, errors, control, getValues }: any) => {
    const state: any = useSelector(state => state)

    const departureCityItemsList = state?.forwardingRequest?.departureCityItemsList || defaultValues
    const departureCityOptions = useMemo(() => departureCityItemsList
        .filter((f: SelectItemProps) => f && f?.text && f?.value)
        .map((city: SelectItemProps) => ({
            label: city.text, value: city.value
        }))
    , [departureCityItemsList])

    const destinationCityItemsList = state?.forwardingRequest?.destinationCityItemsList || defaultValues
    const destinationCityOptions = useMemo(() => destinationCityItemsList
        .filter((f: SelectItemProps) => f && f?.text && f?.value)
        .map((city: SelectItemProps) => ({
            label: city.text, value: city.value
        }))
    , [destinationCityItemsList])
    
    return (
        <React.Fragment>
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
    
            <Place register={register} errors={errors} getValues={getValues} />
        </React.Fragment>
    )
}
const ModalTemplates = ({ hideModal, setMore }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [id, setId] = useState()

    const handleSubmit = () => {
        if (id) {
            dispatch(forwardingRequest(id))
            hideModal()
            setMore(true)
        }
    }

    useEffect(() => {
        dispatch(forwardingRequestTemplates())
    }, [dispatch])

    return (
        <Modal isOpen>
            <Subtitle text="Выберите шаблон" />
            {(state.templates.length > 0) ? <ul className="templates">
                {state.templates.map((template: any, index: number) =>
                    <li
                        key={index}
                        className={`template${(id === template.id) ? ' checked' : ''}${(state.templates.length === 1) ? ' alone' : ''}`}
                        onClick={() => setId((id === template.id) ? null : template.id)}
                    >
                            {template.name}
                    </li>
                )}
            </ul> : <p>У вас нету сохраненных шаблонов</p>}
            <Row stretch>
                <Button disabled={!id} onClick={handleSubmit}>Загрузить</Button>
                <Button onClick={hideModal}>Отмена</Button>
            </Row>
        </Modal>
    )
}

export const Introduction: any = ({ jump, members }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [freightPieces, setFreightPieces]: any = useState([])
    const [isMore, setMore] = useState(false)

    const [showModal, hideModal] = useModal(() =>
        <ModalTemplates hideModal={hideModal} setMore={setMore} />
    , [setMore])

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
            ...prev, <Place
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

                    <GeneralFields register={register} errors={errors} control={control} getValues={getValues} />

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
                                    <FieldSet title="Время забора">
                                        <Field label="с">
                                            <Input
                                                type="time"
                                                name="timeFrom"
                                                inputRef={register()}
                                                classNames={(state.form && errors.timeFrom) ? 'required' : ''}
                                                defaultValue={state.form?.timeFrom || null}
                                                placeholder="Начало"
                                            />
                                        </Field>

                                        <Field label="до">
                                            <Input
                                                type="time"
                                                name="timeTo"
                                                inputRef={register()}
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

export const Services: any = ({ back, jump }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit: any = (form: any) => {
        dispatch(setForm({ tariffType: form?.tariffType }))

        jump('/preview')
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ control, getValues }: any) => (
                <React.Fragment>
                    <Button classNames="accent clear back" onClick={() => back()}>Назад</Button>

                    <Column>
                        <Subtitle text="Тип тарифа" />
                        <Controller
                            as={<Select
                                options={(state?.forwardingRequest?.tariffTypes || []).map((city: SelectItemProps) => ({
                                    label: city.text, value: city.value
                                }))}
                                placeholder="Тип тарифа"
                                isSearchable
                                isClearable
                            />}
                            name="tariffType"
                            rules={{ required: true }}
                            control={control}
                            defaultValue={state.form?.tariffType || null}
                        />

                        <Subtitle text="Плательщик" />
                        <Radiobox
                            name="payer"
                            onChange={(e: any) => dispatch(setForm({
                                ...getValues(),
                                payer: e.value
                            }))}
                            list={[
                                { value: 'sender', label: 'Отправитель' },
                                { value: 'recipient', label: 'Получатель' },
                                { value: 'another', label: 'Третье лицо' }
                            ]}
                        />

                        <Subtitle text="Дополнительные услуги" />
                        <Checkbox
                            source={state.form}
                            onChange={(e: any) => dispatch(setForm({
                                ...getValues(),
                                [e]: (state.form[e]) ? !state.form[e] : true
                            }))}
                            list={[
                                { value: 'isCreateRequired', label: 'Обрешетка' },
                                { value: 'isCreateNew', label: 'Доупаковка' },
                                { value: 'isDeliveryRequired', label: 'Грузчики' },
                                { value: 'isIncludeVAT', label: 'Учитывать НДС' },
                                { value: 'isSameDayForwarding', label: 'Отправка день в день' },
                                { value: 'isSumIncludesVAT', label: 'Сумма Включает НДС' },
                                { value: 'isUrgentRequest', label: 'Срочная заявка' }
                            ]}
                        />
                    </Column>

                    <Row>
                        <Button type="submit">Предпросмотр</Button>
                    </Row>
                </React.Fragment>
            )}
        </Form>
    )
}


export const Preview: any = ({ back, jump, text="Отправить заказ" }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleAddToHistory = () => {
        dispatch(forwardingRequestCreate(state.form))
        jump('/done')
    }

    return (
        <div className="preview">
            <Button classNames="accent clear back" onClick={() => back()}>Назад</Button>
    
            {(state.form) ? (
                <Column>
                    {(state?.form?.offerType && (
                        <DefinitionList>
                            <Definition text="Вид заявки" detail={state?.form?.tariffType} />
                        </DefinitionList>
                    ))}

                    <DefinitionList>
                        <Definition text="Откуда" detail={state?.form?.departureCityId?.label} />
                    </DefinitionList>

                    <DefinitionList>
                        <Definition text="Куда" detail={state?.form?.destinationCityId?.label} />
                    </DefinitionList>

                    {(state?.form?.freightPieces.length > 0) &&
                    <DefinitionList>
                        {state?.form?.freightPieces.map((freightPiece: any, index: number) =>
                            <Definition key={index} text="Параметры мест" detail={`${freightPiece?.weight} кг, ${freightPiece?.length}x${freightPiece?.width}x${freightPiece?.height} м`} />
                        )}
                    </DefinitionList>}

                    {(state?.form?.forwardingDate) &&
                    <DefinitionList>
                        <Definition
                            text="Дата экспедирвоания"
                            detail={new Date(state?.form?.forwardingDate).toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        />
                    </DefinitionList>}
                    
                    {(state?.form?.timeFrom && state?.form?.timeTo) &&
                    <DefinitionList>
                        <Definition text="Время" detail={(
                            <React.Fragment>
                                <span>с </span>
                                {state?.form?.timeFrom}
                                <span> до </span>
                                {state?.form?.timeTo}
                            </React.Fragment>
                        )} />
                    </DefinitionList>}
                    
                    <DefinitionList>
                        <Definition text="Отправитель" detail={(
                            <React.Fragment>
                                {[
                                    state?.form?.sender?.fullName,
                                    state?.form?.sender?.phoneNumber,
                                    state?.form?.sender?.street
                                ]
                                    .filter(item => item)
                                    .join(', ')
                                }
                            </React.Fragment>
                        )} />
                    </DefinitionList>
                    
                    <DefinitionList>
                        <Definition text="Получатель" detail={(
                            <React.Fragment>
                                {[
                                    state?.form?.recipient?.fullName,
                                    state?.form?.recipient?.phoneNumber,
                                    state?.form?.recipient?.street
                                ]
                                    .filter(item => item)
                                    .join(', ')
                                }
                            </React.Fragment>
                        )} />
                    </DefinitionList>
                    
                    {(state?.form?.services?.length > 0) && (
                        <DefinitionList>
                            <Definition text="Дополнительные услуги" detail={state?.form?.services?.map((service: any) => service.label).join(', ')} />
                        </DefinitionList>
                    )}
                </Column>
            ) : <p>Form is undefined</p>}
    
            <Row>
                <Button onClick={handleAddToHistory} classNames="accent">{text}</Button>
            </Row>
        </div>
    )
}

const ModalTemplate = ({ jump, hideModal }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = (form: any) => {
        dispatch(forwardingRequestSaveTemplate(state.form.id, form.name))

        hideModal()
        jump('/')
    }

    return (
        <Modal isOpen>
            <Form onSubmit={handleSubmit}>
                {({ register, errors }: any) => (
                    <React.Fragment>
                        <Subtitle text="Введите название шаблона" />
                        <Row stretch padding>
                            <Input
                                type="text"
                                name="name"
                                inputRef={register({ required: true })}
                                classNames={(errors && errors.name) ? 'required' : ''}
                                placeholder="Название шаблона"
                            />
                        </Row>
                        <Row stretch>
                            <Button type="submit">Сохранить шаблон</Button>
                            <Button onClick={hideModal}>Отмена</Button>
                        </Row>
                    </React.Fragment>
                )}
            </Form>
        </Modal>
    )
}

export const Conclusion: any = ({ jump, text="Сохранить шаблон" }: any) => {
    const state: any = useSelector(state => state)

    const [showModal, hideModal] = useModal(() =>
        <ModalTemplate jump={jump} hideModal={hideModal} />
    , [jump])

    if (state.loading && !state.form.id)
        return <Loading />

    return (
        <React.Fragment>
            <h2>Заказ создан!</h2>
            <Row>
                <Button onClick={showModal}>{text}</Button>
                <Button onClick={() => jump('/offer')} classNames="accent">Новая заявка</Button>
            </Row>
        </React.Fragment>
    )
}

export const Place: any = ({ index=0, register, errors, getValues }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const freightPieces = state?.form?.freightPieces
    const freightPiece = (freightPieces) ? freightPieces[index] : null
    
    return (
        <React.Fragment>
            <FieldSet title="Параметры мест *">
                <Field label="кг" position="right">
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][weight]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[freightPieces][${index}][weight]`]) ? 'required' : ''}
                        defaultValue={freightPiece?.weight}
                        placeholder="Вес"
                    />
                </Field>

                <Field label="м" position="right">
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][length]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[freightPieces][${index}][length]`]) ? 'required' : ''}
                        defaultValue={freightPiece?.length}
                        placeholder="Д"
                    />
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][width]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[freightPieces][${index}][width]`]) ? 'required' : ''}
                        defaultValue={freightPiece?.width}
                        placeholder="Ш"
                    />
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][height]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[freightPieces][${index}][height]`]) ? 'required' : ''}
                        defaultValue={freightPiece?.height}
                        placeholder="В"
                    />
                </Field>
            </FieldSet>
            <Row stretch>
                <Input
                    type="text"
                    inputRef={register()}
                    name={`[freightPieces][${index}][description]`}
                    defaultValue={freightPiece?.description}
                    placeholder="Описание груза"
                />
                <Input
                    type="number"
                    inputRef={register()}
                    name={`[freightPieces][${index}][amount]`}
                    defaultValue={freightPiece?.amount}
                    placeholder="Количество груза"
                />
            </Row>

            {(state.form.freightPieces && state.form.freightPieces[index]) && <Checkbox
                source={state.form.freightPieces[index]}
                onChange={(e: any) => dispatch(setForm({
                    ...getValues(),
                    freightPieces: state.form.freightPieces.map((freightPiece: any, key: number) => {
                        const checkbox = freightPiece[e]

                        return (index === key) ? ({
                            ...state.form.freightPieces[key],
                            weight: getValues(`[freightPieces][${key}][weight]`),
                            length: getValues(`[freightPieces][${key}][length]`),
                            width: getValues(`[freightPieces][${key}][width]`),
                            height: getValues(`[freightPieces][${key}][height]`),
                            description: getValues(`[freightPieces][${key}][description]`),
                            amount: getValues(`[freightPieces][${key}][amount]`),
                            [e]: (checkbox) ? !checkbox : true
                        }) : freightPiece
                    })
                }))}
                list={[
                    { value: 'isTemperatureMode', label: 'Температурный режим' },
                    { value: 'isOversizedFreight', label: 'Негабаритный груз' },
                    { value: 'isFragileFreight', label: 'Хрупкий груз' },
                    { value: 'isPalet', label: 'Это Палета' }
                ]}
            />}
        </React.Fragment>
    )
}

export const Member: any = ({ member, register, errors, getValues }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const _member = state?.form[member.value]
    const isMemberSelected = _member?.id

    const options = useMemo(() =>
        ((state?.forwardingRequest && state.forwardingRequest[member.field]) || defaultValues)
            .filter((f: SelectItemProps) => f && f?.text && f?.value)
            .map((item: SelectItemProps) => ({
                label: item.text, value: item.value
            })
        )
    , [state, member])

    return (
        <FieldSet title={member.label + ' *'}>
            <Row stretch>
                <Select
                    options={options}
                    placeholder="ФИО"
                    defaultValue={(_member) && (_member?.id ? { label: _member.fullName, value: _member.id } : null)}
                    onChange={(e: any) => {
                        dispatch(setForm({
                            forwardingDate: getValues('forwardingDate'),
                            timeFrom: getValues('timeFrom'),
                            timeTo: getValues('timeTo'),
                            [member.value]: { ..._member, ...getValues() }
                        }))
                        dispatch(forwardingMemberInfo(e.value, member.value))
                    }}
                    isLoading={options.length === 0}
                    isSearchable
                    isClearable
                />

                <Input
                    type="number"
                    name={`[${member.value}][phoneNumber]`}
                    inputRef={register()}
                    disabled={!isMemberSelected}
                    classNames={(errors[`[${member.value}][phoneNumber]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.phoneNumber}
                    placeholder="Телефон"
                />
                <Input
                    type="number"
                    name={`[${member.value}][prefix]`}
                    inputRef={register()}
                    disabled={!isMemberSelected}
                    classNames={(errors[`[${member.value}][prefix]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.prefix}
                    placeholder="Доб."
                />
            </Row>
    
            <Row stretch>
                <Input
                    type="text"
                    name={`[${member.value}][company]`}
                    inputRef={register()}
                    disabled={!isMemberSelected}
                    classNames={(errors[`[${member.value}][company]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.company}
                    placeholder="Компания"
                />
            </Row>
    
            <Row stretch>
                <Input
                    type="text"
                    name={`[${member.value}][street]`}
                    inputRef={register()}
                    disabled={!isMemberSelected}
                    classNames={(errors[`[${member.value}][street]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.street}
                    placeholder="Улица"
                />
                <Input
                    type="text"
                    name={`[${member.value}][house]`}
                    inputRef={register()}
                    disabled={!isMemberSelected}
                    classNames={(errors[`[${member.value}][house]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.house}
                    placeholder="Дом"
                />
                <Input
                    type="text"
                    name={`[${member.value}][apart]`}
                    inputRef={register()}
                    disabled={!isMemberSelected}
                    classNames={(errors[`[${member.value}][apart]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.apart}
                    placeholder="Квартира/офис"
                />
            </Row>
    
            {(isMemberSelected) && <Row stretch>
                <TextArea
                    name={`[${member.value}][remark]`}
                    inputRef={register()}
                    defaultValue={(_member) && _member?.remark}
                    placeholder="Примечание"
                />
            </Row>}
        </FieldSet>
    )
}