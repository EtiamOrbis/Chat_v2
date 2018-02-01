const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return 'error'
  }
  return token
}
const getHeaders = () => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    const token = getToken();
    if (token) {
        headers = Object.assign({}, headers, { Authorization: `Bearer ${token}` });
    }
    return headers;
}

const options = (method) => {
  return {
    token: getToken(),
    method: method,
    headers:getHeaders()
  }
}

export { getToken };
export { options };
export { getHeaders };
