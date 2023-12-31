import React, { useCallback, useContext, useEffect, useState } from "react";
import * as Icons from "../../components/Global/Icons";
import { Form, Formik } from "formik";
import axios from "axios";
import { baseUrl } from "../constant";
import ResponseContext from "../Context";
import moment from "moment";
import { scrollToTop, toaster } from "../../utils/helper";
import { useLocation } from "react-router-dom";
interface ResponsesProps {
  itemList: any; // Replace with the actual type of fetchRowData
  fetchRecoveryList: any;
}
const RespondToCustomers: React.FC<ResponsesProps> = ({
  itemList,
  fetchRecoveryList,
}) => {
  const [initialState, setInitialState] = useState({
    date: "",
    responseId: "",
    date_of_response: "",
    brand: "",
    store: "",
    name: "",
    gender: "",
    phoneNumber: "",
    attempt: "",
    contactedCustomer: "",
    resolutionType: "",
    customerFeedback: "",
    country: "",
    storeEmail: "",
    hrContacted: "",
    resolutionDetails: "",
    BusinessType: "",
    BetterExperience: "",
    Products: "",
    StoreExperience: "",
    FittingRooms: "",
    ValueForMoney: "",
    StoreAtmosphere: "",
    FBQuality: "",
  });
  const [responseList, setResponseList] = useState<any>();
  const [responseOptionList, setResponseOptionList] = useState([]);
  const responseCtx: any = useContext<any>(ResponseContext);
  const location = useLocation();
  const bucode = location.pathname.replace("/", "");

  const handleSubmit = useCallback(async (values: any) => {
    // conssole.log(values);
    const response: any = await axios.post(`${baseUrl}/api/updateExcelFile`, {
      ...values,
    });
    if (response.status === 200) {
      toaster("success", "Record successfully updated");
      fetchRecoveryList();
      typeof window !== "undefined" &&
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
    }
  }, []);

  const fetchResponsesBasedonDateSelected = async (date: string) => {
    const responsesList: any = await axios.post(
      `${baseUrl}/api/fetchRecordsBasedonDate`,
      {
        date,
        bucode,
      }
    );
    const responseResultList = responsesList.data.filteredRecords;
    setResponseList(responseResultList);
    const optionsList = responseResultList.map((item: any) => {
      return {
        token: item.Token,
      };
    });
    setResponseOptionList(optionsList);
  };

  const responsehandleChange = (token: string) => {
    const responseObject = responseList?.find(
      (item: any) => item.Token === token
    );
    setInitialState((prevState) => {
      return {
        ...prevState,
        brand: responseObject?.Brand,
        store: responseObject?.StoreName,
        name: responseObject?.CustomerName,
        gender: responseObject?.CustomerGender,
        phoneNumber: responseObject?.CustomerMobileNumber,
        attempt: responseObject?.Attempt,
        contactedCustomer: responseObject?.Contact,
        resolutionType: responseObject?.["Resolution Type"],
        customerFeedback: responseObject?.["CustomerFeedback"],
        country: responseObject?.["Country"],
        storeEmail: responseObject?.["StoreEmail1"],
        hrContacted: responseObject?.["HR or Customer Service"],
        token,
        resolutionDetails: responseObject?.["ResolutionDetails"],
        BusinessType: responseObject?.["BusinessType"],
        BetterExperience: responseObject?.["BetterExperience"],
        Products: responseObject?.["Products"],
        StoreExperience: responseObject?.["StoreExperience"],
        FittingRooms: responseObject?.["FittingRooms"],
        StoreAtmosphere: responseObject?.["StoreAtmosphere"],
        ValueForMoney: responseObject?.["ValueForMoney"],
        FBQuality: responseObject?.["F&BQuality"],
      };
    });
  };

  const setSelectedTokenDetails = async () => {
    if (itemList) {
      const responseObject = itemList;
      setInitialState((prevState) => {
        return {
          ...prevState,
          brand: responseObject?.Brand,
          store: responseObject?.StoreName,
          name: responseObject?.CustomerName,
          gender: responseObject?.CustomerGender,
          phoneNumber: responseObject?.CustomerMobileNumber,
          attempt: responseObject?.Attempt,
          contactedCustomer: responseObject?.Contact,
          resolutionType: responseObject?.["Resolution Type"],
          customerFeedback: responseObject?.["CustomerFeedback"],
          country: responseObject?.["Country"],
          storeEmail: responseObject?.["StoreEmail1"],
          hrContacted: responseObject?.["HR or Customer Service"],
          date_of_response: responseObject?.["Date of Reaching out"],
          token: responseObject?.["Token"],
          resolutionDetails: responseObject?.["ResolutionDetails"],
          BusinessType: responseObject?.["BusinessType"],
          BetterExperience: responseObject?.["BetterExperience"],
          Products: responseObject?.["Products"],
          StoreExperience: responseObject?.["StoreExperience"],
          FittingRooms: responseObject?.["FittingRooms"],
          StoreAtmosphere: responseObject?.["StoreAtmosphere"],
          ValueForMoney: responseObject?.["ValueForMoney"],
          FBQuality: responseObject?.["F&BQuality"],
        };
      });
    }
  };

  useEffect(() => {
    setSelectedTokenDetails();
  }, [itemList]);

  return (
    <>
      <div className="overflow-x-auto mx-auto flex flex-col justify-center items-center py-20 lg:px-20 px-5">
        <div id="form" className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold md:text-start text-center">
            Respond to Customers
          </h2>
          <div onClick={() => scrollToTop()} className="cursor-pointer">
            <Icons.HomeIcon />
          </div>
        </div>
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            handleSubmit,
            handleChange,
            setFieldValue,
            submitCount,
            touched,
          }) => {
            return (
              <Form
                onSubmit={handleSubmit}
                className="flex lg:flex-row flex-col w-full gap-10 mt-16"
              >
                <div className="lg:w-1/2 w-full">
                  <div className="flex items-center gap-2">
                    <label className="input-title">Select Date:</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        const value = e.target.value;
                        fetchResponsesBasedonDateSelected(value);
                        handleChange(e);
                      }}
                      name="date"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Select Response ID:</label>
                    <select
                      name="responseId"
                      onChange={(e) => {
                        const value = e.target.value;
                        responsehandleChange(value);
                        handleChange(e);
                      }}
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    >
                      <option value="Select">Select</option>
                      {responseOptionList.map((item: any) => {
                        return <option value={item.token}>{item.token}</option>;
                      })}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Date of Response:</label>
                    <input
                      type="date"
                      name="date_of_response"
                      onChange={handleChange}
                      value={
                        moment(values.date_of_response).format("YYYY-MM-DD") ||
                        ""
                      }
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Brand:</label>
                    <input
                      type="text"
                      name="brand"
                      readOnly
                      value={values.brand}
                      placeholder="Enter the Brand Name"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Store:</label>
                    <input
                      type="text"
                      name="store"
                      // onChange={handleChange}
                      readOnly
                      value={values.store}
                      placeholder="Enter the Store Name"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <h4 className="font-bold text-lg mt-6">
                    Customer Information
                  </h4>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Name:</label>
                    <input
                      type="text"
                      name="name"
                      // onChange={handleChange}
                      readOnly
                      value={values.name}
                      placeholder="Enter the Name"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Gender:</label>
                    <select
                      name="gender"
                      id="gender"
                      value={values.gender}
                      // onChange={handleChange}
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    >
                      <option value="male">Male</option>
                      <option value="femal">Female</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Phone Number:</label>
                    <input
                      type="number"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      // onChange={handleChange}
                      readOnly
                      placeholder="Enter the Phone Number"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Attempt Number:</label>
                    <select
                      name="attempt"
                      id="attempt"
                      onChange={handleChange}
                      value={values.attempt}
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Contacted Customer:</label>
                    <select
                      name="contactedCustomer"
                      id="customer"
                      value={values.contactedCustomer}
                      onChange={handleChange}
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Resolution Type:</label>
                    <select
                      name="resolutionType"
                      id="customer"
                      value={values.resolutionType}
                      onChange={handleChange}
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    >
                      <option value="Gift/Invitation">Gift/Invitation</option>
                      <option value="Apology">Apology</option>
                      <option value="Clarification / Positive Feedback">
                        Clarification / Positive Feedback
                      </option>
                      <option value="Refund/Exchange">Refund/Exchange</option>
                      <option value="Other">Other</option>
                      <option value="No answer from Customer">
                        No answer from Customer
                      </option>
                      <option value="Invalid Contact Details">
                        Invalid Contact Details
                      </option>
                    </select>
                  </div>
                  {values?.resolutionType === "Other" ? (
                    <div className="flex items-center gap-2 mt-4">
                      <label className="font-semibold">
                        Resolution Details:
                      </label>
                      <textarea
                        name="resolutionDetails"
                        onChange={handleChange}
                        value={values.resolutionDetails}
                        placeholder="Enter Your Resoultion Details Here..."
                        className="p-3 w-full border-[2px] border-black h-40 mt-2"
                      ></textarea>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="lg:w-1/2 w-full">
                  <h4 className="font-bold text-base">Customer Response:</h4>
                  {values.BusinessType === "Fashion" ? (
                    <>
                      <p className="mt-2">
                        What can be improved for a better experience?
                      </p>
                      <div className="m-2">
                        {values.BetterExperience || "-"}
                      </div>
                      <p className="mt-2">
                        What can be improved with our products?
                      </p>
                      <div className="m-2">{values.Products || "-"}</div>
                      <p className="mt-2">
                        What can be improved with our products?
                      </p>
                      <div className="m-2">{values.StoreExperience || "-"}</div>
                      <p className="mt-2">
                        What can be improved with our products?
                      </p>
                      <div className="m-2">{values.FittingRooms || "-"}</div>
                    </>
                  ) : (
                    ""
                  )}
                  {values.BusinessType === "F&B" ? (
                    <>
                      <p className="mt-2">
                        What can be improved for a better experience?
                      </p>
                      <div className="m-2">
                        {values.BetterExperience || "-"}
                      </div>
                      <p className="mt-2">
                        What can be improved with our store atmosphere?
                      </p>
                      <div className="m-2">{values.StoreAtmosphere || "-"}</div>
                      <p className="mt-2">
                        What can be improved about our value for money?
                      </p>
                      <div className="m-2">{values.ValueForMoney || "-"}</div>
                      <p className="mt-2">
                        What can be improved about our F&B Quality?{" "}
                      </p>
                      <div className="m-2">{values.FBQuality || "-"}</div>
                    </>
                  ) : (
                    ""
                  )}
                  {values.BusinessType === "Multimedia" ? (
                    <>
                      <p className="mt-2">
                        What can be improved for a better experience?
                      </p>
                      <div className="m-2">
                        {values.BetterExperience || "-"}
                      </div>
                      <p className="mt-2">
                        What can be improved with our products?
                      </p>
                      <div className="m-2">{values.Products || "-"}</div>
                      <p className="mt-2">
                        What can be improved about the store experience?
                      </p>
                      <div className="m-2">{values.StoreExperience || "-"}</div>
                    </>
                  ) : (
                    ""
                  )}
                  <label className="font-semibold">Customer Feedback:</label>
                  <textarea
                    name="customerFeedback"
                    // onChange={handleChange}
                    readOnly
                    value={values.customerFeedback}
                    placeholder="Enter Your Feedback Here..."
                    className="p-3 w-full border-[2px] border-black h-40 mt-2"
                  ></textarea>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Country:</label>
                    <input
                      name="country"
                      // onChange={handleChange}
                      readOnly
                      value={values.country}
                      type="text"
                      placeholder="Enter the Country Name"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <label className="input-title">Store Email:</label>
                    <input
                      name="storeEmail"
                      type="text"
                      value={values.storeEmail}
                      // onChange={handleChange}
                      readOnly
                      placeholder="Enter the Store Email"
                      className="px-3 h-10 w-60 border-[2px] border-black"
                    />
                  </div>
                  {/* <div className="flex items-center gap-2 mt-10">
                    <label className="font-bold text-base">
                      Has Customer Service contacted the customer on behalf of
                      HR?
                    </label>
                    <select
                      name="hrContacted"
                      value={values.hrContacted}
                      onChange={handleChange}
                      id="customer"
                      className="px-3 h-10 w-20 border-[2px] border-black"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div> */}
                  <div className="flex justify-end items-end mt-10 h-32">
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
    </>
  );
};

export default RespondToCustomers;
