import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes } from 'm2-react';

export const Root = ({routes, store, routeType}) => {
  const _routes = renderRoutes(routes, '/', routeType);
  return (
    <Provider store={store}>
      {_routes}
    </Provider>
  );
};
