import React, { Props } from "react";
import _ from "lodash";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoutes, PublicRoutes, SessionRoutes } from "routes";
import NotFound from "./publicLayout/NotFound";
import PrivateLayout from "./privateLayout";
import PublicLayout from "./publicLayout";
import GlobalStyles from "styles/Global";
import Theme from "styles/Theme";
import { connect } from "react-redux";
import { UserState } from "store/modules/User/types";
import { rootState } from "store/modules";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;
function App({ userState }: any) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Wrapper>
          <Switch>
            {_.map(PublicRoutes, (route, key) => {
              const { component, path } = route;
              return (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={route =>
                    userState.isLogged ? (
                      <PrivateLayout component={component} />
                    ) : (
                      <PublicLayout component={component} />
                    )
                  }
                />
              );
            })}
            {_.map(PrivateRoutes, (route, key) => {
              const { component, path } = route;
              return (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={route =>
                    userState.isLogged ? (
                      <PrivateLayout component={component} />
                    ) : (
                      <Redirect to={SessionRoutes.Login.path} />
                    )
                  }
                />
              );
            })}

            {_.map(SessionRoutes, (route, key) => {
              const { component, path } = route;
              return (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={route =>
                    userState.isLogged ? (
                      <Redirect to={PublicRoutes.Main.path} />
                    ) : (
                      <PublicLayout component={component} />
                    )
                  }
                />
              );
            })}
            <Route component={NotFound} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const mapStateProps = (rootState: rootState) => ({
  userState: rootState.userReducer
});
export default connect(mapStateProps)(App);