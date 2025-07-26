import {BaseColor, BaseStyle, useFont, useTheme} from '../../config';
import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import {I18nManager, TextInput, View} from 'react-native';
import {Text} from '../../components';

export type props = {
  style?: any;
  onChangeText?: any;
  onFocus?: any;
  placeholder?: string;
  value?: string;
  success?: any;
  secureTextEntry?: any;
  keyboardType?: any;
  multiline?: any;
  textAlignVertical?: any;
  icon?: any;
  onSubmitEditing?: any;
  autoCorrect?: any;
  placeholderTextColor?: any;
  selectionColor?: any;
  error?: boolean;
  errorMessage?: string;
  editable?: boolean;
  label?: string;
  numberOfLines?: number;
};

const Index = forwardRef((props: props, ref: any) => {
  const font = useFont();
  const {colors} = useTheme();
  const cardColor = colors.card;
  const {
    style,
    onChangeText,
    onFocus,
    placeholder,
    value,
    success,
    secureTextEntry,
    keyboardType,
    multiline,
    textAlignVertical,
    icon,
    onSubmitEditing,
    error,
    errorMessage,
    editable,
    label,
    numberOfLines,
    ...attrs
  } = props;
  return (
    <View>
      {label && (
        <Text style={{ marginBottom: 5 }} subhead>
          {label}
        </Text>
      )}
      <View
        style={[
          BaseStyle.textInput,
          {
            backgroundColor: cardColor,
            borderColor: error ? 'red' : undefined,
            borderWidth: error ? 1 : undefined,
          },
          style,
        ]}>
        <TextInput
          ref={ref}
          style={{
            fontFamily: `${font}-Regular`,
            flex: 1,
            height: '100%',
            textAlign: I18nManager.isRTL ? 'right' : 'auto',
            color: colors.text,
            paddingTop: 5,
            paddingBottom: 5,
          }}
          editable={editable}
          onChangeText={text => onChangeText(text)}
          onFocus={() => onFocus()}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor={success ? BaseColor.grayColor : colors.primary}
          secureTextEntry={secureTextEntry}
          value={value}
          selectionColor={colors.primary}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={textAlignVertical}
          onSubmitEditing={onSubmitEditing}
          numberOfLines={numberOfLines}
          {...attrs}></TextInput>
        {icon}
      </View>

      <Text footnote style={{ color: 'red' }} header={false} title1={false} title2={false} title3={false} headline={false} body1={false} body2={false} callout={false} subhead={false} caption1={false} caption2={false} overline={false} thin={false} ultraLight={false} light={false} regular={false} medium={false} semibold={false} bold={false} heavy={false} black={false} primaryColor={false} darkPrimaryColor={false} lightPrimaryColor={false} accentColor={false} grayColor={false} dividerColor={false} whiteColor={false} fieldColor={false} numberOfLines={0} textAlign={''}>
        {errorMessage}
      </Text>
    </View>
  );
});

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeText: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  success: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  icon: PropTypes.node,
  onSubmitEditing: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

// Index.defaultProps = {
//   style: {},
//   onChangeText: () => {},
//   onFocus: () => {},
//   placeholder: 'Placeholder',
//   value: '',
//   success: true,
//   secureTextEntry: false,
//   keyboardType: 'default',
//   multiline: false,
//   textAlignVertical: 'center',
//   icon: null,
//   onSubmitEditing: () => {},
//   error: false,
//   errorMessage: '',
// };

export default Index;
