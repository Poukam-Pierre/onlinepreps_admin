import { useEffect } from "react";
import { useEmployes } from "../../../utils/context";
import { employesDetails } from "../../../utils/context/employes/employes.interface";
import OverviewDetails from "./OverviewDetails/OverviewDetails";
import apiMiddleware from "../../../utils/utilis/apiMiddleware";

export default function EmployesDetails() {
    const {
        employesDetails: { employesData },
        employesDispatch
    } = useEmployes()


    useEffect(() => {
        apiMiddleware({
            url: "/admin/getEmployeStatOverview",
            method: "GET",
            onSuccess: (data) => {
                console.log(data);
                employesDispatch(data as employesDetails[])
            },
            onFailure: (data) => { }
        })

    }, [employesDispatch])

    return (
        <OverviewDetails
            label="Employes"
            dataList={employesData}
        />
    );
}
