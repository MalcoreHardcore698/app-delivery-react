import React from 'react'
import Select from 'react-select'
import { FixedSizeList as List } from 'react-window'

const styles = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderColor: state.isSelected ? 'rgba(20,83,136,.6)' : '#dee2e6',
        borderRadius: '5px',
        boxShadow: 'none',
        cursor: 'pointer'
    }),
    menu: (provided: any) => ({
        ...provided,
        background: 'white',
        borderRadius: '5px',
        fontSize: '1rem',
        fontWeight: 400,
        boxShadow: '0 0 50px 0 rgba(0, 0, 0, .075)',
        border: '1px solid #dee2e6'
    }),
    option: (provided: any, state: any) => {
        return {
            ...provided,
            fontSize: '1rem',
            fontWeight: 400,
            background: state.isFocused ? '#f3f3f3' : 'white',
            color: state.isFocused ? '#3e7ba7' : '#888',
            cursor: 'pointer'
        }
    }
}

const groupStyles: any = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
  
const groupBadgeStyles: any = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
}

const formatGroupLabel = (data: any) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
)

const height: number = 35

const MenuList = (props: any) => {
    const { options, children, maxHeight, getValue }: any = props
    const [value]: any = getValue()
    const initialOffset: any = options.indexOf(value) * height

    return (
        <List
            width="100%"
            height={maxHeight}
            itemCount={children.length}
            itemSize={height}
            initialScrollOffset={initialOffset}
        >
            {({ index, style }: any) => <div style={style}>{children[index]}</div>}
        </List>
    )
}

export default (props: any) => {
    if (props.bigdata)
        return <Select components={{ MenuList }} styles={styles} {...props} />

    if (props.grouped)
        return <Select formatGroupLabel={formatGroupLabel} styles={styles} {...props} />

    return (
        <Select styles={styles} {...props} />
    )
}