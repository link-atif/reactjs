import React from 'react';
import {
    Grid
} from "@material-ui/core";
import CircelProgress from "./CircelProgress";
function getCodeClass(type) {
    switch (type) {
        case 'Open':
            return 'c3'
        case 'Accepted':
            return 'c1'
        case 'Rejected':
            return 'c2'
        case 'Error':
            return 'c4'
        default:
            return 'c1'
    }
}

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

const CardItems = (props) => {
    const { item } = props;
    return (
        <div className="progress-box cliam-box">
            <div className="claim-box-inner">
                <span className={`box-cod-${getCodeClass(item.type)}`}>
                    <CircelProgress cardItem={item} />
                </span>
            </div>
            <div className="claim-box-inner pl-2">
                <h2 className="mb-0 box-title-835">{item.type}</h2>
                <p className="box-text-835">
                    <span>amount:</span>${numberFormat(item.billedAmount)}
                </p>
                <p className="box-text-835">
                    <span>count:</span>{item.claimsCount}
                </p>
            </div>
        </div>
    )
}

export default CardItems;