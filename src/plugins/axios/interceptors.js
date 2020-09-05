/* eslint-disable no-param-reassign */
function setParams(config) {
  const params = config.params || {};
  config.params = Object.assign(
    params,
    {
      key: process.env.VUE_APP_WEBCAMS_API_KEY,
    },
  );
  return config;
}

function returnData(response) {
  return response.data;
}

export default function (axios) {
  axios.interceptors.request.use(setParams);
  axios.interceptors.response.use(returnData);
}
