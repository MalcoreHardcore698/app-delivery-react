import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Moment from 'react-moment'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Subtitle from './../ui/Subtitle'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import TextArea from './../ui/TextArea'
import Checkbox from './../ui/Checkbox'
import Button from './../ui/Button'
import Select from './../ui/Select'
import DatePicker from './../ui/DatePicker'
import DefinitionList from './../ui/DefinitionList'
import Definition from './../ui/Definition'
import {
    setForm,
    clearForm,
    forwardingRequestCreate,
    forwardingRequestSaveTemplate
} from '../../redux/actions'

interface CityProps {
    disabled: boolean,
    group: string,
    selected: boolean,
    text: string,
    value: string
}

const GeneralFields = ({ register, errors, setValue }: any) => {
    const state: any = useSelector(state => state)
    
    return (
        <React.Fragment>
            <Row stretch>
                <Column>
                    <Subtitle text="Город *" />

                    <Select
                        options={state.forwardingRequest.cityItemsList.map((city: CityProps) => ({
                            label: city.text, value: city.value
                        }))}
                        onChange={(e: any) => {
                            setValue('departureCity', e.value)
                        }}
                        placeholder="Город"
                    />
                </Column>
    
                {/*<Column>
                    <Subtitle text="Куда *" />
                    <Input
                        type="text"
                        name="destinationCity"
                        classNames={(errors.destinationCity) ? 'required' : ''}
                        inputRef={register({ required: true })}
                        defaultValue={state?.form?.destinationCity?.description}
                        placeholder="Куда"
                    />
                </Column>*/}
            </Row>
    
            <Place register={register} errors={errors} />
        </React.Fragment>
    )
}

