import React from "react";
import * as Icons from "../../components/Global/Icons";
import RespondTable from "./RespondTable";
interface ResponsesProps {
  fetchRowData: any; // Replace with the actual type of fetchRowData
}
const Responses: React.FC<ResponsesProps> = ({ fetchRowData }) => {
  return (
    <>
      <div
        id="table"
        className="lg:w-[60rem] mx-auto flex flex-col justify-center items-center min-h-screen lg:py-0 py-20"
      >
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold md:text-start text-center">
            New Responses
          </h2>
          <Icons.HomeIcon />
        </div>
        <RespondTable fetchRowData={fetchRowData} />
      </div>
    </>
  );
};

export default Responses;
