import axios from 'axios';
import config from '../config';

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
  console.log('going for auth')
  var bodyFormData = new FormData();
  bodyFormData.set('userName', password);
  bodyFormData.set('userName', username);
  sendRequest({
    url: 'login',
    method: 'Post',
    body: bodyFormData
  }).then(json => {
    localStorage.setItem('token', json['access_token'])
    localStorage.setItem('refresh_token', json['refresh_token'])
  })
}

export const sendRequest = async ({ auth = "", url, params = "", method = "GET", body = "" }) => {
  const APILink = config.url;
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
      .then(response => response.json())
      .then(json => {
        if (!json.meta.success) throw json;
        resolve(json);
      })
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};
