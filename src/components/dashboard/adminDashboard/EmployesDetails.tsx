import { useEffect } from "react";
import { useEmployes } from "../../../utils/context";
import { employesDetails } from "../../../utils/context/employes/employes.interface";
import OverviewDetails from "./OverviewDetails/OverviewDetails";

export default function EmployesDetails() {
    const {
        employesDetails: { employesData },
        employesDispatch
    } = useEmployes()

    const employesDetailsData: employesDetails[] = [
        {
            name: "NANA",
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
            name: "NGAMALEU",
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
            name: "POUKAM",
            total: 10,
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
            name: "YOMETCHEU",
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
        employesDispatch(employesDetailsData)
    }, [employesDispatch])

    return (
        <OverviewDetails
            label="Employes"
            dataList={employesData}
        />
    );
}
