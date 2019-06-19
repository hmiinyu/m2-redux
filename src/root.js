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
    const { checkIsAuth } = this.props;
    this.__authenticated = checkIsAuth();
    this.props.store.subscribe(() => {
      if (this.__authenticated !== checkIsAuth()) {
        this.__authenticated = checkIsAuth();
        this.forceUpdate();
      }
    });
  }

  render() {
    const { store, routes, ...config } = this.props;
    const _routes = renderRoutes(routes, '/', config);

    return (
      <Provider store={store}>
        {_routes}
      </Provider>
    )
  }
}
