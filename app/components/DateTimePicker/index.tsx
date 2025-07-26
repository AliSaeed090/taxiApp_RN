import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Icon } from '../index';
import { BaseStyle } from '../../config';
import DateTimePicker from '@react-native-community/datetimepicker';
type Props = {
    value?: any;

  
    mode?: any;
    onChange?: any;
    showMode?: void;
    date: Date;
    placeholder?: string;
    selectionColor?: string;
    error?: boolean;
    errorMessage?: string;
}

const DateTime = (props: Props) => {
    const [show, setShow] = useState(false);
    const {
        value,
        date,
       
        mode,
        onChange,
        placeholder,
        selectionColor,
        error,
        errorMessage,
        ...attrs
    } = props;


    const showDatepicker = () => {
        setShow(true);
    };


    return (
        <TouchableOpacity onPress={showDatepicker}>
            < TextInput
                style={[BaseStyle.textInput]}
                onChangeText={(text: any) => console.log(text)}
                editable={false}
                onFocus={() => {

                }}
                icon={

                    <Icon name="calendar-alt" />

                }
                autoCorrect={false}
                placeholder={placeholder}
                selectionColor={selectionColor}
                error={error}
                errorMessage={errorMessage}
            />
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    onChange={onChange}
                />
            )}
        </TouchableOpacity>
    )
}

export default DateTime