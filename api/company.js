const fetch = require('node-fetch');

const ROOT_URL = 'https://rt.data.gov.hk';
module.exports.getCompany = async companyId => {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/citybus-nwfb/company/${companyId.toUpperCase()}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log('error = ', e);
  }

  return result;
};
