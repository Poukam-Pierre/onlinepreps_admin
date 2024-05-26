import { useEffect } from "react";
import { usePartner } from "../../../utils/context/partners/PartnerContextProvider";
import OverviewDetails from "./OverviewDetails/OverviewDetails";
import { partnersDetails } from "../../../utils/context";

export default function PartnerDetails() {
    const {
        partnersDetails: { partnersData },
        partnersDispatch
    } = usePartner()
    const partnersDetailsData: partnersDetails[] = [
        {
            name: "A.E Princèsse",
            uniqueId: "nppi0245",
            total: 25,
            testCategory: [
                {
                    category: "A",
                    value: 20
                },
                {
                    category: "B",
                    value: 40
                },
                {
                    category: "C",
                    value: 10
                },
                {
                    category: "D",
                    value: 8
                },
                {
                    category: "G",
                    value: 30
                }
            ]
        },
        {
            name: "A.E La Colombe",
            uniqueId: "inpn0245",
            total: 10,
            testCategory: [
                {
                    category: "A",
                    value: 10
                },
                {
                    category: "B",
                    value: 20
                },
                {
                    category: "C",
                    value: 150
                },
                {
                    category: "D",
                    value: 10
                },
                {
                    category: "G",
                    value: 12
                }
            ]
        },
        {
            name: "A.E Peuple",
            uniqueId: "peu0245",
            total: 30,
            testCategory: [
                {
                    category: "A",
                    value: 25
                },
                {
                    category: "B",
                    value: 9
                },
                {
                    category: "C",
                    value: 9
                },
                {
                    category: "D",
                    value: 8
                },
                {
                    category: "G",
                    value: 20
                }
            ]
        },
        {
            name: "A.E ITGES",
            uniqueId: "ites0245",
            total: 100,
            testCategory: [
                {
                    category: "A",
                    value: 20
                },
                {
                    category: "B",
                    value: 40
                },
                {
                    category: "C",
                    value: 10
                },
                {
                    category: "D",
                    value: 8
                },
                {
                    category: "G",
                    value: 30
                }
            ]
        },
    ]

    useEffect(() => {
        partnersDispatch(partnersDetailsData)
    }, [partnersDispatch])
    return (
        <OverviewDetails
            label="Partner"
            dataList={partnersData}
        />
    );
}
