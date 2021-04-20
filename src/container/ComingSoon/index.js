import React from 'react'
import { Typography, Box } from '@material-ui/core'
import './styles.scss'
import {NavLink} from 'react-router-dom'

const ComingSoon = () => {
  return (
    <div className="comingsoon">
      <div className="content">
        <Typography variant="h1">COMING SOON PROSSIMAMENTE</Typography>
        <NavLink to="/login">Get Started</NavLink>
      </div>
      <Box className="copyright-text">Copyrights All rights reserved. made by DataRovers</Box>
    </div>
  )
}

export default ComingSoon;