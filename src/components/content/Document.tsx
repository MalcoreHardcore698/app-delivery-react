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
import DefinitionList from './../ui/DefinitionList'
import Definition from './../ui/Definition'
import { setForm } from '../../redux/actions'

const GeneralFields = ({ register }: any) => {
    const state: any = useSelector(state => state)
    
    return (
        <React.Fragment>
            <Row stretch>
                <Column>
                    <Subtitle text="Откуда" />
                    <Input inputRef={register()} name="cityFrom" type="text" defaultValue={state?.form?.cityFrom} placeholder="Откуда" />
                </Column>
    
                <Column>
                    <Subtitle text="Куда" />
                    <Input inputRef={register()} name="cityTo" type="text" defaultValue={state?.form?.cityTo} placeholder="Куда" />
                </Column>
            </Row>
    
            <Place register={register} />
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
        setMore(true)

        dispatch(setForm(form))
    }

    const handleSaveDraft: any = () => {

    }

    const handleAddPlace = (register: any, getValues: any) => {
        dispatch(setForm(getValues()))
        setPlaces((prev: any) => ([
            ...prev, <Place register={register} index={prev.length + 1} />
        ]))
    }

    const handleRemovePlace: any = (index: number, getValues: any) => {
        dispatch(setForm(getValues()))
        setPlaces((prev: any) => prev.filter((_: any, i: number) => i !== index))
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ register, getValues }: any) => (
                <React.Fragment>
                    <GeneralFields register={register} />

                    {places.map((place: any, index: number) => (
                        <Column key={index} classNames="place">
                            <hr />
                            {place}
                            <Button onClick={() => handleRemovePlace(index, getValues)} classNames="accent clear small">Удалить место</Button>
                        </Column>
                    ))}
                    
                    <Button onClick={() => handleAddPlace(register, getValues)} classNames="accent clear small">Добавить еще место</Button>

                    {(isMore) && (
                        <React.Fragment>
                            <Row stretch>
                                <Column>
                                    <Subtitle text="Дата экспедирования" />
                                    <Input inputRef={register()} name="dateForward" type="date" defaultValue={state?.form?.dateForward} placeholder="__.__.____" />
                                </Column>

                                <Column>
                                    <FieldSet title="Время">
                                        <Field label="с">
                                            <Input inputRef={register()} name="timeFrom" type="date" defaultValue={state?.form?.timeFrom} placeholder="__:__" />
                                        </Field>

                                        <Field label="до">
                                            <Input inputRef={register()} name="timeTo" type="date" defaultValue={state?.form?.timeTo} placeholder="__:__" />
                                        </Field>
                                    </FieldSet>
                                </Column>
                            </Row>

                            {members.map((member: string, index: number) => <Member key={index} member={member} register={register} />)}
                        </React.Fragment>
                    )}

                    <Row>
                        <Button type="submit" classNames="accent">Далее</Button>
                        <Button onClick={handleSaveDraft}>Сохранить черновик</Button>
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
            offerType: form?.offerType,
            services: JSON.parse(form?.services)
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
                        <Input inputRef={register()} name="offerType" type="text" defaultValue={state?.form?.offerType} placeholder="Тип тарифа" />

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

                    <Button type="submit">Предпросмотр</Button>
                </React.Fragment>
            )}
        </Form>
    )
}


