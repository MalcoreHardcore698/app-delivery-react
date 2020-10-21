import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import Row from './../ui/Row'
import Subtitle from './../ui/Subtitle'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import TextArea from './../ui/TextArea'
import { setForm } from '../../redux/actions'
import { forwardingMemberInfo } from '../../redux/creators'
import { SelectProps } from '../../utils/interfaces'

const defaultValues = [{ value: 'element', text: 'Элемент' }]

export interface Member {
    value: string,
    label: string,
    field: string
}

export default ({ member, register, errors, getValues }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const _member = state?.form[member.value]
    const isMemberSelected = _member?.id

    const options = useMemo(() =>
        ((state?.forwardingRequest && state.forwardingRequest[member.field]) || defaultValues)
            .filter((f: SelectProps) => f && f?.text && f?.value)
            .map((item: SelectProps) => ({
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
            </Row>
    
            {(isMemberSelected) && <Row stretch>
                <TextArea
                    name={`[${member.value}][remark]`}
                    inputRef={register()}
                    defaultValue={(_member) && _member?.remark}
                    placeholder="Примечание"
                />
            </Row>}

            {(member.value === 'sender') && (
                <React.Fragment>
                    <Subtitle text="Адрес забора" />
                    <Row stretch>
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
                </React.Fragment>
            )}
        </FieldSet>
    )
}