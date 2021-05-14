import { Router } from 'itty-router';
import { getCompany } from './api/company';
import { getBusRoute } from './api/route';
import { getBusRouteStop } from './api/busRouteStop';
import { getBusStop } from './api/busStop';
import { getEstimateTimeArrival } from './api/estimateTimeArrival';

const router = Router();

router.get('/', () => {
  const data = {
    message: 'hongkong-bus-arrival-api',
  };
  const response = new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 200,
  });
  return response;
});

router.get('/company', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');
  console.log('companyId = ', companyId);

  if (companyId) {
    const getCompanyResult = await getCompany(companyId);
    console.log('getCompanyResult = ', getCompanyResult);

    let companyObj = {};
    if (getCompanyResult) {
      companyObj = getCompanyResult.data;
    }

    const data = {
      message: 'getCompany',
      company: companyObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getCompany error, no companyId',
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });
  }

  return response;
});

router.get('/bus-route', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');
  const routeStr = searchParams.get('routeStr');
  console.log('companyId = ', companyId);
  console.log('routeStr = ', routeStr);

  if (companyId && routeStr) {
    const getBusRouteResult = await getBusRoute(companyId, routeStr);
    console.log('getBusRouteResult = ', getBusRouteResult);

    let busRouteObj = {};
    if (getBusRouteResult) {
      busRouteObj = getBusRouteResult.data;
    }

    const data = {
      message: 'getBusRoute',
      busRoute: busRouteObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusRoute error, no companyId and routeStr',
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });
  }

  return response;
});

router.get('/bus-route-stop', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');
  const routeStr = searchParams.get('routeStr');
  const direction = searchParams.get('direction');
  console.log('companyId = ', companyId);
  console.log('routeStr = ', routeStr);
  console.log('direction = ', direction);

  if (companyId && routeStr && direction) {
    const getBusRouteStopResult = await getBusRouteStop(
      companyId,
      routeStr,
      direction
    );
    console.log('getBusRouteStopResult = ', getBusRouteStopResult);

    let busRouteStopObj = {};
    if (getBusRouteStopResult) {
      busRouteStopObj = getBusRouteStopResult.data;
    }

    const data = {
      message: 'getBusRouteStop',
      busRouteStop: busRouteStopObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusRouteStop error, no companyId and routeStr and direction',
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });
  }

  return response;
});

router.get('/bus-stop/:busStopId', async ({ params }) => {
  let response = null;

  const busStopId = params.busStopId;
  console.log('busStopId = ', busStopId);

  if (busStopId) {
    const getBusStopResult = await getBusStop(busStopId);
    console.log('getBusStopResult = ', getBusStopResult);

    let busStopObj = {};
    if (getBusStopResult) {
      busStopObj = getBusStopResult.data;
    }

    const data = {
      message: 'getBusStop',
      busStop: busStopObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusStop error, no busStopId',
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });
  }

  return response;
});

router.get('/bus-arrival-time', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');
  const routeStr = searchParams.get('routeStr');
  const busStopId = searchParams.get('busStopId');
  console.log('companyId = ', companyId);
  console.log('routeStr = ', routeStr);
  console.log('busStopId = ', busStopId);

  if (companyId && routeStr && busStopId) {
    const getEstimateTimeArrivalResult = await getEstimateTimeArrival(
      companyId,
      routeStr,
      busStopId
    );
    console.log(
      'getEstimateTimeArrivalResult = ',
      getEstimateTimeArrivalResult
    );

    let busArrivalTimeObj = {};
    if (getEstimateTimeArrivalResult) {
      busArrivalTimeObj = getEstimateTimeArrivalResult.data;
    }

    const data = {
      message: 'getBusArrivalTime',
      busArrivalTime: busArrivalTimeObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message:
        'getBusArrivalTime error, no companyId and routeStr and busStopId',
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });
  }

  return response;
});

router.all('*', () => {
  const data = {
    message: 'Not found',
  };
  const response = new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 400,
  });
  return response;
});

addEventListener('fetch', e => {
  e.respondWith(router.handle(e.request));
});
