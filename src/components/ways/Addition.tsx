import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Subtitle from './../ui/Subtitle'
import Checkbox from './../ui/Checkbox'
import Radiobox from './../ui/Radiobox'
import Button from './../ui/Button'
import { setForm } from '../../redux/actions'
import { SelectProps } from '../../utils/interfaces'

const defaultValues = [{ value: 'element', text: 'Элемент' }]

export default ({ back, jump }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const senderItemsList = state?.forwardingRequest?.senderItemsList || defaultValues
    const senderItemsOptions = useMemo(() => senderItemsList
        .filter((f: SelectProps) => f && f?.text && f?.value)
        .map((city: SelectProps) => ({
            label: city.text, value: city.value
        }))
    , [senderItemsList])

    const recipientItemsList = state?.forwardingRequest?.recipientItemsList || defaultValues
    const recipientItemsOptions = useMemo(() => recipientItemsList
        .filter((f: SelectProps) => f && f?.text && f?.value)
        .map((city: SelectProps) => ({
            label: city.text, value: city.value
        }))
    , [recipientItemsList])

    const options = senderItemsOptions.concat(recipientItemsOptions)

    const handleSubmit: any = (form: any) => {
        dispatch(setForm({ tariffType: form?.tariffType }))

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
                            as={<Select
                                options={(state?.forwardingRequest?.tariffTypes || []).map((city: SelectProps) => ({
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
                        {(state.form?.payer === 'another') && <Controller
                            as={<Select
                                options={options}
                                placeholder="Третье лицо"
                                isSearchable
                                isClearable
                            />}
                            name="thirdPerson"
                            rules={{ required: true }}
                            control={control}
                            defaultValue={state.form?.thirdPerson || null}
                        />}

                        <Subtitle text="Дополнительные услуги" />
                        <Checkbox
                            register={register()}
                            onChange={(item: any) => setValue(item.value, item.checked)}
                            list={[
                                { value: 'isCreateRequired', label: 'Обрешетка', checked: state.form?.isCreateRequired },
                                { value: 'isCreateNew', label: 'Доупаковка', checked: state.form?.isCreateNew },
                                { value: 'isDeliveryRequired', label: 'Грузчики', checked: state.form?.isDeliveryRequired },
                                { value: 'isSameDayForwarding', label: 'Отправка день в день', checked: state.form?.isSameDayForwarding },
                                { value: 'isUrgentRequest', label: 'Срочная заявка', checked: state.form?.isUrgentRequest }
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