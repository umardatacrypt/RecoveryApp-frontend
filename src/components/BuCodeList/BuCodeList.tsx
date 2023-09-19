import React from "react";
import * as Icons from "../../components/Global/Icons";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function BuCodeList({ buCodeList }: { buCodeList: any }) {
  const { logout } = useAuth();
  const buCodeRender = () => {
    return buCodeList?.map((item: any, index: any) => {
      return (
        <Link to={`/${item}`}>
          <div className="rounded-2xl border-[3px] border-black px-5 py-7 bg-white hover:bg-table-header">
            <h1 className="text-2xl font-bold text-center">BuCode</h1>
            <h2 className="text-2xl font-bold text-center mt-16">
              {item}
              {/* {post.count} */}
            </h2>
          </div>
        </Link>
      );
    });
  };
  console.log(buCodeList);
  return (
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
        {buCodeRender()}
      </div>
    </div>
  );
}

export default BuCodeList;
