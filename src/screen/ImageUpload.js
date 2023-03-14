import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import { launchImageLibrary } from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import ValidationForm from './ValidationForm';

let access_token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNDQyOGU2OTdiZjRlZDUwMDdkNzEyNTFlM2U0YWI0NGM4OTQwMmU1MGRmNmVjM2EwYjY5ZDRkZmJiM2M4ZWYwNjk0NmMyNmM1Yzc3ZTI1YjgiLCJpYXQiOjE2Nzg0MjYwOTYuMjc3OTE5MDU0MDMxMzcyMDcwMzEyNSwibmJmIjoxNjc4NDI2MDk2LjI3NzkyMTkxNTA1NDMyMTI4OTA2MjUsImV4cCI6MTcxMDA0ODQ5Ni4yNzYxMjQwMDA1NDkzMTY0MDYyNSwic3ViIjoiMSIsInNjb3BlcyI6W119.b67yoflbxf9f1U2pBvn0PzyY4Fttz0_rFELl69-idEaz5IKnDsc62d3827gbHjx8-93KP3X6ZCAmnHWRJ2OGmZK3FvMHNWmhbmO_zXnt1JNGAEFmb3cNkIlMgnH1pkAOln19JmHfxJb0W6bw8sp0jn4a-JjiKeoIXMy7FNgNkSeAcja9ehZg4Nba4RXKh9oT4bsEnV_D_QIkckp3V1VjJdJVOcH1Qa8WSRiIv5O8SHqfP7PKKzkQYJggKVUCcN92uUlx77N2vXgv5K4uyWRIycYYMG-sCZadY8YI1rD-6aVdcy2T5YyJOJCcZWshvPr31VQA_jJoco6gWUwbrDYjAvZZvuosFJ4L3Nr668eKpo4GibLrHWPwhqb7E6F03ouh7z2GhAVZf9zyXqJAMIqelkVyPPZ9oRetFvhLIXsM2hMkc-87cR-GSYo5ocPq3xrH-wTtoeiiWL54W5hOJBS5B95xKcR4WRGHTMbfCshE34QwnPGuCaSFOC1bhoMEaq_U2TIU0dL-53SCOI7tDlNRidKRh6B974PIMZXbv5IbpSLwkFLHlTALp8eWSfv5294Ihxp4TbIIUWQiSiz_O1TQHh9OUYrvdSdCgGOeYD57t7trhuN7Y28qyevg1hXFFcKSTBE13Zcv5vkqtTAFVmFW3Qe3MhAa9gdoWo3sNdYIeKg';
const ImageUpload = () => {
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
          formDataRes.append('file[0]', obj);
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
