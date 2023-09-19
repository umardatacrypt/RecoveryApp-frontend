import React, { useCallback, useContext, useState } from "react";
import Responses from "../components/Responses";
import Recovery from "../components/Recovery";
import RespondToCustomers from "../components/RespondToCustomers";
import { useLocation } from "react-router-dom";
import { baseUrl } from "../components/constant";
import ResponseContext from "../components/Context";
import axios from "axios";

interface IResonseToCustomer {
  respondToCustomerCount: number;
  allResponseCount: number;
  viewNewResponsesCount: number;
}
interface IRequestObject {
  data: IResonseToCustomer;
}
const BuCodeData: React.FC = () => {
  const [itemList, setItemList] = useState({});
  //   const history;
  const location = useLocation();
  const url = `${baseUrl}/api/allResponses?BuCode=${location.pathname.replace(
    "/",
    ""
  )}`;
  const tableUrl = `${baseUrl}`;
  let [showCustomerCount, setShowCustomerCount] = useState<number>();
  let [showAllCount, setShowAllCount] = useState<number>();
  let [showResponsesCount, setShowResponsesCount] = useState<number>();
  // const [post, setPost] = React.useState<any>(null);
  const responseCtx: any = useContext<any>(ResponseContext);
  const fetchRowData = useCallback(async (item: any) => {
    setItemList(item);
    typeof window !== "undefined" &&
      window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
  }, []);

  const fetchRecoveryList = useCallback(async () => {
    const apiRequest: IRequestObject = await axios.get(url);
    const resonseToCustomer: IResonseToCustomer = apiRequest.data;
    const customerCount = resonseToCustomer.respondToCustomerCount;
    const allCount = resonseToCustomer.allResponseCount;
    const responsesCount = resonseToCustomer.viewNewResponsesCount;
    setShowCustomerCount(customerCount);
    setShowAllCount(allCount);
    setShowResponsesCount(responsesCount);
  }, []);

  const fetchResponsesBasedonType = useCallback((text: string) => {
    if (text === "Respond To Customers") {
      responseCtx.getRespondToCustomerList();
    }

    if (text === "View All Responses") {
      responseCtx.getViewAllResponseList();
    }

    if (text === "View New Responses") {
      responseCtx.getViewNewResponseList();
    }
  }, []);
  React.useEffect(() => {
    fetchRecoveryList();
  }, []);
  return (
    <>
      <Recovery
        fetchResponsesBasedonType={fetchResponsesBasedonType}
        showAllCount={showAllCount}
        showCustomerCount={showCustomerCount}
        showResponsesCount={showResponsesCount}
      />
      <Responses fetchRowData={fetchRowData} />
      <RespondToCustomers
        itemList={itemList}
        fetchRecoveryList={fetchRecoveryList}
      />
    </>
  );
};

export default BuCodeData;
