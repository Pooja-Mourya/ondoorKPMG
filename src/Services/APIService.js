import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {constants} from '../constants';

const ApiMethod = {
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

    if (constants.base_url + '/' + 'unauthorized') {
      AsyncStorage.removeItem('@user');
    }
    // console.log('config--', config);
    // console.log('url--', url);
    // console.log('body--', body);
    let response = await axios.post(url, body, config);
    //   console.log('response', response);
    return response;
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

  uploadFileServices: async (
    endpoint,
    token,
    title,
    type,
    debugMsg,
    param_key = 'file',
  ) => {
    console.log('-----uploadFile?-----');
    let formDataRes = new FormData();
    console.log('formDataRes', formDataRes);
    let debugMessage = debugMsg ?? '';
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

    console.log(
      ' API reference -- url',
      url,
      'formDataRes',
      JSON.stringify(formDataRes),
    );
    try {
      response = await axios.post(url, formDataRes, configObject);

      if (!response?.data?.error) {
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
      console.log(
        debugMessage + ' FailureResponse...inside catch',
        error?.response?.data,
      );
      console.log(debugMessage + ' FailureResponse...msg', error);

      response['data'] = error?.response?.data;
      response['errorMsg'] =
        error?.response?.data?.message ?? 'something_went_wrong';

      return response;
    }
  },
};

export default ApiMethod;
