import axios from 'axios';
// import Constants from '../axiosMethod/Constants';
import {constants} from '../constants';
export default ApiMethod = {
  getData: async (endPoint, token) => {
    let url = constants.base_url + endPoint;
    let headers = {
      Accept: '*/*',
      Content: 'application/json',
    };

    let config = {
      headers: headers,
    };

    if (token) headers['Authorization'] = 'Bearer ' + token;
    console.log('token', token);

    try {
      let response = await axios.get(url, config);
      return response;
    } catch (error) {
      console.log('error', error);
    }
  },

  postImageData: async (endPoint, body, token) => {
    let url = constants.base_url + endPoint;
    let headers = {
      Accept: '*/*',
      //   Content: 'application/json',
      'content-type': 'multipart/form-data',
    };

    if (token) headers['Authorization'] = 'Bearer ' + token;

    let config = {
      headers: headers,
    };

    console.log('config--', config);
    console.log('url--', url);
    console.log('body--', body);

    try {
      let response = await axios.post(url, body, config);
      console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
    }
  },

  postData: async (endPoint, body, token) => {
    let url = constants.base_url + endPoint;
    let headers = {
      Accept: '*/*',
      Content: 'application/json',
      //   'content-type': 'multipart/form-data',
    };

    if (token) headers['Authorization'] = 'Bearer ' + token;

    let config = {
      headers: headers,
    };

    // console.log('config--', config);
    // console.log('url--', url);
    // console.log('body--', body);

    try {
      let response = await axios.post(url, body, config);
      //   console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
    }
  },

  deleteData: async (endPoint, token) => {
    let url = constants.base_url + endPoint;
    let headers = {
      Accept: '*/*',
      Content: 'application/json',
      //   'content-type': 'multipart/form-data',
    };

    if (token) headers['Authorization'] = 'Bearer ' + token;

    let config = {
      headers: headers,
    };

    // console.log('config--', config);
    // console.log('url--', url);
    // console.log('body--', body);

    try {
      let response = await axios.delete(url, config);
      //   console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
    }
  },

  putData: async (endPoint, body, token) => {
    let url = constants.base_url + endPoint;
    let headers = {
      Accept: '*/*',
      Content: 'application/json',
      //   'content-type': 'multipart/form-data',
    };

    if (token) headers['Authorization'] = 'Bearer ' + token;

    let config = {
      headers: headers,
    };

    // console.log('config--', config);
    // console.log('url--', url);
    // console.log('body--', body);

    try {
      let response = await axios.put(url, body, config);
      //   console.log('response', response);
      return response;
    } catch (error) {
      console.log('error', error);
    }
  },

  ApiService: async (endpoint, singleFile, debugMsg, extraParamsObj, token) => {
    let formDataRes = new FormData();
    if (!singleFile.size) singleFile['size'] = singleFile.fileSize;
    if (!singleFile.name) singleFile['name'] = singleFile.fileName;

    formDataRes.append('image', singleFile);
    if (extraParamsObj) {
      for (const [key, value] of Object.entries(extraParamsObj)) {
        console.log(`key = `, key, ` value = `, value);
        formDataRes.append(key, value);
      }
    }

    let debugMessage = debugMsg ?? '';
    // let url = 'http://192.168.1.34:8000' + endpoint;
    let url = constants.base_url + endpoint;
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
    extraParamsObj
      ? console.log('extraParamsObj', JSON.stringify(extraParamsObj))
      : null;
    try {
      response = await axios.post(url, formDataRes, configObject);
      if (response) {
        console.log(
          debugMessage + ' SuccessResponse',
          JSON.stringify(response),
        );
        return response;
      } else {
        console.log(
          debugMessage + ' FailureResponse...success value was false',
          JSON.stringify(response),
        );
        response['data'] = response;
        response['errorMsg'] = 'Something went wrong !!';
        return response;
      }
    } catch (error) {
      console.log(debugMessage + ' FailureResponse...inside catch', error);
      response['data'] = error?.response?.data;
      response['errorMsg'] = 'Something went wrong !!';
      return response;
    }
  },
};
