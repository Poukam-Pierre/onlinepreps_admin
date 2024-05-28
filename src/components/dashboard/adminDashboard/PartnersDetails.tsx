import { useEffect } from "react";
import { usePartner } from "../../../utils/context/partners/PartnerContextProvider";
import OverviewDetails from "./OverviewDetails/OverviewDetails";
import { partnersDetails } from "../../../utils/context";
import apiMiddleware from "../../../utils/utilis/apiMiddleware";

export default function PartnerDetails() {
    const {
        partnersDetails: { partnersData },
        partnersDispatch
    } = usePartner()

    useEffect(() => {
        apiMiddleware({
            url: "/admin/getPartnerStatOverview",
            method: "GET",
            onSuccess: (data) => {
                partnersDispatch(data as partnersDetails[])
            },
            onFailure: (data) => { }
        })
    }, [partnersDispatch])
    return (
        <OverviewDetails
            label="Partner"
            dataList={partnersData}
        />
    );
}
