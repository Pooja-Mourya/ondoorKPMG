import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../constants';
import TextButton from '../../components/TextButton';
import {useCustomHook} from '../theme/ThemeContext';
import {StatusBar} from 'react-native';

const height = Dimensions.get('screen').height;

const Walkthrough = ({navigation}) => {
  const {dark, color, themeFunction} = useCustomHook();

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {constants.walkthrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ['white', 'teal', 'white'],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: 10,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };
  function renderFooter() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: height * 0.2,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <Dots />
        <View
          style={{
            justifyContent: 'space-between',

            flexDirection: 'row',
          }}
        >
          <TextButton
            label="Join Now"
            contentContainerStyle={{
              flex: 1,
              marginLeft: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.light,
            }}
            labelStyle={{...FONTS.h3, color: COLORS.primary}}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{name: 'AuthMain'}],
              });
            }}
          />
          <TextButton
            label="Log In"
            contentContainerStyle={{
              flex: 1,
              marginLeft: SIZES.radius,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
              padding: SIZES.padding,
            }}
            labelStyle={{...FONTS.h3, color: 'white'}}
            onPress={() => {
              navigation.navigate('AuthMain');
            }}
          />
        </View>
      </View>
    );
  }
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.primary} />

      <View
        style={{
          flex: 1,
          backgroundColor: dark ? COLORS.light : COLORS.dark,
        }}
      >
        <Animated.FlatList
          style={{flex: 1}}
          data={constants.walkthrough}
          keyExtractor={item => item.id}
          horizontal
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          // onViewableItemsChanged={viewAnimatedChange.current}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          renderItem={({item, index}) => {
            //   console.log('index', index);
            return (
              <>
                <View
                  style={{
                    width: SIZES.width,
                    justifyContent: 'center',
                  }}
                >
                  {/* image section  */}
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      width: SIZES.width,
                      height: 300,
                      alignItems: 'center',
                      zIndex: 2,
                    }}
                  >
                    {index == 0 && (
                      <Image
                        source={require('../../assets/icons/chat.png')}
                        style={{width: 200, height: 200}}
                      />
                    )}
                    {index == 1 && (
                      <Image
                        source={require('../../assets/icons/qr-code.png')}
                        style={{width: 200, height: 200}}
                      />
                    )}
                    {index == 2 && (
                      <Image
                        source={require('../../assets/icons/live-streaming.png')}
                        style={{width: 200, height: 200}}
                      />
                    )}
                    {index == 3 && (
                      <Image
                        source={require('../../assets/icons/fire.png')}
                        style={{width: 200, height: 200}}
                      />
                    )}
                  </View>

                  {/* title & description  */}
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignContent: 'center',
                      height: SIZES.height * 0.35,
                      paddingHorizontal: SIZES.padding,
                    }}
                  >
                    <Text style={{textAlign: 'center', ...FONTS.h1}}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.grey,
                        ...FONTS.body3,
                        textAlign: 'center',
                        marginTop: SIZES.radius,
                      }}
                    >
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
        />
        {renderFooter()}
      </View>
    </>
  );
};

export default Walkthrough;

const styles = StyleSheet.create({});
