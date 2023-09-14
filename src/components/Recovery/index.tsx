import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { baseUrl } from "../constant";
import { useLocation } from "react-router-dom";
import MyContext from "../Context";
import ResponseContext from "../Context";

interface IResonseToCustomer {
  respondToCustomerCount: number;
  allResponseCount: number;
  viewNewResponsesCount: number;
}
interface IRequestObject {
  data: IResonseToCustomer;
}

const Recovery: React.FC = () => {
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

  React.useEffect(() => {
    fetchRecoveryList();
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

  const fetchResponsesBasedonType = useCallback((text:string)=>{

    
    if(text === 'Respond To Customers'){
       responseCtx.getRespondToCustomerList()
    }

    if(text === 'View All Responses'){
      responseCtx.getViewAllResponseList()
      
    }

    if(text === 'View New Responses'){
      responseCtx.getViewNewResponseList()
      
    }


  },[])


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
        <a href="#table"
         onClick={()=> fetchResponsesBasedonType(items.respondingText)}
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
        <div className="w-full">
          <h2 className="text-2xl font-semibold md:text-start text-center">
            Azadea HR Service Recovery
          </h2>
        </div>
        <div className="mt-24 grid lg:grid-cols-3 md:grid-cols-2 gap-10">
          {renderRecoveryData}
        </div>
      </div>
    </>
  );
};

export default Recovery;
