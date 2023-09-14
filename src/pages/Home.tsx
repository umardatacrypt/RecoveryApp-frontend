import React from "react";
import Responses from "../components/Responses";
import Recovery from "../components/Recovery";
import RespondToCustomers from "../components/RespondToCustomers";

const HomePage: React.FC = () => {
    return (
        <>
        <Recovery/>
        <Responses/>
        <RespondToCustomers/>
        </>
    )
}

export default HomePage;