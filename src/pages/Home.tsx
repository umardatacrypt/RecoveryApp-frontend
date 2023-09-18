import React, { useCallback, useState } from "react";
import Responses from "../components/Responses";
import Recovery from "../components/Recovery";
import RespondToCustomers from "../components/RespondToCustomers";

const HomePage: React.FC = () => {
  const [itemList, setItemList] = useState({});
  //   const history;
  const fetchRowData = useCallback(async (item: any) => {
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
