const fetch = require('node-fetch');

const ROOT_URL = 'https://data.etabus.gov.hk';
module.exports.getBusRouteStopKmb = async (route, direction) => {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/kmb/route-stop/${route}/${direction}/1`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log('error = ', e);
  }

  let finalResultList = [];
  if (result && result.data) {
    const resultList = result.data;
    for (let index = 0; index < resultList.length; index++) {
      const item = resultList[index];
      const busStopId = item.stop;
      const busStopDetails = await getBusStopById(busStopId);

      const newItem = Object.assign(item, { stop: busStopDetails.data });
      finalResultList.push(newItem);
    }
  }

  return finalResultList;
};

async function getBusStopById(busStopId) {
  let result = null;

  try {
    const response = await fetch(
      `${ROOT_URL}/v1/transport/kmb/stop/${busStopId}`
    );
    if (response) {
      result = await response.json();
    }
  } catch (e) {
    console.log('error = ', e);
  }

  return result;
}
