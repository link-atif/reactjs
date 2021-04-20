import React from 'react';
import clsx from 'clsx';
import { Box } from "@material-ui/core";
import "./styles.scss"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import BotIcon from "../../assets/images/SVGIcons/BotIcon"
import ReBotIcon from "../../assets/images/bx-bot.svg"

// import BotIcon from "../../assets/images/SVGIcons/BotIcon";

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Loading from "../../components/common/ExpandableTable/Loading";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: '400px',
    },
    botOuter: {
        width: '400px',
    },
});

export default function BotModel() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        // top: false,
        // left: false,
        bottom: false,
        // right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // const list = (anchor) => (
    //     <div
    //         className={clsx(classes.list, {
    //             [classes.fullList]: anchor === 'top' || anchor === 'bottom',
    //         })}
    //         role="presentation"
    //         onClick={toggleDrawer(anchor, false)}
    //         onKeyDown={toggleDrawer(anchor, false)}
    //     >

    //     </div>
    // );

    return (
        <div className="botMain">
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button className="" onClick={toggleDrawer(anchor, true)}>

                        <img src={ReBotIcon} style={{ width: '24px', cursor: 'pointer', }} />
                        {/* <BotIcon /> */}
                    </Button>

                    <Drawer className="botouter" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>

                        <Box className="p-0">
                            <iframe
                                src='https://webchat.botframework.com/embed/QnAChatBotDR?s=bkJhHLc8aRA.nXHiwoHGGezR2we2q0QPtF2a3uDxuRemtpn1Up-VQYg'
                                style={{ minWidth: "400px", width: "100%", minHeight: "500px", border: 'none', }}
                            ></iframe>
                        </Box>

                    </Drawer>

                </React.Fragment>
            ))
            }
        </div >
    );
}
