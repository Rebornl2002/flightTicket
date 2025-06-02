import { toast } from 'react-toastify';
import ToastCustom from '../../../Toast';
import * as React from 'react';

import axios from 'axios';

function ShowNotifyCancel({ data }) {
    const handleDelete = async (data) => {
        console.log('In id', data);

        if (data) {
            try {
                axios
                    .delete(`http://localhost:4000/info/${data.ID_Info}`)
                    .then((res) => {
                        console.log(res);

                        axios
                            .delete(`http://localhost:4000/cancel/${data._id}`)
                            .then((res) => {
                                console.log(res);
                                console.log('Deletions successful');
                                toast.success('Hủy vé thành công');
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div onClick={() => handleDelete(data)}>
            {' '}
            Yêu cầu hủy vé từ {data.UserName} có mã {data.CodeTicket}
            <ToastCustom />
        </div>
    );
}

export default ShowNotifyCancel;
