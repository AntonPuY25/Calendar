import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: number[]
    onChangeOption?: (option: number) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {

        onChangeOption && onChangeOption(+e.currentTarget.value)
    }


    const mappedOptions: JSX.Element[] = options ? options.map((o, i) => (
            <label key={name + "-" + i}>
                <input type={'radio'} value={o} checked={value === o} onChange={onChangeCallback}
                       name={name} {...restProps}/>
                {o + ':00'}
            </label>
        )) :
        [];

    return (
        <>
            {mappedOptions}
        </>
    );
}

export default SuperRadio