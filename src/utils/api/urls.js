const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const LOGIN = `${baseUrl}/user/login`;
export const REGISTER = `${baseUrl}/user`;

export const GET_EMPLOYEES = (search, limit, page) =>
  `${baseUrl}/employee?search=${search}&limit=${limit}&page=${page}`;
export const CREATE_EMPLOYEE = `${baseUrl}/employee`;
export const UPDATE_EMPLOYEE = (employeeId) =>
  `${baseUrl}/employee/${employeeId}`;
export const DELETE_EMPLOYEE = (employeeId) =>
  `${baseUrl}/employee/${employeeId}`;
