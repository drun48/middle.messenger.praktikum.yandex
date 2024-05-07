import AuthApi from '../api/AuthApi';

const authApi = new AuthApi();

const login = async (data:any) => {
  console.log(data);
  const answer = await authApi.login(data);
  console.log(answer);
};

const getUser = async () => {
  const responseUser = await authApi.getUser();
  console.log(responseUser);
};

export {
  getUser,
  login,
};
