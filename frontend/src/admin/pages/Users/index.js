import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';
// import TableFlight from '../../component/TableFlight';
import Box from '@mui/material/Box';
import { TableUserOneway, TableUserRoundtrip } from '../../component/TableUser';

function Users() {
    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <TableUserOneway />
                    <TableUserRoundtrip />
                </Box>
            </Box>
        </>
    );
}

export default Users;
