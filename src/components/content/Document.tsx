import React, { useState } from 'react'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Subtitle from './../ui/Subtitle'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import TextArea from './../ui/TextArea'
import Button from './../ui/Button'

export const Introduction: any = ({ jump, back, members }: { jump: any, back: any, members: Array<string> }) => {
    const [places, setPlaces]: any = useState([])
    const [isMore, setMore] = useState(false)

    const handleSubmit: any = (form: any) => {
        
    }

    const handleSaveDraft: any = () => {

    }

    const handleAddPlace = (register: any) => {
        setPlaces((prev: any) => ([
            ...prev, <Place register={register} />
        ]))
    }

    const handleRemovePlace: any = (index: number) => {
        setPlaces((prev: any) => prev.filter((_: any, i: number) => i !== index))
    }

    const handleNext: any = () => {
        if (isMore) jump('/services')
        setMore(true)
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ register }: any) => (
                <React.Fragment>
                    <Row stretch>
                        <Column>
                            <Subtitle text="Откуда" />
                            <Input inputRef={register()} name="from" type="text" placeholder="Откуда" />
                        </Column>

                        <Column>
                            <Subtitle text="Куда" />
                            <Input inputRef={register()} name="to" type="text" placeholder="Куда" />
                        </Column>
                    </Row>

                    <Place register={register} />

                    {places.map((place: any, index: number) => (
                        <Column key={index} classNames="place">
                            <hr />
                            {place}
                            <Button onClick={() => handleRemovePlace(index)} classNames="accent clear small">Удалить место</Button>
                        </Column>
                    ))}
                    
                    <Button onClick={() => handleAddPlace(register)} classNames="accent clear small">Добавить еще место</Button>

                    {(isMore) && (
                        <React.Fragment>
                            <Row stretch>
                                <Column>
                                    <Subtitle text="Дата экспедирвоания" />
                                    <Input inputRef={register()} name="date" type="date" placeholder="__.__.____" />
                                </Column>

                                <Column>
                                    <FieldSet title="Время">
                                        <Field label="с">
                                            <Input inputRef={register()} name="timeFrom" type="date" placeholder="__:__" />
                                        </Field>

                                        <Field label="до">
                                            <Input inputRef={register()} name="tomeTo" type="date" placeholder="__:__" />
                                        </Field>
                                    </FieldSet>
                                </Column>
                            </Row>

                            {members.map((member: string, index: number) => <Member key={index} member={member} register={register} />)}
                        </React.Fragment>
                    )}

                    <Row>
                        <Button type="submit" classNames="accent" onClick={handleNext}>Далее</Button>
                        <Button onClick={handleSaveDraft}>Сохранить черновик</Button>
                    </Row>
                </React.Fragment>
            )}
        </Form>
    )
}

export const Services: any = ({ back, jump }: any) => (
    <div>
        <Button classNames="accent clear" onClick={() => back()}>Назад</Button>
        <Button onClick={() => jump('/preview')}>Предпросмотр</Button>
    </div>
)


export const Preview: any = ({ back, jump, text="Создать заказ" }: any) => (
    <div>
        <Button classNames="accent clear" onClick={() => back()}>Назад</Button>
        <Button onClick={() => jump('/done')}>{text}</Button>
    </div>
)

export const Conclusion: any = ({ jump, text="Сохранить шаблон" }: any) => (
    <div>
        <Button onClick={() => jump('/')}>{text}</Button>
    </div>
)

export const Place: any = ({ register }: any) => (
    <React.Fragment>
        <FieldSet title="Параметры мест">
            <Field label="кг" position="right">
                <Input inputRef={register()} name="weight" type="number" placeholder="Вес" />
            </Field>

            <Field label="м" position="right">
                <Input inputRef={register()} name="length" type="number" placeholder="Д" />
                <Input inputRef={register()} name="width" type="number" placeholder="Ш" />
                <Input inputRef={register()} name="height" type="number" placeholder="В" />
            </Field>
        </FieldSet>
        <Input inputRef={register()} name="description" type="description" placeholder="Описание груза" />
    </React.Fragment>
)

export const Member: any = ({ member, register }: any) => (
    <FieldSet title={member}>
        <Row stretch>
            <Input inputRef={register()} name={`${member}_name`} type="text" placeholder="ФИО" />
            <Input inputRef={register()} name={`${member}_phone`} type="number" placeholder="Телефон" />
            <Input inputRef={register()} name={`${member}_prefix`} type="number" placeholder="Доб." />
        </Row>

        <Row stretch>
            <Input inputRef={register()} name={`${member}_company`} type="text" placeholder="Компания" />
        </Row>

        <Row stretch>
            <Input inputRef={register()} name={`${member}_street`} type="text" placeholder="Улица" />
            <Input inputRef={register()} name={`${member}_house`} type="number" placeholder="Дом" />
            <Input inputRef={register()} name={`${member}_apart`} type="text" placeholder="Квартира/офис" />
        </Row>

        <Row stretch>
            <TextArea inputRef={register()} name={`${member}_remark`} placeholder="Примечание" />
        </Row>
    </FieldSet>
)