import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constant";
import ResponseContext from "../Context";
const RespondTable: React.FC = () => {
  const [disable, setDisable] = useState<boolean>(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [count, setTotalCount] = useState<number>(0);

  const [responses, setResponsesList] = useState<any>([]);

  const responseCtx: any = useContext<any>(ResponseContext);

  // const getTableList = useCallback(async (offset = 0, limit = 10) => {
  //   const responsesList: any = await axios.post(
  //     `${baseUrl}/api/allResponsesWithPagination`,
  //     {
  //       offset,
  //       limit,
  //     }
  //   );
  //   setTotalCount(responsesList.data.totalCount);
  //   setResponsesList(responsesList.data.paginatedDataList);
  // }, []);






  useEffect(() => {
    responseCtx.getTableList();
  }, []);

  const handleNextButton = () => {
    if (offset < count) {
      //getTableList(offset);
      setOffset(offset + 10);
      setDisable(false);
    }
     if (offset <= count) {
      setDisable(true);
    }
  };

  const handlePrevButton = () => {
    if (offset > 10) {
     // getTableList(offset);
      setOffset(offset - 10);
      setDisable(false);
    } 
     if (offset < 10) {
      setDisable(true);
    }
  };

  return (
    <>
      <table className="mt-20 overflow-x-scroll w-[60rem]">
        <thead>
          <tr className="bg-table-header">
            <th className="table-title">Date</th>
            <th className="table-title">Response ID</th>
            <th className="table-title">Name</th>
            <th className="table-title">Gender</th>
            <th className="table-title">Phone</th>
            <th className="table-title">Email</th>
            <th className="table-title">Date of Contact</th>
            <th className="table-title">Contact</th>
            <th className="table-title">Attempt</th>
            <th className="table-title">Reolution Type</th>
          </tr>
        </thead>
        <tbody>
          {responseCtx.responses?.map((item:any,index:any)=>{
        return(
          <tr>
          <td className="table-items">{item?.['Date of Negative Response']}</td>
          <td className="table-items">{item?.['CustomerFeedback']}</td>
          <td className="table-items">{item?.['StoreName']}</td>
          <td className="table-items">{item?.['CustomerGender']}</td>
          <td className="table-items">{item?.['CustomerMobileNumber']}</td>
          <td className="table-items">{item?.['CustomerEmail']}</td>
          <td className="table-items">{item?.['Date of Reaching out']}</td>
          <td className="table-items">{item?.['Contact']}</td>
          <td className="table-items">{item?.['Attempt']}</td>
          <td className="table-items">{item?.['Resolution Type']}</td>
        </tr>
        )})}
        
        </tbody>
      </table>
      {/* <div className="flex justify-end items-center gap-10 mt-10 w-full">
        <button
          onClick={handlePrevButton}
          className={`w-28 h-12 flex justify-center items-center border ${
            disable
              ? "border-gray-500 cursor-not-allowed"
              : "border-table-header hover:bg-table-header hover:text-white"
          } rounded-md text-black`}
        >
          Previous
        </button>
        <button
          onClick={handleNextButton}
          className={`w-28 h-12 flex justify-center items-center border ${
            disable
              ? "border-gray-500 cursor-not-allowed"
              : "border-table-header hover:bg-table-header hover:text-white"
          } rounded-md text-black`}
        >
          Next
        </button>
      </div> */}
    </>
  );
};

export default RespondTable;
