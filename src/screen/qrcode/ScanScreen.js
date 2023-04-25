// import React from 'react';
// import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';

// const ScanScreen = () => {
//   const onSuccess = e => {
//     Linking.openURL(e.data).catch(err =>
//       console.error('An error occured', err),
//     );
//   };

//   return (
//     <QRCodeScanner
//       onRead={onSuccess}
//       flashMode={RNCamera.Constants.FlashMode.torch}
//       topContent={
//         <Text style={styles.centerText}>
//           Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text>{' '}
//           on your computer and scan the QR code.
//         </Text>
//       }
//       bottomContent={
//         <TouchableOpacity style={styles.buttonTouchable}>
//           <Text style={styles.buttonText}>OK. Got it!</Text>
//         </TouchableOpacity>
//       }
//     />
//   );
// };

// export default ScanScreen;

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)',
//   },
//   buttonTouchable: {
//     padding: 16,
//   },
// });

// Generation of QR Code in React Native
// https://aboutreact.com/generation-of-qr-code-in-react-native/

// import React in our code
import React, {useState, useRef} from 'react';
import {Button} from 'react-native';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Share,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import ScanScreenCode from './ScanScreenCode';

const ScanScreen = () => {
  const [inputText, setInputText] = useState('');
  const [qrvalue, setQrvalue] = useState('');
  let myQRCode = useRef();

  const shareQRCode = () => {
    myQRCode.toDataURL(dataURL => {
      console.log(dataURL);
      let shareImageBase64 = {
        title: 'React Native',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'Share Link', //  for email
      };
      Share.share(shareImageBase64).catch(error => console.log(error));
    });
  };

  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <View style={styles.container}>
    //     <Text style={styles.titleStyle}>
    //       Generation of QR Code in React Native
    //     </Text>
    //     <QRCode
    //       getRef={ref => (myQRCode = ref)}
    //       // ref={myQRCode}
    //       //QR code value
    //       value={qrvalue ? qrvalue : 'NA'}
    //       //size of QR Code
    //       size={250}
    //       //Color of the QR Code (Optional)
    //       color="black"
    //       //Background Color of the QR Code (Optional)
    //       backgroundColor="white"
    //       //Center Logo size  (Optional)
    //       logoSize={30}
    //       //Center Logo margin (Optional)
    //       logoMargin={2}
    //       //Center Logo radius (Optional)
    //       logoBorderRadius={15}
    //       //Center Logo background (Optional)
    //       logoBackgroundColor="yellow"
    //     />
    //     <Text style={styles.textStyle}>
    //       Please insert any value to generate QR code
    //     </Text>
    //     <TextInput
    //       style={styles.textInputStyle}
    //       onChangeText={inputText => setInputText(inputText)}
    //       placeholder="Enter Any Value"
    //       value={inputText}
    //     />
    //     <TouchableOpacity
    //       style={styles.buttonStyle}
    //       onPress={() => setQrvalue(inputText)}
    //     >
    //       <Text style={styles.buttonTextStyle}>Generate QR Code</Text>
    //     </TouchableOpacity>

    //     <TouchableOpacity style={styles.buttonStyle} onPress={shareQRCode}>
    //       <Text style={styles.buttonTextStyle}>Share QR Code</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <TouchableOpacity>
    //     <ScanScreenCode />
    //   </TouchableOpacity>
    // </SafeAreaView>
    <ScanScreenCode />
  );
};
export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
