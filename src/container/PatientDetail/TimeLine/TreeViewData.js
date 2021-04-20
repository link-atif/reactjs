import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 400,
        textAlign: 'left',
    },
});

function getStatusColor(status) {
    switch (status) {
        case "Paid":
        case "Partial":
            return "dot-approved";
        case "Pending":
            return "dot-pending";
        case "Rjected":
        case "Rejected":
            return "dot-rejected";
        default:
            return "dot-pending";
    }
}

function getCodeStatusClass(item) {
    if (item.AllowedAmount === item.LineItemProvPaymentAmount) {
        return "u-admin-role";
    }

    if (item.LineItemProvPaymentAmount < item.AllowedAmount) {
        return "u-rejected-claim"
    }

    if (!item.LineItemProvPaymentAmount || item.LineItemProvPaymentAmount == 0) {
        return "u-other-role"
    }
}

export default function TreeViewData(props) {
    const classes = useStyles();
    const { data } = props;
    console.log(data)
    return (
        <TreeView
            className={classes.root + 'sasa'}
            defaultCollapseIcon={< ExpandMoreIcon />}
            defaultExpandIcon={< ChevronRightIcon />}
        >
            {
                Object.keys(data).map((key, index) => (
                    <TreeItem
                        className="dr-time-code-list"
                        nodeId={index + 1}
                        key={index}
                        label={
                            <div >
                                <span className="dot-approved"></span>
                                <span>{key}</span>
                            </div>
                        }
                    >

                        {
                            data[key].map((item, index) => (
                                <TreeItem
                                    className="dr-tree-inner"
                                    key={index}
                                    label={
                                        <div className="f-12">
                                            <p className="fn-wet-6">{typeof item.CodeType == "object" ? "others" : item.CodeType}:</p>
                                            <BootstrapTooltip title={item.AdjudicatedProcedureCode} placement="top">
                                                <p className={`${getCodeStatusClass(item)} `}>{item.AdjudicatedProcedureCode}</p>
                                            </BootstrapTooltip>
                                        </div>
                                    }
                                />
                            ))
                        }

                    </TreeItem>
                ))
            }
        </TreeView >
    );
}
