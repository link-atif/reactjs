import React from 'react'
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import ScreenShareOutlinedIcon from '@material-ui/icons/ScreenShareOutlined';

const Actions = () => {
  return(
    <ul className="action-list">
      <li><ArchiveOutlinedIcon /> Archive</li>
      <li><EmailOutlinedIcon /> Mark as unread</li>
      <li><ScreenShareOutlinedIcon /> Share</li>
    </ul>
  )
}

export default Actions;