import React from "react";

const ResponseContext = React.createContext({
  responses: null,
  getTableList: ()=>[],
  getRespondToCustomerList: ()=>[],
  getViewAllResponseList: ()=>[],
  getViewNewResponseList:()=>[]
});

export default ResponseContext;
