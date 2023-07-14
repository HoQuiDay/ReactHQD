import axios from '../axios';
const handleLoginApi = (email, password) => {
  return axios.post('/api/login', {
    email: email,
    password: password,
  });
};
const getAllUsers = (usersId) => {
  return axios.get(`api/get-all-user?id=${usersId}`);
};
const createNewUserService = (data) => {
  return axios.post('/api/create-user', data);
};
const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', {
    data: {
      id: userId,
    },
  });
};
const editUserService = (data) => {
  return axios.put('/api/edit-user', data);
};
export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService };
