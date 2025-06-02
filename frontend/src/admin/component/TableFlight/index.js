/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

// import classNames from 'classnames/bind';
// import styles from './TableFlight.module.scss';

import { useEffect, useState } from 'react';
import { FormatDate, FormatTime } from '../../../function/FormatDate';

import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ConfirmDelete from '../../component/ConfirmDelete';

import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import axios from 'axios';
import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import 'react-toastify/dist/ReactToastify.css';

import { AddFlight, EditFlight } from './ActionFlight';
import CheckRole from '../CheckRole';

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

const TableFlight = ({ param, title, onUpdate }) => {
    const [data, setData] = useState([]);

    const columns = [
        {
            field: 'FlightNumber',
            headerName: 'Số hiệu máy bay',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'AirportFrom',
            headerName: 'Sân bay đi',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'AirportTo',
            headerName: 'Sân bay về',
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.1,
        },
        {
            field: 'DateGo',
            headerName: 'Ngày đi',
            renderCell: (params) => FormatDate(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
        {
            field: 'FlightTime',
            headerName: 'Giờ bay',
            renderCell: (params) => FormatTime(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.12,
        },
        {
            field: 'LandingTime',
            headerName: 'Giờ đến',
            renderCell: (params) => FormatTime(params.value),
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.12,
        },
        {
            field: 'DateReturn',
            headerName: 'Ngày đến',
            renderCell: (params) => `${FormatDate(params.row.LandingTime)}`,
            headerClassName: 'custom-header',
            cellClassName: 'custom-cell',
            flex: 0.15,
        },
    ];
    if (param === '/search/getAllTicketOfCompany') {
        columns.push({
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
                                    setGetFlightNumber(params.row.FlightNumber);
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
        });
    }

    //Handle Delete
    const [getID, setGetID] = useState('');
    const [getFlightNumber, setGetFlightNumber] = useState('');
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const handleCloseConfirmDelete = (value) => {
        setOpenConfirmDelete(true);
        //  console.log(value); // value will be either true or false
        if (value) {
            axios
                .delete(`http://localhost:4000/tickets/${getID}`)
                .then((res) => {
                    // setReRender(true);
                    toast.success('Xóa chuyến bay thành công');
                    onUpdate();
                    // window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
            axios
                .delete(`http://localhost:4000/codeSeat/${getFlightNumber}`)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    };

    //Handle Add
    const [openAddFlight, setOpenAddFlight] = useState(false);

    const handleClickOpen = () => {
        setOpenAddFlight(true);
    };

    const handleCloseAddFlight = () => {
        setOpenAddFlight(false);
    };

    //Handle Edit
    const [paramsEdit, setParamdEdit] = useState({});
    const [openEditFlight, setOpenEditFlight] = useState(false);

    const handleEdit = () => {
        setOpenEditFlight(true);
    };

    const handleCloseEditFlight = () => {
        setOpenEditFlight(false);
    };

    const role = CheckRole();

    //Fetch Data
    const fetchUserData = () => {
        fetch(`http://localhost:4000/tickets${param}?AirlineCode=${role.Code}
        `)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
            });
    };
    useEffect(() => {
        fetchUserData();
    }, [onUpdate, param]);

    return (
        <div style={{ marginBottom: '50px' }}>
            <div className="title">
                <h1 style={{ marginBottom: '30px' }}>{title}</h1>
                {param === '/search/getAllTicketOfCompany' && (
                    <Button variant="contained" color="success" className="add" onClick={handleClickOpen}>
                        <PersonAddAlt1Icon sx={{ marginRight: '10px' }} /> Thêm chuyến bay
                    </Button>
                )}
            </div>

            <DataGrid
                rows={data}
                getRowId={(row) => row._id || row.id}
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
                    width: '98%',
                    height: 'auto',
                    margin: 'auto',
                }}
            />

            <AddFlight
                open={openAddFlight}
                handleClose={handleCloseAddFlight}
                // reRender={reRender}
                // setReRender={setReRender}
                onUpdate={onUpdate}
            />

            <EditFlight
                row={paramsEdit}
                open={openEditFlight}
                setOpen={setOpenEditFlight}
                handleClose={handleCloseEditFlight}
                // reRender={reRender}
                // setReRender={setReRender}
                onUpdate={onUpdate}
            />
            <ConfirmDelete
                open={openConfirmDelete}
                setOpenConfirmDelete={setOpenConfirmDelete}
                handleClose={handleCloseConfirmDelete}
                handleConfirm={handleCloseConfirmDelete}
            />
            <ToastCustom />
        </div>
    );
};

export default TableFlight;
