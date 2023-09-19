import React, { useCallback, useEffect, useState } from "react";
import Responses from "../components/Responses";
import Recovery from "../components/Recovery";
import RespondToCustomers from "../components/RespondToCustomers";
import axios from "axios";
import { baseUrl } from "../components/constant";
import BuCodeList from "../components/BuCodeList/BuCodeList";

const HomePage: React.FC = () => {
  const [itemList, setItemList] = useState([]);
  //   const history;
  const fetchBuCode = useCallback(async () => {
    const response: any = await axios.get(`${baseUrl}/api/allBucode`);
    setItemList(response.data.data);
  }, []);

  useEffect(() => {
    fetchBuCode();
  }, []);
  return <>Home Page</>;
};

export default HomePage;
