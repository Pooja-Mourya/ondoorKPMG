import React from 'react';
import {View, InputText, TextInput, Text} from 'react-native';
import {FONTS, SIZES, COLORS} from '../constants';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  placeholder,
  inputStyle,
  value,
  prependComponent,
  appendComponent,
  onChange,
  onPress,
  editable,
  secureTextEntry,
  autoCompleteType,
  autoCapitalize,
  maxLength,
  placeholderTextColor,
  keyboardType,
  inputMode,
  error,
  multiline,
  numberOfLines,
  autoFocus,
  disabled,
  onSubmitEditing,
  reference,
  onFocus = () => {},
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <>
      <View style={{...containerStyle}}>
        <View
          style={{
            flexDirection: 'row',
            height: 55,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            backgroundColor: COLORS.lightGrey,
            ...inputContainerStyle,
            // borderColor: error
            //   ? COLORS.error
            //   : isFocused
            //   ? COLORS.grey
            //   : COLORS.light,
            // borderWidth: 2,
            alignItems: 'center',
          }}
        >
          {prependComponent}
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 0,
              ...FONTS.body3,
            }}
            autoCorrect={false}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize ?? 'none'}
            autoCompleteType={autoCompleteType ?? 'off'}
            maxLength={maxLength}
            onChangeText={text => onChange(text)}
            onPressIn={onPress}
            editable={editable}
            keyboardType={keyboardType}
            inputMode={inputMode}
            error={error}
            autoFocus={autoFocus}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            multiline={multiline}
            numberOfLines={numberOfLines}
            disabled={disabled}
            onBlur={() => setIsFocused(false)}
            onSubmitEditing={onSubmitEditing}
            ref={reference}
          />
          {appendComponent}
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        {error && (
          <Text
            style={{
              marginTop: 2,
              color: COLORS.error,
              fontSize: 12,
              paddingHorizontal: 12,
            }}
          >
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

export default FormInput;
