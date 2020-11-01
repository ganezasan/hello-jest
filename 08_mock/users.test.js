// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', async () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};

  axios.get.mockResolvedValue(resp);
  // axios.get.mockImplementation(() => Promise.resolve(resp))
  // axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve(resp));

  await expect(Users.all()).resolves.toEqual(users);
});
