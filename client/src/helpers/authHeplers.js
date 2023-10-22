export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };
  
  export const setAccessToken = (data) => {
    return localStorage.setItem("accessToken", data);
  };
  
  export const removeAccessToken = () => {
    return localStorage.removeItem("accessToken");
  };

  export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  
  export const setRefreshToken = (data) => {
    return localStorage.setItem("refreshToken", data);
  };
  
  export const removeRefreshToken = () => {
    return localStorage.removeItem("refreshToken");
  };
  
  export const setUserInfo = (data) => {
    return localStorage.setItem("userInfo", JSON.stringify(data));
  };
  
  export const removeUserInfo = () => {
    return localStorage.removeItem("userInfo");
};
  
  export const getUserInfo = () => {
    return localStorage.getItem("userInfo");
  };
  
  export const parseUserInfo = () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    return userData;
  };
  