export const Preview: any = ({ back, jump, text="Отправить заказ" }: any) => {
    const state: any = useSelector(state => state)

    return (
        <React.Fragment>
            <Button classNames="accent clear back" onClick={() => back()}>Назад</Button>
    
            {(state.form) ? (
                <Column>
                    <DefinitionList>
                        <Definition text="Вид заявки" detail={state?.form?.offerType} />
                    </DefinitionList>

                    <DefinitionList>
                        <Definition text="Откуда" detail={state?.form?.cityFrom} />
                    </DefinitionList>

                    <DefinitionList>
                        <Definition text="Куда" detail={state?.form?.cityTo} />
                    </DefinitionList>

                    <DefinitionList>
                        {(state?.form?.places || []).map((place: any) =>
                            <Definition text="Параметры мест" detail={`${place?.weight} кг, ${place?.length}x${place?.width}x${place?.height} м`} />
                        )}
                    </DefinitionList>

                    <DefinitionList>
                        <Definition text="Дата экспедирвоания" detail={<Moment date={state?.form?.dateForward} format="DD.MM.YYYY" />} />
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
                                <span>{state?.form?.sender?.name},</span>
                                <span>{state?.form?.sender?.phone},</span>
                                <span>{state?.form?.sender?.address},</span>
                                <span>{state?.form?.sender?.company}</span>
                            </React.Fragment>
                        )} />
                    </DefinitionList>
                    
                    <DefinitionList>
                        <Definition text="Получатель" detail={(
                            <React.Fragment>
                                <span>{state?.form?.sender?.name},</span>
                                <span>{state?.form?.sender?.phone},</span>
                                <span>{state?.form?.sender?.address},</span>
                                <span>{state?.form?.sender?.company}</span>
                            </React.Fragment>
                        )} />
                    </DefinitionList>
                    
                    <DefinitionList>
                        <Definition text="Дополнительные услуги" detail={state?.form?.services?.map((service: any) => service.label).join(', ')} />
                    </DefinitionList>
                </Column>
            ) : <p>Form is undefined</p>}
    
            <Button onClick={() => jump('/done')} classNames="accent">{text}</Button>
        </React.Fragment>
    )
}

export const Conclusion: any = ({ jump, text="Сохранить шаблон" }: any) => (
    <React.Fragment>
        <Button onClick={() => jump('/')}>{text}</Button>
    </React.Fragment>
)

export const Place: any = ({ register, index=0 }: any) => {
    const state: any = useSelector(state => state)
    const _place = state?.form?.places[index]

    return (
        <React.Fragment>
            <FieldSet title="Параметры мест">
                <Field label="кг" position="right">
                    <Input inputRef={register()} name={`[places][${index}][weight]`} type="number" defaultValue={_place?.weight} placeholder="Вес" />
                </Field>

                <Field label="м" position="right">
                    <Input inputRef={register()} name={`[places][${index}][length]`} type="number" defaultValue={_place?.length} placeholder="Д" />
                    <Input inputRef={register()} name={`[places][${index}][width]`} type="number" defaultValue={_place?.width} placeholder="Ш" />
                    <Input inputRef={register()} name={`[places][${index}][height]`} type="number" defaultValue={_place?.height} placeholder="В" />
                </Field>
            </FieldSet>
            <Input inputRef={register()} name={`[places][${index}][description]`} type="text" defaultValue={_place?.description} placeholder="Описание груза" />
        </React.Fragment>
    )
}

export const Member: any = ({ member, register }: any) => {
    const state: any = useSelector(state => state)
    const _member = state?.form[member.value]

    return (
        <FieldSet title={member.label}>
            <Row stretch>
                <Input inputRef={register()} name={`[${member.value}][name]`} type="text" defaultValue={(_member) && _member?.name} placeholder="ФИО" />
                <Input inputRef={register()} name={`[${member.value}][phone]`} type="number" defaultValue={(_member) && _member?.phone} placeholder="Телефон" />
                <Input inputRef={register()} name={`[${member.value}][prefix]`} type="number" defaultValue={(_member) && _member?.prefix} placeholder="Доб." />
            </Row>
    
            <Row stretch>
                <Input inputRef={register()} name={`[${member.value}][company]`} type="text" defaultValue={(_member) && _member?.company} placeholder="Компания" />
            </Row>
    
            <Row stretch>
                <Input inputRef={register()} name={`[${member.value}][street]`} type="text" defaultValue={(_member) && _member?.street} placeholder="Улица" />
                <Input inputRef={register()} name={`[${member.value}][house]`} type="number" defaultValue={(_member) && _member?.house} placeholder="Дом" />
                <Input inputRef={register()} name={`[${member.value}][apart]`} type="text" defaultValue={(_member) && _member?.apart} placeholder="Квартира/офис" />
            </Row>
    
            <Row stretch>
                <TextArea inputRef={register()} name={`[${member.value}][remark]`} defaultValue={(_member) && _member?.remark} placeholder="Примечание" />
            </Row>
        </FieldSet>
    )
}