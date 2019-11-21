import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = state => {
    return this.service
      .post('/signup', { state })
      .then(response => response.data);
  };

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
    return this.service
      .get(`/log/all/my-posts`)
      .then(response => response.data);
  };

  seeUser = userId => {
    return this.service
      .get(`/log/all/${userId}`)
      .then(response => response.data);
  };

  changeInfo = userInfo => {
    return this.service
      .post(`/change-info`, { userInfo })
      .then(response => response.data);
  };

  changePass = userInfo => {
    return this.service
      .post(`/change-password`, { userInfo })
      .then(response => response.data);
  };

  deleteUser = confirmation => {
    return this.service
      .post(`/delete-user`, { confirmation })
      .then(response => response.data);
  };

  logout = () => {
    return this.service.post('/logout', {}).then(response => response.data);
  };
}
export default AuthService;
