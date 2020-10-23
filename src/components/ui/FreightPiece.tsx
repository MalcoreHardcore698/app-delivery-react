import React from 'react'
import { useSelector } from 'react-redux'
import Row from './../ui/Row'
import Field from './../ui/Field'
import FieldSet from './../ui/FieldSet'
import Input from './../ui/Input'
import Checkbox from './../ui/Checkbox'

export default ({ index=0, register, errors, setValue }: any) => {
    const state: any = useSelector(state => state)

    const freightPieces = state.form?.freightPieces
    const freightPiece = (freightPieces) ? freightPieces[index] : null

    const isError = () => {
        const hasForm = state.form
        const hasFreightPieces = errors?.freightPieces

        return (hasForm && hasFreightPieces)
    }

    const isWeight = () => errors?.freightPieces[index]?.weight
    const isLength = () => errors?.freightPieces[index]?.length
    const isWidth = () => errors?.freightPieces[index]?.width
    const isHeight = () => errors?.freightPieces[index]?.height
    
    return (
        <React.Fragment>
            <FieldSet title="Параметры мест *">
                <Field label="кг" position="right">
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][weight]`}
                        inputRef={register({ required: true })}
                        classNames={(isError() && isWeight()) ? 'required' : ''}
                        defaultValue={freightPiece?.weight}
                        placeholder="Вес"
                    />
                </Field>

                <Field label="м" position="right">
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][length]`}
                        inputRef={register({ required: true })}
                        classNames={(isError() && isLength()) ? 'required' : ''}
                        defaultValue={freightPiece?.length}
                        placeholder="Д"
                    />
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][width]`}
                        inputRef={register({ required: true })}
                        classNames={(isError() && isWidth()) ? 'required' : ''}
                        defaultValue={freightPiece?.width}
                        placeholder="Ш"
                    />
                    <Input
                        type="number"
                        name={`[freightPieces][${index}][height]`}
                        inputRef={register({ required: true })}
                        classNames={(isError() && isHeight()) ? 'required' : ''}
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

            <Checkbox
                register={register()}
                onChange={(item: any) => setValue(item.value, item.checked)}
                list={[
                    { value: `[freightPieces][${index}][isTemperatureMode]`, label: 'Температурный режим', checked: freightPiece?.isTemperatureMode },
                    { value: `[freightPieces][${index}][isOversizedFreight]`, label: 'Негабаритный груз', checked: freightPiece?.isOversizedFreight },
                    { value: `[freightPieces][${index}][isFragileFreight]`, label: 'Хрупкий груз', checked: freightPiece?.isFragileFreight },
                    { value: `[freightPieces][${index}][isPallet]`, label: 'Это Палета', checked: freightPiece?.isPallet }
                ]}
            />
        </React.Fragment>
    )
}