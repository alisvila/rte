import axios from 'axios';
import jwt from 'jwt-decode'
import moment from 'moment'
import { APILink } from '../config';
import JwtDecode from 'jwt-decode';

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

export const getAdById = (id) => {
  return new Promise((resolve, reject) => {
    sendRequest({
      url: `ad/${id}`,
      method: 'GET',
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
  })
}

export const getAllAd = () => {
  return new Promise((resolve, reject) => {
    sendRequest({
      url: 'ad',
      method: 'GET',
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
  })
}

export const getVideoImage = (id, callback) => {
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', `${APILink}ad/${id}/image`);
  xhr.setRequestHeader('Authorization', `Bearer  ${localStorage.getItem('token')}`)
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState !== XMLHttpRequest.DONE || this.status !== 200) {
      callback('fail');
    }
  }
  xhr.responseType = 'blob';
  xhr.send();
}

// export const getVideoImage = (id) => {
//   // return `${APILink}ad/${id}/image`
//   return new Promise((resolve, reject) => {
//     sendRequest({
//       url: `ad/${id}/image`,
//       method: 'get',
//     }).then(res => {
//       resolve((res))
//     }).catch(e => {
//       reject(e)
//     })
//   })
// }

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

export const changePass = (password, newPassword) => {

  console.log(JwtDecode(localStorage.getItem('token')))
  const username = JwtDecode(localStorage.getItem('token')).username

  var bodyFormData = new FormData();
  bodyFormData.append('new_password', newPassword);
  bodyFormData.append('current_password', password);

  return new Promise((resolve, reject) => {
    sendRequest({
      url: 'password',
      method: 'PUT',
      body: bodyFormData
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
  })
}

export const upload = ({file, name, company_id, tag_ids, enabled, schedule}) => {

  var bodyFormData = new FormData();
  bodyFormData.append('video', file);
  bodyFormData.append('name', name);
  bodyFormData.append('company_id', company_id);
  bodyFormData.append('tag_ids', tag_ids);
  bodyFormData.append('enabled', enabled);
  bodyFormData.append('schedule', schedule);


  return new Promise((resolve, reject) => {
    sendRequest({
      url: 'ad',
      method: 'Post',
      body: bodyFormData
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
  })
}

export const editAd = ({adId, name, company_id, tag_ids, enabled, schedule}) => {

  var bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('company_id', company_id);
  bodyFormData.append('tag_ids', tag_ids);
  bodyFormData.append('enabled', enabled);
  bodyFormData.append('schedule', schedule);


  return new Promise((resolve, reject) => {
    sendRequest({
      url: `ad/${adId}`,
      method: 'PUT',
      body: bodyFormData
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
  })
}

export const getTags = () => {
  return new Promise((resolve, reject) => {
    sendRequest({
      url: 'tag',
      method: 'get',
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
  })
}

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    sendRequest({
      url: 'account',
      method: 'get',
    }).then(json => {
      resolve(json)
    }).catch(e => {
      reject(e)
    })
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
    }).then(token => {
      console.log(jwt(token['access_token']))
      localStorage.setItem('token', token['access_token'])
      localStorage.setItem('refresh_token', token['refresh_token'])
      resolve(true)
    }).catch(e => {
      reject(false)
    })
  })
}

export const sendRefreshToken = (failedReq, data) => {
  console.log('in refresh token')
  var bodyFormData = new FormData();
    sendRequest({
      url: 'refresh',
      method: 'Post',
      auth: `Bearer  ${localStorage.getItem('refresh_token')}`,
      body: bodyFormData
    }).then(token => {
      localStorage.setItem('token', token['access_token'])
      console.log(data)
      failedReq(data)
    }).catch(e => {
    })
}

export const sendRequest = async ({ auth = "", url, params = "", method = "GET", body = "", res = "data" }) => {
  console.log(auth === "", localStorage.getItem('token').length > 0)
  if (auth === "" && localStorage.getItem('token').length > 0) {
    auth = `Bearer  ${localStorage.getItem('token')}`
    const token = jwt(localStorage.getItem('token'))
    console.log(token['exp'] < Date.now().toString().substr(0, 10))
    if (token['exp'] < Date.now().toString().substr(0, 10)) {
      sendRefreshToken(sendRequest, {auth, url, params, method, body, res})
    }
  }
  let options = {
    url: `${APILink}${url}?${params}`,
    method,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: auth
    }
  }
  if (method !== 'GET') {
    options.data = body
  }
  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => {
        if (response.status !== 200) throw response.status;
        if (res === 'blob') {
            resolve(response)
        }
        resolve(response.data)
      })
      // .then(json => resolve(json))
      .catch((e) => {
        console.log(e);
        reject(e);
      });
  });
};
