import axios from 'axios';
import Promise from 'bluebird';

var getMainData = function() {
  return axios.get('/api/main');
};

// var getCourts = function() {
//   return new Promise(function(resolve, reject) {
//     axios.get('/api/courts')
//     .then(function(response) {
//       resolve(response);
//     })
//     .catch(function(error) {
//       reject(error);
//     });
//   });
// };



var data = {
  // getGames: getGames,
  // getCourts: getCourts
  getMainData: getMainData
};

export default data;
