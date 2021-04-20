import React from "react";
import {
  Typography,
  Link,
  Grid,
} from "@material-ui/core";



export default function MenuListComposition() {
  return (
    <Grid container className="copy-right-main">
        <Grid item md={6}>
          <Typography variant="body1" className="copy-right-text" >© 2020 datarovers all right reserved.</Typography>
        </Grid>
        <Grid item md={6} className="copy-right-links-grid">
          <Typography className="copy-right-links" > 
            <Link href="#" >
              FAQs
            </Link>
            <Link href="#" >
              Terms & Conditions
            </Link>
            <Link href="#" >
              Privacy & Security
            </Link>
            
          </Typography>
        </Grid>
      </Grid>
  );
}
