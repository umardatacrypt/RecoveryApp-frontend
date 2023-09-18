import React from "react";

const ResponseContext = React.createContext({
  token: null,
  responses: null,
  getTableList: () => [],
  getRespondToCustomerList: () => [],
  getViewAllResponseList: () => [],
  getViewNewResponseList: () => [],
  getTableListById: () => [],
  responseSetToken: () => [],
});

export default ResponseContext;
