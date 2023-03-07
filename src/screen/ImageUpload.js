import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import { launchImageLibrary } from 'react-native-image-picker'
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

let access_token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiODIyYmU0ZDE5ZjM2NzYxOTRlYWI2NjAxMzU5YjZiM2QyNTJkY2Q3OTEzNzYzNGY1ZDc3NDUzOTJiODg2MjYwY2ExOGVlYWVlN2FlMTNhNzIiLCJpYXQiOjE2Nzc4NDE0MzcuNzMwMzk1MDc4NjU5MDU3NjE3MTg3NSwibmJmIjoxNjc3ODQxNDM3LjczMDM5NzkzOTY4MjAwNjgzNTkzNzUsImV4cCI6MTcwOTQ2MzgzNy43MjgzMjEwNzU0Mzk0NTMxMjUsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.fMKCKgQEQko87EJgM_IoGd2pmhytWUn1qMCF_uvlMjMics1LqRz9FFmEHplAEKLaW8OV-Sq-Gk0gedACoy-1ORGufiXbapTcyRNv3EtoN2OVW_VGvcdGWd53BXdnjqQngBlCtAJkPYw8Zr33ggzfPu2sxrvttQTm_JUQnuwQIwSyXQbes7x1otvD6km65bLBXy5yp7sxL3l6ZDj_hNThO8R6xin1gWHqhdJhsPfcn2zOwKwLB4pjzCx2Asb98Eyc3V7JoYtnpnPsswN785dU9dcgFyqvv5AAxnRluUtqVV7xkCAE8wanv47m61oyRu5VObF7wEz16YL9f3P5ckjoPKIFeeZWh0NSGVLVVyk07S38TEQLEKJmPCaTJ_DX-JrX4i91g3XIq1-9zDp3dJm_EA3E59CHr-1kp3779iKymf7SV7yT7wEG2zRqcSLskEB61FHrc_didFUaMShU4jxL2OJgybLsCIGTdzTKOc2IGwzZJR77q0NKKgis7P_7iEKgJUm2BLDZPrXW0WyOjXNr5YBZhZS2MMeDlZ-UXox2bX9EQ9XDhjCbF5U2tYt1h-0An_CLv3XxfOrKXCTHzpLQ7x4oB64WuzTwneW80qLm08HarCDNvoPFfsyGH5EECI4iatkrb_qn515XJm1kL3NO9s4-flMhzCg_LqCKirRPGJs';
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
    if (res?.errorMsg) {
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
