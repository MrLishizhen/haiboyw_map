const login = option => {
  return new Promise(function (resolve, reject) {
    const {ip, port, protocol = 'https', username = '', password = ''} = option;
    const address = `${protocol}://${ip}:${port}/visdata/rest/auth/login?username=${username}&password=${password}&captchaSwitch=false`;
    fetch(address, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(`登录 ${username} 成功`);
      const {result} = json;
      const {access_token} = result;
      resolve(access_token);
    })
    .catch(error => {
      console.log(`登录 ${username} 失败`, error);
      reject(null);
    });
  })
}

// https://test.visdata.com.cn:8081/visdata/rest/dataquery/dataset/queryresult
const queryResult = option => {
  return new Promise(function (resolve, reject) {
    const {ip, port, protocol = 'https', token = '', value = ''} = option;
    const address = `${protocol}://${ip}:${port}/visdata/rest/dataquery/dataconvert/query?definedStr=${value}`;
    fetch(address, {
      method: 'POST',
      headers: { 
        'Token': token, 
        'Content-Type': 'application/json' 
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(`成功`);
      resolve(json)
    })
    .catch(error => {
      console.log(`失败`, error);
      reject(null);
    });
  })
}


module.exports = {
  login,
  queryResult
}
