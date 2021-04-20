import React, { useEffect, useState } from 'react';
import {
    Grid
} from "@material-ui/core";
import ChargeImg from "../../../../assets/images/NewMiniCard/charge-img.svg";
import { biosimilar } from "../../../../actions"
const AdaptionRateCard = (props) => {
    const [adaptionRate, setAdaptionRate] = useState(null);
    useEffect(() => {
        biosimilar.getBiosimilarAdaptionRate()
            .then(response => {
                if (response.data && response.data.data) {
                    let data = response.data.data[0];
                    setAdaptionRate(data.BiosimilarAdoptionRate);
                }
            })
            .catch(err => {

            })
    }, [])
    return (
        <Grid item xs={12} sm={6}>
            <div className="DR-mini-card DR-mini-crd-yellow">
                <div className="DR-mini-img-yellow">
                    <img
                        className="mini-crd-img"
                        src={ChargeImg}
                        alt="Icon"
                    />
                </div>
                {
                    adaptionRate && (
                        <div className="DR-mini-crd-inner ml-3">
                            <p>Adaption Rate</p>
                            <h2>
                                {
                                    adaptionRate
                                }
                            </h2>
                        </div>
                    )
                }
            </div>
        </Grid>
    )
}

export default AdaptionRateCard;