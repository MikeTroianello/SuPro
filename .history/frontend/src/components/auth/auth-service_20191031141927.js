import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  // signup = (username, password) => {
  //   return this.service
  //     .post('/signup', { username, password })
  //     .then(response => response.data);
  // };

  loggedin = () => {
    return this.service.get('/loggedin').then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post('/login', { username, password })
      .then(response => response.data);
  };

  create = info => {
    return this.service
      .post('/log/create', { info })
      .then(response => response.data);
  };

  getDate = (year, dayOfYear) => {
    return this.service
      .get(`/log/date/${year}/${dayOfYear}`)
      .then(response => response.data);
  };

  profile = () => {
    return this.service.get(`/log/my-posts`).then(reponse => respons.data);
  };

  // logout = () => {
  //   return this.service.post('/logout', {}).then(response => response.data);
  // };
}
export default AuthService;
