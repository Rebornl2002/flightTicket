import EastIcon from '@mui/icons-material/East';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

import * as React from 'react';
import { useState, useEffect } from 'react';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    // GridOverlay,
} from '@mui/x-data-grid';

import { FormatDate, FormatTime } from '../../../function/FormatDate';

import Button from '@mui/material/Button';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { AddUser, AddUserRoundtrip, EditUser, EditUserRoundtrip } from './ActionUser.js';
import ConfirmDelete from '../../component/ConfirmDelete';
import axios from 'axios';
import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';
import CheckRole from '../CheckRole';
// import NoRowData from '../NoRowData';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            {/* <GridToolbarDensitySelector defaultDensity="comfortable" /> */}
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const convertCamelCaseToWords = (camelCaseString) => {
    // Use a regular expression to insert a space before all caps
    return (
        camelCaseString
            .replace(/([A-Z])/g, ' $1')
            // Convert the first character to uppercase
            .replace(/^./, (str) => str.toUpperCase())
    );
};

export function TableUserOneway() {
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'CodeTicket',
            headerName: 'Mã vé',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'UserName',
            headerName: 'Tên',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'Email',
            headerName: 'Email',
            renderCell: (params) => params.value,
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.2,
        },
        {
            // field: 'Airport', if not add field then it return column other nothing field
            headerName: 'Sân bay',
            renderCell: (params) => (
                <div>
                    {' '}
                    {params.row.AirportFrom} <EastIcon /> {params.row.AirportTo}
                </div>
            ),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.13,
        },

        {
            field: 'DateGo',
            headerName: 'Ngày đi',
            renderCell: (params) => FormatDate(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.12,
        },
        {
            field: 'Time',
            headerName: 'Giờ',
            renderCell: (params) => (
                <div>
                    {' '}
                    {FormatTime(params.row.FlightTime)} <EastIcon /> {FormatTime(params.row.LandingTime)}
                </div>
            ),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },

        {
            field: 'TypeTicket',
            headerName: 'Hạng vé',
            renderCell: (params) => convertCamelCaseToWords(params.row.TypeTicket),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'CodeSeat',
            headerName: 'Chỗ ngồi',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'Action',
            headerName: 'Hành động',
            renderCell: (params) => {
                if (data && data.length !== 0) {
                    return (
                        <div className="action">
                            <Button
                                variant="outlined"
                                sx={{ marginRight: '10px' }}
                                onClick={() => {
                                    handleEdit();
                                    setParamdEdit(params.row);
                                }}
                            >
                                <EditIcon />{' '}
                            </Button>

                            <Button
                                variant="outlined"
                                width="30px"
                                onClick={() => {
                                    handleCloseConfirmDelete();
                                    setGetID(params.row._id);
                                }}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    );
                }
                return null;
            },
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
    ];

    //Handle Add
    const [openAddUser, setOpenAddUser] = useState(false);

    const handleClickOpen = () => {
        setOpenAddUser(true);
    };

    const handleCloseAddUser = () => {
        setOpenAddUser(false);
    };

    //Handle Delete
    const [getID, setGetID] = useState('');
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const handleCloseConfirmDelete = (value) => {
        setOpenConfirmDelete(true);
        //  console.log(value); // value will be either true or false
        if (value) {
            // console.log(getID);
            axios
                .delete(`http://localhost:4000/info/${getID}`)
                .then((res) => {
                    setReRender(true);
                    toast.success('Xóa thông tin hành khách một chiều thành công');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    //Handle Edit
    const [paramsEdit, setParamdEdit] = useState({});
    const [openEditUser, setOpenEditUser] = useState(false);

    const handleEdit = () => {
        setOpenEditUser(true);
    };

    const handleCloseEditUser = () => {
        setOpenEditUser(false);
    };

    //Fetch Data
    const fetchUserData = (company) => {
        fetch(`http://localhost:4000/info/search/getAllInfoBookedOnewayOfCompany?FlightNumber=${company}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
            });
    };

    useEffect(() => {
        fetchUserData(CheckRole().Code);
    }, []);

    // Re-render
    const [reRender, setReRender] = useState(false);
    if (reRender) {
        fetchUserData(CheckRole().Code);
        setReRender(false);
    }

    return (
        <>
            <div className="title">
                <h1 style={{ marginBottom: '30px' }}>Thông tin khách hàng đi một chiều</h1>
                <Button variant="contained" color="success" className="add" onClick={handleClickOpen}>
                    <PersonAddAlt1Icon sx={{ marginRight: '10px' }} /> Thêm người
                </Button>
            </div>

            <DataGrid
                rows={data}
                getRowId={(row) => row._id}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                density="comfortable"
                slots={{
                    toolbar: CustomToolbar,
                }}
                sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ': {
                        'margin-top': '1em',
                        'margin-bottom': '1em',
                    },
                    width: '99%',
                    margin: 'auto',
                    height: 'auto',
                }}
            />

            <AddUser open={openAddUser} handleClose={handleCloseAddUser} setReRender={setReRender} />

            <EditUser
                row={paramsEdit}
                open={openEditUser}
                setOpen={setOpenEditUser}
                handleClose={handleCloseEditUser}
                reRender={reRender}
                setReRender={setReRender}
            />

            <ConfirmDelete
                open={openConfirmDelete}
                setOpenConfirmDelete={setOpenConfirmDelete}
                handleClose={handleCloseConfirmDelete}
                handleConfirm={handleCloseConfirmDelete}
            />
            <ToastCustom />
        </>
    );
}

export function TableUserRoundtrip() {
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'CodeTicket',
            headerName: 'Mã vé',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'UserName',
            headerName: 'Tên',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'Email',
            headerName: 'Email',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'Airport', // if not add field then it return column other nothing field
            headerName: 'Sân bay',
            renderCell: (params) => (
                <div>
                    {' '}
                    {params.row.AirportFrom} <SyncAltIcon /> {params.row.AirportTo}
                </div>
            ),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.13,
        },
        {
            field: 'Date',
            headerName: 'Ngày',
            renderCell: (params) => (
                <div>
                    {' '}
                    {FormatDate(params.row.DateGo)} <br />
                    <EastIcon /> {FormatDate(params.row.DateReturn)}
                </div>
            ),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.12,
        },
        {
            field: 'TimeGo',
            headerName: 'Giờ đi',
            valueGetter: (params) => `${FormatTime(params.row.FlightTime)} - ${FormatTime(params.row.LandingTime)}`,
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.08,
        },

        {
            field: 'TypeTicket',
            headerName: 'Hạng vé đi',
            renderCell: (params) => convertCamelCaseToWords(params.row.TypeTicket),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'CodeSeat',
            headerName: 'Chỗ ngồi đi',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.08,
        },
        {
            field: 'TimeReturn',
            headerName: 'Giờ về',
            valueGetter: (params) =>
                `${FormatTime(params.row.FlightTimeReturn)} - ${FormatTime(params.row.LandingTimeReturn)}`,
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.08,
        },
        {
            field: 'TypeTicketReturn',
            headerName: 'Hạng vé về',
            renderCell: (params) => convertCamelCaseToWords(params.row.TypeTicketReturn),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'CodeSeatReturn',
            headerName: 'Chỗ ngồi về',

            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.08,
        },
        {
            field: 'Action',
            headerName: 'Hành động',
            renderCell: (params) => {
                if (data && data.length !== 0) {
                    return (
                        <div className="action">
                            <Button
                                variant="outlined"
                                sx={{ marginRight: '10px' }}
                                onClick={() => {
                                    handleEdit();
                                    setParamdEdit(params.row);
                                }}
                            >
                                <EditIcon />{' '}
                            </Button>

                            <Button
                                variant="outlined"
                                width="30px"
                                onClick={() => {
                                    handleCloseConfirmDelete();
                                    setGetID(params.row._id);
                                }}
                            >
                                <DeleteIcon />
                            </Button>
                        </div>
                    );
                }
                return null;
            },
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.16,
        },
    ];

    //Handle Add
    const [openAddUserRoundtrip, setOpenAddUserRoundtrip] = useState(false);

    const handleClickOpen = () => {
        setOpenAddUserRoundtrip(true);
    };

    const handleCloseAddUserRoundtrip = () => {
        setOpenAddUserRoundtrip(false);
    };

    //Handle Delete
    const [getID, setGetID] = useState('');
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const handleCloseConfirmDelete = (value) => {
        setOpenConfirmDelete(true);
        //  console.log(value); // value will be either true or false
        if (value) {
            axios
                .delete(`http://localhost:4000/info/${getID}`)
                .then((res) => {
                    setReRender(true);
                    toast.success('Xóa thông tin khách hàng khứ hồi thành công');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    //Handle Edit
    const [paramsEdit, setParamdEdit] = useState({});
    const [openEditUserRoundtrip, setOpenEditUserRoundtrip] = useState(false);

    const handleEdit = () => {
        setOpenEditUserRoundtrip(true);
    };

    const handleCloseEditUser = () => {
        setOpenEditUserRoundtrip(false);
    };

    //Fetch Data
    const fetchUserData = (company) => {
        fetch(
            `http://localhost:4000/info/search/getAllInfoBookedRoundtripOfCompany?FlightNumber=${company}&FlightNumberReturn=${company}`,
        )
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
            });
    };
    useEffect(() => {
        fetchUserData(CheckRole().Code);
    }, []);

    // Re-render
    const [reRender, setReRender] = useState(false);
    if (reRender) {
        fetchUserData(CheckRole().Code);
        setReRender(false);
    }

    return (
        <>
            <div className="title" style={{ paddingTop: '50px' }}>
                <h1 style={{ marginBottom: '30px' }}>Thông tin người dùng đi khứ hồi</h1>
                <Button variant="contained" color="success" className="add" onClick={handleClickOpen}>
                    <PersonAddAlt1Icon sx={{ marginRight: '10px' }} /> Thêm người
                </Button>
            </div>

            <DataGrid
                rows={data}
                getRowId={(row) => row._id}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 20]}
                density="comfortable"
                slots={{
                    toolbar: CustomToolbar,
                    // noRowsOverlay: CustomNoRowsOverlay,
                }}
                sx={{
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ': {
                        'margin-top': '1em',
                        'margin-bottom': '1em',
                    },
                    width: '99%',
                    margin: 'auto',
                    height: 'auto',
                }}
            />

            <AddUserRoundtrip
                open={openAddUserRoundtrip}
                handleClose={handleCloseAddUserRoundtrip}
                setReRender={setReRender}
            />

            <EditUserRoundtrip
                row={paramsEdit}
                open={openEditUserRoundtrip}
                setOpen={setOpenEditUserRoundtrip}
                handleClose={handleCloseEditUser}
                reRender={reRender}
                setReRender={setReRender}
            />

            <ConfirmDelete
                open={openConfirmDelete}
                setOpenConfirmDelete={setOpenConfirmDelete}
                handleClose={handleCloseConfirmDelete}
                handleConfirm={handleCloseConfirmDelete}
            />
            <ToastCustom />
        </>
    );
}
