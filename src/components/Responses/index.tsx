import React from "react";
import * as Icons from "../../components/Global/Icons";
import RespondTable from "./RespondTable";

const Responses: React.FC = () => {
  return (
    <>
      <div id="table" className="lg:w-[60rem] mx-auto flex flex-col justify-center items-center min-h-screen lg:py-0 py-20">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold md:text-start text-center">
            New Responses
          </h2>
          <Icons.HomeIcon />
        </div>
        <RespondTable />
      </div>
    </>
  );
};

export default Responses;
