import React, { useEffect, useState } from 'react';
import {
    Grid
} from "@material-ui/core";
import { claims } from "../../../actions";
import CardItem from "./cardItem";
import Loading from "../../../components/common/ExpandableTable/Loading";
import CircelProgress from "./CircelProgress";

export default function ClaimCard(props) {
    const [cardsData, setCardsData] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        setLoading("data-loading");
        let promiseArr = [
            claims.openClaimRequestCards(),
            claims.acceptedClaimRequestCards(),
            claims.rejectedClaimRequestCards()
        ]
        Promise.all(promiseArr)
            .then(response => {
                if (response) {
                    let carddata = response.map(({ data: { data } }) => data[0]);
                    setCardsData(carddata);
                    setLoading("");
                } else {
                    setLoading("");
                }
            })
            .catch((error) => {
                setLoading("");
            })
    }, []);

    return (
        <div className="progress-box-main mt-4">
            {
                cardsData && cardsData.length > 0 && cardsData.map((card, index) => (
                    <CardItem key={index} item={card}></CardItem>
                ))
            }
            {
                cardsData && cardsData.length > 0 && (
                    <div className="progress-box cliam-box">
                        <div className="claim-box-inner">
                            <span className="box-cod-c4">
                                <CircelProgress />
                            </span>
                        </div>
                        <div className="claim-box-inner pl-2">
                            <h2 className="mb-0 box-title-835">Errors</h2>
                            <p className="box-text-835">
                                <span>Count:</span> 34
                     </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
