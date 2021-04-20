import React, { useEffect, useState } from 'react';
import {
    Grid
} from "@material-ui/core";
import CountImg from "../../../../assets/images/NewMiniCard/Count-img.svg";
import { biosimilar } from "../../../../actions"
const numberFormat = (number) => {
    var SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
    // what tier? (determines SI prefix)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a prefix
    if (tier === 0) return number;

    // get postfix and determine scale
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add postfix as suffix
    var formatted = scaled.toFixed(1) + "";

    // remove '.0' case
    if (/\.0$/.test(formatted))
        formatted = formatted.substr(0, formatted.length - 2);

    return formatted + postfix;
};

const RefenceTotalCard = (props) => {
    const [referenceSum, setReferenceSum] = useState(null);
    useEffect(() => {
        biosimilar.getReferenceDrugTotal()
            .then(response => {
                if (response.data && response.data.data) {
                    let data = response.data.data[0];
                    setReferenceSum(data.TotalChargeAmount);
                }
            })
            .catch(err => {

            })
    }, [])

    return (
        <Grid item xs={12} sm={6}>
            <div className="DR-mini-card DR-mini-crd-purpel">
                <div className="DR-mini-img-purpel">
                    <img
                        className="mini-crd-img"
                        src={CountImg}
                        alt="Icon"
                    />
                </div>
                {
                    referenceSum && (
                        <div className="DR-mini-crd-inner ml-3">
                            <p>Reference Total</p>
                            <h2>
                                {numberFormat(referenceSum)}
                            </h2>
                        </div>
                    )
                }
            </div>
        </Grid>
    )
}

export default RefenceTotalCard