import React from 'react';
import {
    Grid
} from "@material-ui/core";
import DenaidImg from "../../../../assets/images/NewMiniCard/Denaid-img.svg";
const DeniedCard = (props) => {
    return (
        <Grid item xs={12} sm={6}>
            <div className="DR-mini-card DR-mini-crd-red">
                <div className="DR-mini-img-red">
                    <img
                        className="mini-crd-img"
                        src={DenaidImg}
                        alt="Icon"
                    />
                </div>
                <div className="DR-mini-crd-inner ml-3">
                    <p>Denied</p>
                    <h2>
                        0
                    </h2>
                </div>
            </div>
        </Grid>
    )
}

export default DeniedCard;