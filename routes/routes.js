import { Router } from 'itty-router';
import { getCompany } from '../api/nwfbOrCtb/company';
import { getBusRoute } from '../api/nwfbOrCtb/route';
import { getBusRouteStop } from '../api/nwfbOrCtb/busRouteStop';
import { getBusStop } from '../api/nwfbOrCtb/busStop';
import { getEstimateTimeArrival } from '../api/nwfbOrCtb/estimateTimeArrival';

import { getBusRouteListKmb } from '../api/kmb/busRouteList';
import { getBusStopListKmb } from '../api/kmb/busStopList';
import { getBusRouteKmb } from '../api/kmb/routeKmb';
import { getBusRouteStopKmb } from '../api/kmb/busRouteStop';
import { getEstimateTimeArrivalKmb } from '../api/kmb/estimateTimeArrival';
import { getBusStopEstimateTimeArrivalKmb } from '../api/kmb/busStopEstimateTimeArrival';
import { getBusRouteEstimateTimeArrivalKmb } from '../api/kmb/busRouteEstimateTimeArrival';

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

// ----- nwfb/ctb route start -----
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
      busRouteStopObj = getBusRouteStopResult;
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
// ----- nwfb/ctb route end -----

// ----- kmb route start -----
router.get('/kmb/bus-route-list', async request => {
  let response = null;

  const getBusRouteListKmbResult = await getBusRouteListKmb();
  console.log('getBusRouteListKmbResult = ', getBusRouteListKmbResult);

  if (getBusRouteListKmbResult) {
    const data = {
      message: 'getBusRouteList',
      busRouteList: getBusRouteListKmbResult.data,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  }

  return response;
});

router.get('/kmb/bus-stop-list', async request => {
  let response = null;

  const getBusStopListKmbResult = await getBusStopListKmb();
  console.log('getBusStopListKmbResult = ', getBusStopListKmbResult);

  if (getBusStopListKmbResult) {
    const data = {
      message: 'getBusStopList',
      busStopList: getBusStopListKmbResult.data,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  }

  return response;
});

router.get('/kmb/bus-route', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const route = searchParams.get('route');
  const direction = searchParams.get('direction');
  console.log('route = ', route);
  console.log('direction = ', direction);

  if (route && direction) {
    const getBusRouteKmbResult = await getBusRouteKmb(route, direction);
    console.log('getBusRouteKmbResult = ', getBusRouteKmbResult);

    let busRouteKmbObj = {};
    if (getBusRouteKmbResult) {
      busRouteKmbObj = getBusRouteKmbResult.data;
    }

    const data = {
      message: 'getBusRouteKmb',
      busRouteKmb: busRouteKmbObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusRouteKmb error, no route, direction',
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

router.get('/kmb/bus-route-stop', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const route = searchParams.get('route');
  const direction = searchParams.get('direction');
  console.log('route = ', route);
  console.log('direction = ', direction);

  if (route && direction) {
    const getBusRouteStopKmbResult = await getBusRouteStopKmb(route, direction);
    console.log('getBusRouteStopKmbResult = ', getBusRouteStopKmbResult);

    let busRouteStopKmbList = [];
    if (getBusRouteStopKmbResult) {
      busRouteStopKmbList = getBusRouteStopKmbResult;
    }

    const data = {
      message: 'getBusRouteStopKmb',
      busRouteStopKmb: busRouteStopKmbList,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusRouteStopKmb error, no route, direction',
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

router.get('/kmb/bus-arrival-time', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const route = searchParams.get('route');
  const busStopId = searchParams.get('busStopId');
  console.log('route = ', route);
  console.log('busStopId = ', busStopId);

  if (route && busStopId) {
    const getEstimateTimeArrivalKmbResult = await getEstimateTimeArrivalKmb(
      route,
      busStopId
    );
    console.log(
      'getEstimateTimeArrivalKmbResult = ',
      getEstimateTimeArrivalKmbResult
    );

    let busArrivalTimeKmbList = [];
    if (getEstimateTimeArrivalKmbResult) {
      busArrivalTimeKmbList = getEstimateTimeArrivalKmbResult.data;
    }

    const data = {
      message: 'getBusArrivalTimeKmb',
      busArrivalTimeKmb: busArrivalTimeKmbList,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusArrivalTimeKmb error, no route and busStopId',
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

router.get('/kmb/bus-stop-arrival-time', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const busStopId = searchParams.get('busStopId');
  console.log('busStopId = ', busStopId);

  if (busStopId) {
    const getBusStopEstimateTimeArrivalKmbResult = await getBusStopEstimateTimeArrivalKmb(
      busStopId
    );
    console.log(
      'getBusStopEstimateTimeArrivalKmbResult = ',
      getBusStopEstimateTimeArrivalKmbResult
    );

    let busStopArrivalTimeKmbObj = {};
    if (getBusStopEstimateTimeArrivalKmbResult) {
      busStopArrivalTimeKmbObj = getBusStopEstimateTimeArrivalKmbResult;
    }

    const data = {
      message: 'getBusStopArrivalTimeKmb',
      busStopArrivalTimeKmb: busStopArrivalTimeKmbObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'getBusStopArrivalTimeKmb error, no busStopId',
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

router.get('/kmb/bus-route-arrival-time', async request => {
  let response = null;

  const { searchParams } = new URL(request.url);
  const route = searchParams.get('route');
  console.log('route = ', route);

  if (route) {
    const getBusRouteEstimateTimeArrivalKmbResult = await getBusRouteEstimateTimeArrivalKmb(
      route
    );
    console.log(
      'getBusRouteEstimateTimeArrivalKmbResult = ',
      getBusRouteEstimateTimeArrivalKmbResult
    );

    let busRouteArrivalTimeKmbObj = {};
    if (getBusRouteEstimateTimeArrivalKmbResult) {
      busRouteArrivalTimeKmbObj = getBusRouteEstimateTimeArrivalKmbResult.data;
    }

    const data = {
      message: 'busRouteArrivalTimeKmb',
      busRouteArrivalTimeKmb: busRouteArrivalTimeKmbObj,
    };
    response = new Response(JSON.stringify(data), {
      headers: {
        'Content-type': 'application/json',
      },
      status: 200,
    });
  } else {
    const data = {
      message: 'busRouteArrivalTimeKmb error, no route',
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
// ----- kmb route end -----

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

export default router;
