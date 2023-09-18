import React, { useCallback, useState } from "react";
import { baseUrl } from "../constant";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ResponseContext from "../Context";

const ResponseProvider = (props: any) => {
  const location = useLocation();
  const bucode = location.pathname.replace("/", "");
  const [responseList, setResponseList] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setTotalCount] = useState<number>(0);
  const [token, setToken] = useState<string>("");

  const getTableList = useCallback(async (offset = 0, limit = 10) => {
    const responsesList: any = await axios.post(
      `${baseUrl}/api/allResponsesWithPagination`,
      {
        offset,
        limit,
        bucode,
      }
    );
    setTotalCount(responsesList.data.totalCount);
    setResponseList(responsesList.data.paginatedDataList);
  }, []);

  const getTableListById = useCallback(() => {
    console.log(responseList[0]);
  }, []);

  const responseSetToken = useCallback((token: any) => {
    setToken(token);
  }, []);

  const getRespondToCustomerList = useCallback(
    async (offset = 0, limit = 10) => {
      const responsesList: any = await axios.post(
        `${baseUrl}/api/respondToCustomerList?BuCode=${bucode}`,
        {
          offset,
          limit,
        }
      );
      setResponseList(responsesList.data.paginatedDataList);
    },
    []
  );

  const getViewAllResponseList = useCallback(async (offset = 0, limit = 10) => {
    const responsesList: any = await axios.post(
      `${baseUrl}/api/viewAllResponses?BuCode=${bucode}`,
      {
        offset,
        limit,
      }
    );
    setResponseList(responsesList.data.paginatedDataList);
  }, []);

  const getViewNewResponseList = useCallback(async (offset = 0, limit = 10) => {
    const responsesList: any = await axios.post(
      `${baseUrl}/api/viewNewResponses?BuCode=${bucode}`,
      {
        offset,
        limit,
      }
    );
    setResponseList(responsesList.data.paginatedDataList);
  }, []);

  const responseContext: any = {
    token: token,
    responses: responseList,
    getTableList: getTableList,
    getRespondToCustomerList: getRespondToCustomerList,
    getViewAllResponseList: getViewAllResponseList,
    getViewNewResponseList: getViewNewResponseList,
    getTableListById: getTableListById,
    responseSetToken: responseSetToken,
  };

  return (
    <ResponseContext.Provider value={responseContext}>
      {props.children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
