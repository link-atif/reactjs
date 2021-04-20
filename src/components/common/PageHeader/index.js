import React from 'react'
import { Typography} from '@material-ui/core'
import './styles.scss'


const PageHeader = ({
  title,
}) => {
  return (
    <div className="page-header">
      <Typography variant="h1">{title}</Typography>
    </div>
  )
}

export default PageHeader;