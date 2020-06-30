import axios from 'axios';
import { APILink } from '../config';

export const getMatchByQuery = (startTime, endTime, adId, companyId, tagId) => {
  sendRequest({
    url: `match`,
    method: 'GET',
    params: `start_time=${startTime}&end_time=${endTime}&ad_id=${adId}&company_id=${companyId}&tag_id=${tagId}`
  }).then(json => {
    return json
  })
}

export const getMatchVideo = (adId) => {
  sendRequest({
    url: `match/${adId}/video`,
    method: 'GET',
  }).then(json => {
    return json
  })
}

export const getMatchById = (adId) => {
  sendRequest({
    url: `match/${adId}`,
    method: 'GET',
  }).then(json => {
    return json
  })
}

export const getAdVideo = (adId) => {
  sendRequest({
    url: `ad/${adId}/video`,
    method: 'GET',
  }).then(json => {
    return json
  })
}

export const getAdByQuery = (companyId, tagId) => {
  sendRequest({
    url: 'ad',
    params: `company_id=${companyId}&tag_id=${tagId}`,
    method: 'GET',
  }).then(json => {
    return json
  }).catch(e => {
    return e
  })
}

export const upload = (file, name, company_id, tag_ids, enabled, schedule) => {
  var bodyFormData = new FormData();
  bodyFormData.append('video', file);
  bodyFormData.append('name', name);
  bodyFormData.append('company_id', company_id);
  bodyFormData.append('tag_ids', tag_ids);
  bodyFormData.append('enabled', enabled);
  bodyFormData.append('schedule', schedule);

  sendRequest({
    url: 'ad',
    method: 'Post',
    body: bodyFormData
  }).then(json => {
    return json
  })
}

export const auth = (username, password) => {
  var bodyFormData = new FormData();
  bodyFormData.set('username', username);
  bodyFormData.set('password', password);
  return new Promise((resolve, reject) => {
    sendRequest({
      url: 'login',
      method: 'Post',
      body: bodyFormData
    }).then(json => {
      localStorage.setItem('token', json['access_token'])
      localStorage.setItem('refresh_token', json['refresh_token'])
      resolve(true)
    }).catch(e => {
      reject(false)
    })
  })
}

export const sendRequest = async ({ auth = "", url, params = "", method = "GET", body = "" }) => {
  console.log(url, method)
  let options = {
    url: `${APILink}${url}?${params}`,
    method,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: auth,
    }
  }
  if (method !== 'GET') {
    options.data = body
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => {
        console.log(response.data)
        if (response.status !== 200) throw response.status;
        resolve(response.data)
      })
      // .then(json => resolve(json))
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};
