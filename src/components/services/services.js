import axios from 'axios';
import config from '../../config';


axios({
    method: 'post',
    url: 'myurl',
    data: bodyFormData,
    headers: {  }
})
    .then(function (response) {
        //handle success
        console.log(response);
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });

export const goGetRequest = async ({ auth = "", url, params = "", method = "GET", body = "" }) => {
    const APILink = config.url;
    let options = {
      method,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: auth,
      }
    }
    if (method !== 'GET') {
      options.body = body
    }
    return new Promise((resolve, reject) => {
      fetch(`${APILink}${url}?${params}`, options)
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
  