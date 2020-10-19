import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Controller } from 'react-hook-form'
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
import { setForm, clearForm } from '../../redux/actions'
import {
    forwardingRequestCreate,
    forwardingRequestSaveTemplate
} from '../../redux/creators'
import Loading from '../ui/Loading'

interface SelectItemProps {
    disabled: boolean,
    group: string,
    selected: boolean,
    text: string,
    value: string
}

const GeneralFields = ({ register, errors, control }: any) => {
    const state: any = useSelector(state => state)

    const list = state?.forwardingRequest?.cityItemsList || [{ value: '1', text: '1' }]
    const options = useMemo(() => list
        .filter((f: SelectItemProps) => f && f?.text && f?.value)
        .map((city: SelectItemProps) => ({
            label: city.text, value: city.value
        }))
    , [list])
    
    return (
        <React.Fragment>
            <Row stretch>
                <Column>
                    <Subtitle text="Откуда *" />

                    <Controller
                        as={<Select
                            options={options}
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
                            options={options}
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
    
            <Place register={register} errors={errors} />
        </React.Fragment>
    )
}

export const Introduction: any = ({ jump, members }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [freightPieces, setFreightPieces]: any = useState([])
    const [isMore, setMore] = useState(false)

    const handleSubmit: any = (form: any) => {
        if (isMore) jump('/services')
        dispatch(setForm(form))
        setMore(true)
    }

    const handleAddPlace = (register: any, errors: any, getValues: any) => {
        dispatch(setForm(getValues()))
        setFreightPieces((prev: any) => ([
            ...prev, <Place register={register} errors={errors} index={prev.length + 1} />
        ]))
    }

    const handleRemovePlace: any = (index: number, getValues: any) => {
        dispatch(setForm(getValues()))
        setFreightPieces((prev: any) => prev.filter((_: any, i: number) => i !== index))
    }

    if (state.loading)
        return <Loading />

    return (
        <Form onSubmit={handleSubmit}>
            {({ register, errors, getValues, control }: any) => (
                <React.Fragment>
                    <GeneralFields register={register} errors={errors} control={control} />

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
                                            placeholder="Дата экспедирования"
                                        />
                                    </Field>
                                </Column>

                                <Column>
                                    <FieldSet title="Время">
                                        <Field label="с">
                                            <Input
                                                type="datetime-local"
                                                name="timeFrom"
                                                inputRef={register({ required: true })}
                                                classNames={(state.form && errors.forwardingDate) ? 'required' : ''}
                                                placeholder="Начало"
                                            />
                                        </Field>

                                        <Field label="до">
                                            <Input
                                                type="datetime-local"
                                                name="timeTo"
                                                inputRef={register({ required: true })}
                                                classNames={(state.form && errors.timeTo) ? 'required' : ''}
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
        dispatch(setForm({
            id: state?.history?.length + 1,
            tariffType: form?.tariffType
        }))

        jump('/preview')
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ register, control, setValue, getValues }: any) => (
                <React.Fragment>
                    <Button classNames="accent clear back" onClick={() => back()}>Назад</Button>

                    <Column>
                        <Subtitle text="Тип тарифа" />
                        <Controller
                            as={Select}
                            name="tariffType"
                            options={(state?.forwardingRequest?.tariffTypes || [{ value: '1', text: '1' }]).map((city: SelectItemProps) => ({
                                label: city.text, value: city.value
                            }))}
                            control={control}
                            rules={{ required: true }}
                            defaultValue={state.form?.tariffType || null}
                            placeholder="Тип тарифа"
                            isClearable
                        />

                        <Subtitle text="Плательщик" />
                        <Radiobox
                            name="payer"
                            onChange={(e: any) => dispatch(setForm({ 'payer': e.value }))}
                            list={[
                                { value: 'sender', label: 'Отправитель' },
                                { value: 'recipient', label: 'Получатель' },
                                { value: 'another', label: 'Третье лицо' }
                            ]}
                        />

                        <Subtitle text="Дополнительные услуги" />
                        <Checkbox
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

                    <DefinitionList>
                        {(state?.form?.places || []).map((place: any, index: number) =>
                            <Definition key={index} text="Параметры мест" detail={`${place?.weight} кг, ${place?.length}x${place?.width}x${place?.height} м`} />
                        )}
                    </DefinitionList>

                    <DefinitionList>
                        <Definition
                            text="Дата экспедирвоания"
                            detail={new Date(state?.form?.timeTo).toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        />
                    </DefinitionList>
                    
                    <DefinitionList>
                        <Definition text="Время" detail={(
                            <React.Fragment>
                                <span>с </span>
                                {new Date(state?.form?.timeFrom).toLocaleString('ru-RU', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}
                                <span> до </span>
                                {new Date(state?.form?.timeTo).toLocaleString('ru-RU', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                })}
                            </React.Fragment>
                        )} />
                    </DefinitionList>
                    
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

export const Conclusion: any = ({ jump, text="Сохранить шаблон" }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSaveTemplate = () => {
        dispatch(forwardingRequestSaveTemplate(state.form))
        dispatch(clearForm())

        jump('/')
    }

    if (state.loading)
        return <Loading />

    return (
        <React.Fragment>
            <h2>Заказ создан!</h2>
            <Row>
                <Button onClick={handleSaveTemplate}>{text}</Button>
                <Button onClick={() => jump('/offer')} classNames="accent">Новая заявка</Button>
            </Row>
        </React.Fragment>
    )
}

export const Place: any = ({ index=0, register, errors }: any) => {
    const state: any = useSelector(state => state)

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
            <Input
                type="text"
                name={`[freightPieces][${index}][description]`}
                inputRef={register()}
                defaultValue={freightPiece?.description}
                placeholder="Описание груза"
            />
        </React.Fragment>
    )
}

export const Member: any = ({ member, register, errors, control }: any) => {
    const state: any = useSelector(state => state)

    const _member = state?.form[member.value]

    const options = useMemo(() =>
        ((state?.forwardingRequest && state.forwardingRequest[member.field]) || [{ value: '1', text: '1' }])
            .filter((f: SelectItemProps) => f && f?.text && f?.value)
            .map((city: SelectItemProps) => ({
                label: city.text, value: city.value
            })
        )
    , [state, member])

    return (
        <FieldSet title={member.label + ' *'}>
            <Row stretch>
                <Controller
                    as={Select}
                    name={`[${member.value}][name]`}
                    options={options}
                    control={control}
                    placeholder="ФИО"
                    rules={{ required: true }}
                    defaultValue={state.form?.fullName || null}
                    isLoading={options.length === 0}
                    isSearchable
                    isClearable
                />

                <Input
                    type="number"
                    name={`[${member.value}][phoneNumber]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][phoneNumber]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.phoneNumber}
                    placeholder="Телефон"
                />
                <Input
                    type="number"
                    name={`[${member.value}][prefix]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][prefix]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.prefix}
                    placeholder="Доб."
                />
            </Row>
    
            <Row stretch>
                <Input
                    type="text"
                    name={`[${member.value}][company]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][company]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.company}
                    placeholder="Компания"
                />
            </Row>
    
            <Row stretch>
                <Input
                    type="text"
                    name={`[${member.value}][street]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][street]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.street}
                    placeholder="Улица"
                />
                <Input
                    type="text"
                    name={`[${member.value}][house]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][house]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.house}
                    placeholder="Дом"
                />
                <Input
                    type="text"
                    name={`[${member.value}][apart]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][apart]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.apart}
                    placeholder="Квартира/офис"
                />
            </Row>
    
            <Row stretch>
                <TextArea
                    name={`[${member.value}][remark]`}
                    inputRef={register()}
                    defaultValue={(_member) && _member?.remark}
                    placeholder="Примечание"
                />
            </Row>
        </FieldSet>
    )
}