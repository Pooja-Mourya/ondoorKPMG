import {
  Alert,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import FormInput from '../components/FormInput';
import {COLORS, FONTS, SIZES} from '../constants';
import TextButton from '../components/TextButton';
// import {Timer} from './Authentication/Timer';
import Timer from './Authentication/Timer';

const ValidationForm = () => {
  const [email, setEmail] = useState('');
  const [check, setCheck] = useState(false);
  const [inputs, setInputs] = React.useState({name: '', password: ''});
  const [errors, setErrors] = React.useState(false);
  const [time, setTime] = useState(100);
  const timerRef = useRef(time);

  const handleEmailCheck = e => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmail(e);
    if (reg.test(e)) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.name) {
      handleError('Please input name', 'name');
      isValid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    }
    if (isValid) {
      //   onSubmit()
      return;
    }
  };

  const handleOnchange = (text, input) => {
    // setInputs(prevState => ({...prevState, [input]: text}));
    setInputs({...inputs, [text]: input});
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const onSubmit = () => {
    if (validate()) {
      Alert.alert('submit');
    } else {
      Alert.alert('validation failed');
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const fadeAnim = useRef(new Animated.Value(100)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1000,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const myValue = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const moveElement = () => {
    Animated.timing(myValue, {
      toValue: {x: 100, y: 500},
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <Timer />
      <View
        style={{
          margin: SIZES.padding,
          padding: 10,
          backgroundColor: COLORS.success80,
        }}
      >
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="Email"
          value={email}
          onChange={e => handleEmailCheck(e)}
          // onEndEditing={e => handleValidPassword(e.nativeEvent.text)}
        />
        {check ? (
          <Text style={{color: COLORS.error}}>invalid email formate</Text>
        ) : (
          <Text></Text>
        )}

        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="name"
          value={inputs.name}
          onChange={e => handleOnchange('name', e)}
          onFocus={t => handleError(t, 'name')}
          error={errors.name}
        />
        <FormInput
          containerStyle={{
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.error,
            marginTop: 10,
          }}
          placeholder="password"
          value={inputs.password}
          onChange={e => handleOnchange('password', e)}
          onFocus={t => handleError(t, 'password')}
          error={errors.password}
        />
        <TextButton
          label={'Submit'}
          contentContainerStyle={{
            ...FONTS.base,
            padding: 5,
            borderRadius: SIZES.radius,
            marginVertical: 10,
          }}
          onPress={() => onSubmit()}
        />
      </View>

      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'teal',
          },
          {
            opacity: fadeAnim,
          },
        ]}
      ></Animated.View>

      <Animated.View
        style={{
          backgroundColor: COLORS.secondary,
          width: 100,
          height: 100,
          justifyContent: 'center',
          transform: [{translateX: myValue.x}, {translateY: myValue.y}],
        }}
      >
        <View></View>
      </Animated.View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}
      >
        <TouchableOpacity onPress={fadeIn}>
          <Text style={{backgroundColor: 'tomato'}}>click In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={fadeOut}>
          <Text style={{backgroundColor: 'deeppink'}}>click Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveElement}>
          <Text style={{backgroundColor: 'deepskyblue'}}>click Move</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ValidationForm;

const styles = StyleSheet.create({});

// Keyboard.dismiss();
// setErrors(email, name, password, confirmPassword, number, designation);
// let valid = true;
// if (!email) {
//   setErrors('required  field');
//   valid = false;
// }
// if (!name) {
//   setErrors('required field');
//   valid = false;
// }

// if (mode == true) {
//   if (!confirmPassword) {
//     if (confirmPassword == password) {
//       setErrors('required field');
//       valid = false;
//     } else {
//       Alert.alert('password and confirm password should be same');
//     }
//   }
// } else {
//   if (!password) {
//     setErrors('required field');
//     valid = false;
//   }
// }

// if (!designation) {
//   setErrors('required field . ');
//   valid = false;
// }
// if (valid) {
//   return;
// }
