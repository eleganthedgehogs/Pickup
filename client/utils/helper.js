import axios from 'axios';
import Promise from 'bluebird';

var getMainData = function() {
  return axios.get('http://localhost:8000/api/main');
};

var postLogin = function(user) {
  return axios.post('http://localhost:8000/api/login', user);
};

let postNewGame = function(game) {
	console.log('need to post game here', game);
}



var data = {
  getMainData: getMainData,
  postLogin: postLogin,
  postNewGame: postNewGame
};

export default data;
