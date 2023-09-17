import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import * as Icons from "../Global/Icons";
import axios from "axios";
import { JWT_TOKEN, baseUrl } from "../constant";
import { setLocalstorageData } from "../../utils/localStorageHelper";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = useCallback(async (values: any) => {
    const response: any = await axios.post(`${baseUrl}/api/login`, {
      ...values,
    });
    console.log(response);
    if (response.status === 200) {
      const { data } = response.data;
      login(data);
    }
    setError("Your entered email/password is not correct");
  }, []);
  return (
    <>
      <div className="overflow-x-auto mx-auto flex flex-col justify-center items-center py-20 lg:px-20 px-5">
        <div id="form" className="w-full flex items-center justify-between ">
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, errors, touched, handleChange }) => {
              return (
                <Form className="flex lg:flex-row flex-col w-full gap-10 mt-16 justify-center">
                  <div className="lg:w-1/2 w-full justify-center">
                    {error && (
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <span className="font-medium">{error}</span>{" "}
                      </div>
                    )}
                    <div className="flex items-center py-3 gap-2 justify-center">
                      <label className="input-title">Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => {
                          handleChange(e);
                          setError("");
                        }}
                        required
                        className="px-3 h-10 w-60 border-[2px] border-black"
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <label className="input-title">Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => {
                          handleChange(e);
                          setError("");
                        }}
                        required
                        className="px-3 h-10 w-60 border-[2px] border-black"
                      />
                    </div>
                    <div className="flex justify-center items-end mt-5 h-32">
                      <button className="cursor-pointer" type="submit">
                        <Icons.SubmitIcon />
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
}
