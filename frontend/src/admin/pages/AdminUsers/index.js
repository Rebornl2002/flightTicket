import * as React from 'react';

import { useState, useEffect } from 'react';

import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';
import { FormatDate } from '../../../function/FormatDate';

import Box from '@mui/material/Box';
import './AdminUsers.scss';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import { AddAdmin, EditAdmin } from './ActionAdmin';

import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ConfirmDelete from '../../component/ConfirmDelete';
import AvatarPeople from '../../component/AvatarPeople';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}
export default function AdminUsers() {
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'Avatar',
            headerName: 'Avatar',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            renderCell: (params) => <AvatarPeople string={params.row.Name} />,
            flex: 0.1,
        },
        {
            field: 'AccountName',
            headerName: 'Tên tài khoản',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.2,
        },
        // {
        //     field: 'Password',
        //     headerName: 'Mật khẩu',
        //     headerClassName: 'custom-header',
        //     cellClassName: 'custom-cell',
        //     flex: 0.1,
        // },
        {
            field: 'Name',
            headerName: 'Họ và tên',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.25,
        },
        {
            field: 'DayOfBirth',
            headerName: 'Ngày sinh',
            renderCell: (params) => FormatDate(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'Role',
            headerName: 'Vai trò',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'Action',
            headerName: 'Hành động',
            renderCell: (params) => (
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
                    {/* <Button variant="outlined" width="30px" onClick={() => handleDelete(params.row._id)}> */}

                    {/* <Button variant="outlined" width="30px" onClick={() => handleCloseConfirmDelete(params.row._id)}> */}
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
            ),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
    ];

    //Handle Edit
    const [paramsEdit, setParamdEdit] = useState({});
    const [openEditAdmin, setOpenEditAdmin] = useState(false);

    const handleEdit = () => {
        setOpenEditAdmin(true);
    };

    const handleCloseEditAdmin = () => {
        setOpenEditAdmin(false);
    };

    //Handle Delete
    const [getID, setGetID] = useState('');
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const handleCloseConfirmDelete = (value) => {
        setOpenConfirmDelete(true);
        //  console.log(value); // value will be either true or false
        if (value) {
            axios
                .delete(`http://localhost:4000/login/${getID}`)
                .then((res) => {
                    setReRender(true);
                    toast.success('Xóa Admin thành công');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    //Handle Add
    const [openAddAdmin, setOpenAddAdmin] = useState(false);

    const handleClickOpen = () => {
        setOpenAddAdmin(true);
    };

    const handleCloseAddAdmin = () => {
        setOpenAddAdmin(false);
    };

    //Fetch Data
    const fetchUserData = () => {
        fetch('http://localhost:4000/login')
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
            });
    };

    // Re-render
    const [reRender, setReRender] = useState(false);
    if (reRender) {
        fetchUserData();
        setReRender(false);
    }

    //Fetch Data First
    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <div className="title">
                        <h1 style={{ marginBottom: '30px' }}>Thông tin người dùng</h1>
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
                        pageSizeOptions={[5, 10]}
                        slots={{
                            toolbar: CustomToolbar,
                        }}
                        sx={{
                            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ': {
                                'margin-top': '1em',
                                'margin-bottom': '1em',
                            },
                            width: '99%',
                            height: 'auto',
                            margin: 'auto',
                        }}
                    />

                    <AddAdmin
                        open={openAddAdmin}
                        handleClose={handleCloseAddAdmin}
                        reRender={reRender}
                        setReRender={setReRender}
                    />

                    <EditAdmin
                        row={paramsEdit}
                        open={openEditAdmin}
                        setOpen={setOpenEditAdmin}
                        handleClose={handleCloseEditAdmin}
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
                </Box>
            </Box>
        </>
    );
}
