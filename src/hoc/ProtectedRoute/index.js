import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { RootContext } from "../../context/RootContext";

export default ({ children, permissions, ...routeProps }) => {
  const { userToken, permission } = useContext(RootContext);
  const AuthGuard = (permissionCode) => {
    let permissionArray = permission.split(",");
    const userPermission = permissionArray.findIndex(
      (item) => item === permissionCode
    );

    if (userPermission !== -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Route
      {...routeProps}
      render={() => {
        if (userToken) {
          if (permissions === undefined) {
            return children;
          }
          const permission = permissions.some(
            async (item) => await AuthGuard(item)
          );

          // return false;
          if (permission) {
            return children;
          } else {
            return <Redirect to="/" />;
          }
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
