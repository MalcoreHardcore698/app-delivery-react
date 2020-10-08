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

function getPath(navigator: any) {
    if (!navigator || navigator.length === 0)
        return null

    return navigator[navigator.length - 1]
}


const OfferForm: any = ({ jump }: any) => {
    const [places, setPlaces]: any = useState([])

    const handleSubmit: any = (form: any) => {
        
    }

    const handleLoadFromTemplate: any = () => {

    }

    const handleSaveDraft: any = () => {

    }

    const handleAddPlace = (register: any) => {
        setPlaces((prev: any) => ([
            ...prev, <FieldsReciever register={register} />
        ]))
    }

    const handleRemovePlace: any = (index: number) => {
        setPlaces((prev: any) => prev.filter((_: any, i: number) => i !== index))
    }

    const handleNext: any = () => {
        jump('/services')
    }

    return (
        <Form onSubmit={handleSubmit}>
            {({ register }: any) => (
                <React.Fragment>
                    <Row><Button onClick={handleLoadFromTemplate}>Загрузить из шаблона</Button></Row>

                    <FieldsOffer register={register} />

                    {places.map((place: any, index: number) => (
                        <React.Fragment key={index}>
                            <hr />
                            {place}
                            <Button onClick={() => handleRemovePlace(index)} classNames="accent clear small">Удалить место</Button>
                        </React.Fragment>
                    ))}
                    
                    <Row>
                        <Button onClick={() => handleAddPlace(register)} classNames="accent clear">Добавить еще место</Button>
                    </Row>

                    <Row>
                        <Button type="submit" classNames="accent" onClick={handleNext}>Далее</Button>
                        <Button onClick={handleSaveDraft}>Сохранить черновик</Button>
                    </Row>
                </React.Fragment>
            )}
        </Form>
    )
}

const FieldsOffer: any = ({ register }: any) => {
    return (
        <React.Fragment>
            <Column>
                <Subtitle text="Вид заявки" />
                <Input inputRef={register()} name="type" type="text" placeholder="Вид заявки" />
            </Column>

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
}

const FieldsReciever: any = ({ register }: any) => {
    return (
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
            
            <FieldSet title="Отправитель">
                <Row stretch>
                    <Input inputRef={register()} name="fio" type="text" placeholder="ФИО" />
                    <Input inputRef={register()} name="phone" type="number" placeholder="Телефон" />
                    <Input inputRef={register()} name="code" type="number" placeholder="Доб." />
                </Row>

                <Row stretch>
                    <Input inputRef={register()} name="company" type="text" placeholder="Компания" />
                </Row>

                <Row stretch>
                    <Input inputRef={register()} name="street" type="text" placeholder="Улица" />
                    <Input inputRef={register()} name="house" type="number" placeholder="Дом" />
                    <Input inputRef={register()} name="apart" type="text" placeholder="Квартира/офис" />
                </Row>

                <Row stretch>
                    <TextArea inputRef={register()} name="note" placeholder="Примечание" />
                </Row>
            </FieldSet>

            <FieldSet title="Получатель">
                <Row stretch>
                    <Input inputRef={register()} name="fio" type="text" placeholder="ФИО" />
                    <Input inputRef={register()} name="phone" type="number" placeholder="Телефон" />
                    <Input inputRef={register()} name="code" type="number" placeholder="Доб." />
                </Row>

                <Row stretch>
                    <Input inputRef={register()} name="company" type="text" placeholder="Компания" />
                </Row>

                <Row stretch>
                    <Input inputRef={register()} name="street" type="text" placeholder="Улица" />
                    <Input inputRef={register()} name="house" type="number" placeholder="Дом" />
                    <Input inputRef={register()} name="apart" type="text" placeholder="Квартира/офис" />
                </Row>

                <Row stretch>
                    <TextArea inputRef={register()} name="note" placeholder="Примечание" />
                </Row>
            </FieldSet>
        </React.Fragment>
    )
}

const OfferServices: any = ({ back, jump }: any) => (
    <div>
        <Button classNames="accent clear" onClick={() => back()}>
            Назад
        </Button>
        <Button onClick={() => jump('/preview')}>
            Предпросмотр
        </Button>
    </div>
)

const OfferPreview: any = ({ back, jump }: any) => (
    <div>
        <Button classNames="accent clear" onClick={() => back()}>
            Назад
        </Button>
        <Button onClick={() => jump('/done')}>
            Создать заказ
        </Button>
    </div>
)

const OfferDone: any = ({ jump }: any) => (
    <div>
        <Button onClick={() => jump('/')}>
            Сохранить шаблон
        </Button>
    </div>
)

const Switch = (props: any) => {
    const Childrens = props.children
    if (!Childrens) return null
    
    const path = props.path

    let Child = null
    for (const child of Childrens) {
        if (path === child.props.path) {
            Child = child
            break
        }
    }
    return Child
}

const Route = ({ component, close, back, jump }: any) => {
    const Compoent = component
    return <Compoent
        close={close}
        back={back}
        jump={jump}
    />
}

const routes = [
    {
        path: '/',
        component: ({ jump, back }: any) =>
            <OfferForm jump={jump} back={back} />
    },
    {
        path: '/services',
        component: ({ jump, back }: any) =>
            <OfferServices jump={jump} back={back} />
    },
    {
        path: '/preview',
        component: ({ jump, back }: any) =>
            <OfferPreview jump={jump} back={back} />
    },
    {
        path: '/done',
        component: ({ jump, back }: any) =>
            <OfferDone jump={jump} back={back} />
    }
]

export default () => {
    const [navigator, setNavigator] = useState(['/'])

    const handlerBack = () => {
        setNavigator([
            ...navigator.filter((e, i) => (i !== (navigator.length - 1)))
        ])
    }
    const handlerJump = (path: string) => {
        setNavigator([
            ...navigator,
            path
        ])
    }

    return (    
        <div className="content">
            <Switch path={getPath(navigator)}>
                {routes?.map((props, key) =>
                    <Route key={key} {...props} back={handlerBack} jump={handlerJump} />
                )}
            </Switch>
        </div>
    )
}