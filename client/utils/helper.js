import axios from 'axios';
import Promise from 'bluebird';

var getMainData = function() {
  return axios.get('http://localhost:8000/api/main');
};



var data = {
  getMainData: getMainData
};

export default data;
