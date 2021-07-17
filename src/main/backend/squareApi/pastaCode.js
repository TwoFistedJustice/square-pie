const squareCreateCustomer = async function(body){
  let connect = await squareValues(isProduction);
  let secret = await getSecret(connect.secret);
  let endpoint = '/customers';
  let url = `${connect.baseUrl}${endpoint}`;
  let headers = {
    'Square-Version': '2021-05-13',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${secret}`
  };
  
  let options = {
    method: 'post',
    headers: headers,
    body: JSON.stringify(body)
  };
  
  
  const httpResponse = await fetch(url, options);
  if(!httpResponse.ok){
    console.log(httpResponse);
    throw new Error('Customer not created.');
  }
  console.log(httpResponse);
  let response = await httpResponse.json();
  return response;
};


// for LIST the changes are body and method.
// method: get, body: undefined
const squareListCustomers = async function(body){
  let connect = await squareValues(isProduction);
  let secret = await getSecret(connect.secret);
  let endpoint = '/customers';
  let url = `${connect.baseUrl}${endpoint}`;
  
  
  let headers = {
    'Square-Version': '2021-05-13',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${secret}`
  };
  
  let options = {
    method: 'get',
    headers: headers,
    body: body
  };
  
  const httpResponse = await fetch(url, options);
  if(!httpResponse.ok){
    throw new Error('Customer not created.');
  }
  console.log(httpResponse);
  let response = await httpResponse.json();
  return response;
};


export async function go(){
  let res = await squareListCustomers();
  console.log(res);
  return res;
};
