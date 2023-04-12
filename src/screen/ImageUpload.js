import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import { launchImageLibrary } from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import ValidationForm from './ValidationForm';
import {useSelector} from 'react-redux';
import MyImage from '../../MyImage';

const ImageUpload = () => {
  let access_token = useSelector(state => state?.user?.user?.access_token);

  const APIServiceUploadFile = async (
    endpoint,
    singleFile,
    token,
    title,
    type,
    debugMsg,
  ) => {
    let formDataRes = new FormData();

    if (type == 'multiple') {
      // formDataRes.append('file_title', title);
      formDataRes.append('is_multiple', 1);
      singleFile.map((obj, index) => {
        if (obj.uri != '') {
          if (!obj.size) obj['size'] = obj.fileSize ?? obj.size;
          if (!obj.name)
            obj['name'] = obj.fileName
              ? obj.fileName
              : obj.name
              ? obj.name
              : obj.uri.substr(obj.uri.lastIndexOf('/'), obj.uri.length);
          // //console.log(obj);
          formDataRes.append('file', obj);
        }
      });
    } else {
      // //console.log('file_title', title)
      formDataRes.append('file_title', title);
      if (singleFile.type !== 'application/pdf') {
        if (!singleFile.size) singleFile['size'] = singleFile.fileSize;
        if (!singleFile.name) singleFile['name'] = singleFile.fileName;
      }
      formDataRes.append('file', singleFile);
    }

    let debugMessage = debugMsg ?? '';

    let url = 'https://meeting-api.gofactz.com/public/api/file-upload';
    let headers = {};
    if (token) {
      headers = {
        Authorization: 'Bearer ' + token,
        Accept: '*/*',
        'Content-Type': 'multipart/form-data;',
      };
    } else {
      headers = {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data;',
      };
    }

    let configObject = {
      headers: headers,
    };

    let response = {};

    // console.log("data =-", url, JSON.stringify(formDataRes))
    // console.log("configObject data =-", configObject)
    // return
    try {
      response = await axios.post(url, formDataRes, configObject);

      console.log(debugMessage + ' SuccessResponse', JSON.stringify(response));
    } catch (error) {
      console.log(debugMessage + ' FailureResponse...inside catch', error);

      response['data'] = error?.response?.data;

      return response;
    }
  };

  const uploadFile = async attachmentArr => {
    let res = await APIServiceUploadFile(
      'file-upload',
      attachmentArr,
      access_token,
      'upload_file_KPMG',
      'multiple',
      'KPMG Attachment',
    );
    if (!res?.errorMsg) {
      Alert.alert('danger', 'res.errorMsg');
      return null;
    } else {
      Alert.alert('success', 'message_uploaded_successfully');
      return res?.data?.payload;
    }
  };

  const imageOrDocumentResponseHandler = async response => {
    if (response.didCancel) {
    } else if (response.error) {
      Alert.alert('danger', 'message_something_went_wrong');
    } else {
      if (Array.isArray(response) && response.length > 0) {
        let uploaded_doc_arr = await uploadFile(response);
      } else if (response?.assets) {
        let uploaded_doc_arr = await uploadFile(response?.assets);
      }
    }
  };

  const openImagePicker = async () => {
    let chooseMultiple = true;
    let res = null;
    try {
      if (chooseMultiple) {
        res = await DocumentPicker.pickMultiple({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
          ],
        });
      } else {
        res = await DocumentPicker.pick({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
          ],
        });
      }
      // return res;
    } catch (err) {
      console.log('DocumentPicker Error', err);
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
    imageOrDocumentResponseHandler(res);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          openImagePicker();
        }}
      >
        <Text style={{color: '#fff', fontWeight: '700'}}>Upload</Text>
      </TouchableOpacity>

      <MyImage />

      <ValidationForm />
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  btn: {
    marginTop: 7,
    width: '70%',
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: 'green',
    paddingVertical: 5,
    overflow: 'hidden',
    // paddingHorizontal: 5
  },
});
