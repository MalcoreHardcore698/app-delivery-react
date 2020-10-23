import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Row from './../ui/Row'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import Checkbox from './../ui/Checkbox'
import { setForm } from '../../redux/actions'

export default ({ index=0, register, errors, getValues }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const freightPieces = state.form?.freightPieces
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
                name="freightPiecesOpt"
                inputRef={register()}
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