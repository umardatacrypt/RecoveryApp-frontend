import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constant";
import { useLocation } from "react-router-dom";
import MyContext from "../Context";
import ResponseContext from "../Context";
import * as Icons from "../../components/Global/Icons";
import { useAuth } from "../../context/AuthContext";

interface IResonseToCustomer {
  respondToCustomerCount: number;
  allResponseCount: number;
  viewNewResponsesCount: number;
}
interface IRequestObject {
  data: IResonseToCustomer;
}

interface Props {
  fetchResponsesBasedonType: any;
  showAllCount: any;
  showCustomerCount: any;
  showResponsesCount: any;
}

const Recovery: React.FC<Props> = ({
  fetchResponsesBasedonType,
  showAllCount,
  showCustomerCount,
  showResponsesCount,
}) => {
  const { logout } = useAuth();
  const location = useLocation();

  // setPost(fetchRecoveryList);

  // if (!post) return null;
  const recoveryData = [
    {
      id: 1,
      respondingText: "Respond To Customers",
      respondingValue: showCustomerCount,
      totalResponding: "Total Customers Contacted",
    },
    {
      id: 2,
      respondingText: "View All Responses",
      respondingValue: showAllCount,
      totalResponding: "Total Negative Reviews",
    },
    {
      id: 3,
      respondingText: "View New Responses",
      respondingValue: showResponsesCount,
      totalResponding: "Customers Not Contacted",
    },
  ];

  const renderRecoveryData = recoveryData.map((items: any, index: number) => {
    return (
      <React.Fragment key={`${items.id} ${index}`}>
        <a
          href="#table"
          onClick={() => fetchResponsesBasedonType(items.respondingText)}
        >
          <div className="rounded-2xl border-[3px] border-black px-5 py-7 bg-white hover:bg-table-header">
            <h1 className="text-2xl font-bold text-center">
              {items.respondingText}
            </h1>
            <h2 className="text-5xl font-bold text-center mt-16">
              {items.respondingValue}
              {/* {post.count} */}
            </h2>
            <a href="#form">
              <h4 className="text-2xl font-semibold text-center mt-16">
                {items.respondingText}
              </h4>
            </a>
          </div>
        </a>
      </React.Fragment>
    );
  });
  return (
    <>
      <div className="lg:w-[50rem] md:w-[40rem] mx-auto flex flex-col justify-center items-center min-h-screen lg:py-0 py-20">
        <div className="w-full flex justify-between">
          <h2 className="text-2xl font-semibold md:text-start text-center">
            VOC Service Recovery
          </h2>
          <div className="cursor-pointer" onClick={() => logout()}>
            <Icons.SignOut />
          </div>
        </div>
        <div className="mt-24 grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {renderRecoveryData}
        </div>
      </div>
    </>
  );
};

export default Recovery;
