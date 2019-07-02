import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { renderRoutes } from 'm2-react';

export class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    routeType: PropTypes.string,
    checkIsAuth: PropTypes.func,
    redirectUrl: PropTypes.string,
    redirect404: PropTypes.string
  };

  componentDidMount() {
    const { checkIsAuth, store } = this.props;
    if (checkIsAuth) {
      this.__root_auth = checkIsAuth();
      this.__store_unsubscribe = store.subscribe(() => {
        const isAuth = checkIsAuth();
        if (this.__root_auth !== isAuth) {
          this.__root_auth = isAuth;
          this.forceUpdate();
        }
      });
    }
  }

  componentWillUnmount() {
    this.__store_unsubscribe();
  }

  render() {
    const { store, routes, checkIsAuth, ...config } = this.props;
    const _routes = renderRoutes(routes, '/', { ...config, authenticated: checkIsAuth() });

    return (
      <Provider store={store}>
        {_routes}
      </Provider>
    )
  }
}

export const reduxHotUpdate = (store, reducerPath) => {
  if (module.hot) {
    module.hot.accept(reducerPath, () => {
      const nextReducer = require(reducerPath).default;
      store.replaceReducer(nextReducer);
    });
  }
};
