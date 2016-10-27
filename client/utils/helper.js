import axios from 'axios';
import Promise from 'bluebird';

var getMainData = function() {
  return axios.get('http://localhost:8000/api/main');
};

var postLogin = function(user) {
  return axios.post('http://localhost:8000/api/login', user);
};



var data = {
  getMainData: getMainData,
  postLogin: postLogin
};

export default data;
