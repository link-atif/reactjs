import React from 'react';
import {
    Box,
    Grid,
    Typography,
} from "@material-ui/core";
import DenaidImg from "../../../../assets/images/NewMiniCard/Denaid-img.svg";
import CountImg from "../../../../assets/images/NewMiniCard/Count-img.svg";
import PaymentImg from "../../../../assets/images/NewMiniCard/payment-img.svg";
import ChargeImg from "../../../../assets/images/NewMiniCard/charge-img.svg";
import AdaptionnRatioCard from "./adaptionRate";
import RefenceTotalCard from "./referenceTotal";
import TotalSumCard from "./totalSum";
import DeniedCard from "./denied"
const BiosimilarCards = (props) => {

    return (
        <Grid item md={6}>

            <Box className="claim-details-card-main shadow-ui-new mt-4">
                <Grid container spacing={3}>
                    <Grid item md={12}>
                        <Typography
                            variant="h4"
                            className="smart-detail-crd-heading pl-2"
                        >
                            Code
                        </Typography>
                    </Grid>
                    <RefenceTotalCard></RefenceTotalCard>
                    <TotalSumCard></TotalSumCard>
                    <AdaptionnRatioCard></AdaptionnRatioCard>
                    <DeniedCard></DeniedCard>
                </Grid>

            </Box>
        </Grid>
    )
}

export default BiosimilarCards;