export const Introduction: any = ({ jump, members }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const [places, setPlaces]: any = useState([])
    const [isMore, setMore] = useState(false)

    const handleSubmit: any = (form: any) => {
        if (isMore) jump('/services')
        dispatch(setForm(form))
        setMore(true)
    }

    const handleAddPlace = (register: any, errors: any, getValues: any) => {
        dispatch(setForm(getValues()))
        setPlaces((prev: any) => ([
            ...prev, <Place register={register} errors={errors} index={prev.length + 1} />
        ]))
    }

    const handleRemovePlace: any = (index: number, getValues: any) => {
        dispatch(setForm(getValues()))
        setPlaces((prev: any) => prev.filter((_: any, i: number) => i !== index))
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ register, errors, getValues }: any) => (
                <React.Fragment>
                    <GeneralFields register={register} errors={errors} />

                    {places.map((place: any, index: number) => (
                        <Column key={index} classNames="place">
                            <hr />
                            {place}
                            <Button onClick={() => handleRemovePlace(index, getValues)} classNames="accent clear small">Удалить место</Button>
                        </Column>
                    ))}
                    
                    <Button onClick={() => handleAddPlace(register, errors, getValues)} classNames="accent clear small">Добавить еще место</Button>

                    {(isMore) && (
                        <React.Fragment>
                            <Row stretch>
                                <Column>
                                    <Subtitle text="Дата экспедирования *" />
                                    <DatePicker
                                        name="forwardingDate"
                                        ref={register({ required: true })}
                                        selected={state?.form?.forwardingDate}
                                        dateFormat="dd.MM.yyyy"
                                        locale="ru"
                                    />
                                </Column>

                                <Column>
                                    <FieldSet title="Время *">
                                        <Field label="с">
                                            <DatePicker
                                                name="timeFrom"
                                                ref={register({ required: true })}
                                                selected={state?.form?.timeFrom}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                dateFormat="h:mm aa"
                                                locale="ru"
                                            />
                                        </Field>

                                        <Field label="до">
                                            <DatePicker
                                                name="timeTo"
                                                ref={register({ required: true })}
                                                selected={state?.form?.timeTo}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                dateFormat="h:mm aa"
                                                locale="ru"
                                            />
                                        </Field>
                                    </FieldSet>
                                </Column>
                            </Row>

                            {members.map((member: string, index: number) => <Member key={index} member={member} register={register} errors={errors} />)}
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
            offerType: form?.offerType,
            services: form?.services
                ? JSON.parse(form.services)
                : [],
            createdAt: Date.now()
        }))

        jump('/preview')
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ register, setValue }: any) => (
                <React.Fragment>
                    <Button classNames="accent clear back" onClick={() => back()}>Назад</Button>

                    <Column>
                        <Subtitle text="Дополнительные услуги" />
                        <Input
                            type="text"
                            name="tariffType"
                            inputRef={register({ required: true })}
                            defaultValue={state?.form?.offerType}
                            placeholder="Тип тарифа"
                        />

                        <Checkbox
                            name="services"
                            inputRef={register()}
                            onChange={(value: any) => setValue('services', JSON.stringify(value))}
                            list={[
                                { value: 'lathing', label: 'Обрешетка' },
                                { value: 'packaging', label: 'Доупаковка' },
                                { value: 'loaders', label: 'Грузчики' },
                                { value: 'documents', label: 'Возврат документов' }
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
                        <Definition text="Откуда" detail={state?.form?.departureCity?.description} />
                    </DefinitionList>

                    <DefinitionList>
                        <Definition text="Куда" detail={state?.form?.destinationCity?.description} />
                    </DefinitionList>

                    <DefinitionList>
                        {(state?.form?.places || []).map((place: any, index: number) =>
                            <Definition key={index} text="Параметры мест" detail={`${place?.weight} кг, ${place?.length}x${place?.width}x${place?.height} м`} />
                        )}
                    </DefinitionList>

                    <DefinitionList>
                        <Definition text="Дата экспедирвоания" detail={<Moment date={state?.form?.forwardingDate} format="DD.MM.YYYY" />} />
                    </DefinitionList>
                    
                    <DefinitionList>
                        <Definition text="Время" detail={(
                            <React.Fragment>
                                <span>с </span>
                                <Moment date={state?.form?.timeFrom} format="HH:mm" />
                                <span> до </span>
                                <Moment date={state?.form?.timeTo} format="HH:mm" />
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
    const _place = state?.form?.places[index]

    return (
        <React.Fragment>
            <FieldSet title="Параметры мест *">
                <Field label="кг" position="right">
                    <Input
                        type="number"
                        name={`[places][${index}][weight]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[places][${index}][weight]`]) ? 'required' : ''}
                        defaultValue={_place?.weight}
                        placeholder="Вес"
                    />
                </Field>

                <Field label="м" position="right">
                    <Input
                        type="number"
                        name={`[places][${index}][length]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[places][${index}][length]`]) ? 'required' : ''}
                        defaultValue={_place?.length}
                        placeholder="Д"
                    />
                    <Input
                        type="number"
                        name={`[places][${index}][width]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[places][${index}][width]`]) ? 'required' : ''}
                        defaultValue={_place?.width}
                        placeholder="Ш"
                    />
                    <Input
                        type="number"
                        name={`[places][${index}][height]`}
                        inputRef={register({ required: true })}
                        classNames={(state.form && errors[`[places][${index}][height]`]) ? 'required' : ''}
                        defaultValue={_place?.height}
                        placeholder="В"
                    />
                </Field>
            </FieldSet>
            <Input
                type="text"
                name={`[places][${index}][description]`}
                inputRef={register()}
                defaultValue={_place?.description}
                placeholder="Описание груза"
            />
        </React.Fragment>
    )
}

export const Member: any = ({ member, register, errors }: any) => {
    const state: any = useSelector(state => state)
    const _member = state?.form[member.value]

    return (
        <FieldSet title={member.label + ' *'}>
            <Row stretch>
                <Input
                    type="text"
                    name={`[${member.value}][name]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][name]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.name}
                    placeholder="ФИО"
                />
                <Input
                    type="number"
                    name={`[${member.value}][phone]`}
                    inputRef={register({ required: true })}
                    classNames={(errors[`[${member.value}][phone]`]) ? 'required' : ''}
                    defaultValue={(_member) && _member?.phone}
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
                    type="number"
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