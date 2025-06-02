import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';
import TableFlight from '../../component/TableFlight';
import { useState } from 'react';

import Box from '@mui/material/Box';

function Flight() {
    const [update, setUpdate] = useState(false);
    const handleUpdate = () => {
        setUpdate(!update);
    };
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <TableFlight
                        param="/search/getTicketIncompletedMonthNowOfCompany"
                        title="Chuyến bay chưa hoàn thành"
                        onUpdate={handleUpdate}
                    />

                    <TableFlight
                        param="/search/getTicketCompletedMonthNowOfCompany"
                        title="Chuyến bay đã hoàn thành"
                        onUpdate={handleUpdate}
                    />

                    <TableFlight
                        param="/search/getAllTicketOfCompany"
                        title="Tất cả các chuyến bay"
                        onUpdate={handleUpdate}
                    />
                </Box>
            </Box>
        </>
    );
}

export default Flight;
