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
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  maxLength,
  placeholderTextColor,
  keyboardType,
  inputMode,
  error,
  multiline,
  numberOfLines,
  autoFocus,
  disabled,
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
            borderColor: COLORS.error
              ? COLORS.error
              : isFocused
              ? COLORS.primary
              : COLORS.light,
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
            autoCapitalize={autoCapitalize}
            autoCompleteType={autoCompleteType}
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
          />
          {appendComponent}
        </View>
      </View>
      <View>
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
