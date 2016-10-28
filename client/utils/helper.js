import axios from 'axios';
import Promise from 'bluebird';

let getMainData = function() {
  return axios.get('http://localhost:8000/api/main');
};

let postLogin = function(user) {
  return axios.post('http://localhost:8000/api/login', user);
};

let postSignUp = function(user) {
  return axios.post('http://localhost:8000/api/signup', user);
};

let postNewGame = function(game) {
	console.log('need to post game here', game);
  return axios.post('http://localhost:8000/api/games', game);
}



var data = {
  getMainData: getMainData,
  postLogin: postLogin,
  postSignUp:postSignUp,
  postNewGame: postNewGame
};

export default data;
