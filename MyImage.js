import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import {useSelector} from 'react-redux';

const MyImage = () => {
  const [document, setDocument] = React.useState('');
  const token = useSelector(state => state?.user?.user?.access_token);

  //   const token =
  //     'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTBlOTM1NmY4NmIxNzQ3NTFhZTJkYTBmNmRhZTQwZTUwMTEzZDI1ZGY5MjE1ZmE1NTc4NjY1MjcyOWI3NjZlNDA4NTJiNDA1YzQzMTgyMDkiLCJpYXQiOjE2ODA2ODY2NzQuMzMwNDEwMDAzNjYyMTA5Mzc1LCJuYmYiOjE2ODA2ODY2NzQuMzMwNDEzMTAzMTAzNjM3Njk1MzEyNSwiZXhwIjoxNzEyMzA5MDc0LjMyMTE3MzkwNjMyNjI5Mzk0NTMxMjUsInN1YiI6IjEwOSIsInNjb3BlcyI6W119.k6GPuCWdL0RLpF8kqEMtG1z96hw7tZpPgwoUC_83WuoHzW95IRDWZpAau1Vkp86Z6C_QJUaqrDYdGPGkIaHFuMdrw0RJDGmOKP8r9VQcJ87aY3yXDsyioFYya3srnJKB5Ok0D74MoPntmRwibmGch6h2OxwPB-dPcevV9oUM2NDsYFLr3XeVjgNz2BOG0w91xWGGnjq0CWuPWEGcDWTegfchJzhFVe5ki9DpMl_dv_meyW4HxGfDOqk4g_VAr71VO-36Ypq3hTPjfvssoor1lMBRNkU50qkV2WYLhD6gT67ofRJh44R9gkKDeOjlA3bBCuMrK-T6mpa5j5UZIwytx-fy_QD9m-tq1uGNVwj4mTPD6TQ4x8QF9Z0lQV5N7GxMI8KvkGSDq60If0wGdYk11pgykAsuAV-Pz6gunOt30tl1IuqApa9M1jkI254ug50G6okTqINZbF0h6dzadoMKgoSkh0Mw0TCAZuGiyUavIrg-NsF5CgqnVrbqq7gkzJ2aM25530jv649mh6SWYGRlSO7jMEolwNXx6XfZe37yiIUubiIb2kuUJ28SBI2NrAQeJmEhbzZEaY1l0udbeRIg4bqnyPgT2geIOLk2BhxAohFPb_47QzH04eNoERSrou2nmwPLx6WXJu4tJ5gYR4b1eJbUk4zaEh1YVNE4deSXuU8';

  async function uploadAPICall(res) {
    setDocument(...res);
    console.log('res', JSON.stringify(res));
    const header = {
      Authorization: 'Bearer ' + token,
      Accept: '*/*',
      'Content-Type': 'multipart/form-data;',
    };
    const config = {
      headers: header,
    };

    const formData = new FormData();

    const response = res.map(e => ({
      uri: e?.uri,
      name: e?.name,
      type: e?.type,
      //   file: 'http://localhost:8000/uploads/uploads/1676106286-94986.docx',
      //   file_name: e.name,
      //   file_extension: DocumentPicker.types.doc,
      //   uploading_file_name: e.name,
      //   file_extension: '',
      //   file_name: '',
      //   uploading_file_name: '',
    }));
    formData.append('is_multiTime', 1);
    formData.append('file', res);

    console.log('response', formData);
    // return;

    if (token) header['Authorization'] = 'Bearer ' + token;
    try {
      const a = await axios.post(
        'https://meeting-api.gofactz.com/public/api/file-upload',
        formData,
        config,
      );

      console.log('a', JSON.stringify(a));
    } catch (e) {
      console.log('e', e?.response);
    }
    console.log('config', config);
  }

  console.log('document', document.uri);
  async function docPicker() {
    // Pick a single file
    try {
      const res = await DocumentPicker.pickMultiple({
        //by using allFiles type, you will able to pick any type of media from user device,
        //There can me more options as well
        //DocumentPicker.types.images: All image types
        //DocumentPicker.types.plainText: Plain text files
        //DocumentPicker.types.audio: All audio types
        //DocumentPicker.types.pdf: PDF documents
        //DocumentPicker.types.zip: Zip files
        //DocumentPicker.types.csv: Csv files
        // DocumentPicker.types.doc: doc files
        //DocumentPicker.types.docx: docx files
        //DocumentPicker.types.ppt: ppt files
        //DocumentPicker.types.pptx: pptx files
        //DocumentPicker.types.xls: xls files
        //DocumentPicker.types.xlsx: xlsx files
        //For selecting more more than one options use the
        //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]
        type: [DocumentPicker.types.allFiles],
      });
      uploadAPICall(res); //here you can call your API and send the data to that API
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('error -----', err);
      } else {
        throw err;
      }
    }
  }

  return (
    <View
      style={{
        width: '30%',
        top: 10,
        justifyContent: 'center',
        borderRadius: 20,
      }}
    >
      <Text>{document.uri}</Text>
      <TouchableOpacity onPress={() => docPicker()} style={styles.uploadView}>
        {/* <Image
          source={{uri: document.uri}}
          style={{width: 100, height: 100, borderWidth: 2}}
        /> */}
        <Text> {'upload  doc'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyImage;

const styles = StyleSheet.create({
  uploadView: {
    backgroundColor: 'red',
  },
});
