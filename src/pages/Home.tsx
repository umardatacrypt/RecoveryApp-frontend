import React, { useCallback, useContext, useState } from "react";
import Responses from "../components/Responses";
import Recovery from "../components/Recovery";
import RespondToCustomers from "../components/RespondToCustomers";
import ResponseContext from "../components/Context";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [itemList, setItemList] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  //   const history;
  const fetchRowData = useCallback(async (item: any) => {
    const bucode = location.pathname.replace("/", "");
    setItemList(item);
    typeof window !== "undefined" &&
      window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
  }, []);
  return (
    <>
      <Recovery />
      <Responses fetchRowData={fetchRowData} />
      <RespondToCustomers itemList={itemList} />
    </>
  );
};

export default HomePage;
