import React from 'react';
import ReactDOM from 'react-dom';
import {
    Box,
    Grid,
    TextField,
    Button,
    Tooltip,
    Tabs,
    Tab,
    Typography,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableHead,
    Paper,
    IconButton,
    Collapse,
} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Table, Switch, Space } from 'antd';
import 'antd/dist/antd.css';


const columns = [
    {
        title: 'CODE',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'DENIED',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
    },
    {
        title: 'CHARGE AMOUNT',
        dataIndex: 'address',
        width: '20%',
        key: 'address',
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        width: '30%',
        key: 'Description',
    },
];

const data = [
    {
        key: 1,
        name: '0127',
        age: 60,
        address: '974.17',
        children: [
            {
                key: 12,
                name: '0127',
                age: 30,
                address: '974.17',
                children: [
                    {
                        key: 121,
                        name: '0127',
                        age: 16,
                        address: '974.17',
                        children: [
                            {
                                key: 1314,
                                name: '0127',
                                age: 25,
                                address: '974.17',
                            },
                            {
                                key: 1312,
                                name: '0127',
                                age: 18,
                                address: '974.17',
                            },
                        ],
                    },
                ],
            },
            {
                key: 13,
                name: '0127',
                age: 72,
                address: '974.17',
                children: [
                    {
                        key: 131,
                        name: '0127',
                        age: 42,
                        address: '974.17',
                        children: [
                            {
                                key: 1311,
                                name: 'J0127',
                                age: 25,
                                address: '974.17',
                            },
                            {
                                key: 1312,
                                name: '0127',
                                age: 18,
                                address: '974.17',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: '0127',
        age: 60,
        address: '974.17',
        children: [
            {
                key: 12,
                name: 'J0127',
                age: 30,
                address: '974.17',
                children: [
                    {
                        key: 121,
                        name: '0127',
                        age: 16,
                        address: '974.17',
                    },
                ],
            },
            {
                key: 13,
                name: '0127',
                age: 72,
                address: '974.17',
                children: [
                    {
                        key: 131,
                        name: '0127',
                        age: 42,
                        address: '974.17',
                        children: [
                            {
                                key: 1311,
                                name: '0127',
                                age: 25,
                                address: '974.17',
                            },
                            {
                                key: 1312,
                                name: '0127',
                                age: 18,
                                address: '974.17',
                            },
                        ],
                    },
                ],
            },
        ],
    },

];

// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

function TreeTable() {
    const [checkStrictly, setCheckStrictly] = React.useState(false);
    return (
        <>
            <Table
                className="detail-table-service-line-new bg-white show-non tb-scroll"
                columns={columns}
                // rowSelection={{ ...rowSelection, checkStrictly }}
                dataSource={data}

            />
        </>
    );
}

export default TreeTable;

// ReactDOM.render(<TreeData />, document.getElementById('container'));