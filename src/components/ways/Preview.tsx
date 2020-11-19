import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from './../ui/Form'
import Row from './../ui/Row'
import Column from './../ui/Column'
import Button from './../ui/Button'
import DefinitionList from './../ui/DefinitionList'
import Definition from './../ui/Definition'
import Checkbox from './../ui/Checkbox'
import { forwardingRequestCreate } from '../../redux/creators'

export default ({ back, jump, text="Отправить заказ" }: any) => {
    const state: any = useSelector(state => state)
    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(forwardingRequestCreate(state.form))
        jump('/conclusion')
    }

    return (
      <Form onSubmit={handleSubmit}>
        {({ register, setValue }: any) => (
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
                                {new Date(state?.form?.timeFrom).toLocaleTimeString('ru-RU', {
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                                <span> до </span>
                                {new Date(state?.form?.timeTo).toLocaleTimeString('ru-RU', {
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
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

            <Checkbox
              register={register()}
              onChange={(item: any) => setValue(item.value, item.checked)}
              list={[
                { value: `agree`, label: 'Я предупрежден(а) об ответственности за правильность сведений, указанных в заявке. Данная заявка подтверждает факт заключения договора транспортной экспедиции. Направлением указанной Заявки подтверждаю, что ознакомлен(а) и согласен(на) с условиями  Договора транспортной экспедиции, тарифами Экспедитора и условиями доставки груза, размещенными на сайте https://trans-vektor.ru В случае отказа лица, указанного Клиентом в качестве Плательщика, от оплаты счетов Экспедитора, Клиент несет ответственность перед Экспедитором за ненадлежащее исполнение обязательств по оплате оказанных услуг. Настоящим, в соответствии с Федеральным законом от 27.07.2006г. № 152-ФЗ «О персональных данных», я даю в электронной форме свое добровольное, информированное согласие на обработку своих персональных данных, а именно: имя, фамилия; номер телефона; номер заказа/накладной; адрес электронной почты; город, улица, номер дома, номер квартиры; вопросы, отзывы, предложения. Я согласен на поручение сбора, хранения, обработки, передачи, блокирования, удаления и уничтожения моих персональных данных администратору сайта https://trans-vektor.ru Согласие действует по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом Согласие может быть отозвано мною в любое время на основании моего письменного заявления. режим', checked: state?.form?.agree }
              ]}
            />
    
            <Row>
                <Button type="button" disabled={!state?.form?.agree} classNames="accent">{text}</Button>
            </Row>
        </div>
        )}
      </Form>
    )
}