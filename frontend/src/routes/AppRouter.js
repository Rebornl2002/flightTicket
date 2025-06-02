import NotFound from './NotFound';
import Check from '../component/Check';
// import App from '../App';
import { Routes, Route } from 'react-router-dom';
import SeatBooking from '../component/SeatBooking';
import Paying from '../component/Paying';
import Search from '../component/Search';
import MyFlight from '../component/MyFlight';
import Contact from '../component/Contact';

import Home from '../admin/pages/Home';
import Flight from '../admin/pages/Flight';
import Users from '../admin/pages/Users';
import AdminUsers from '../admin/pages/AdminUsers';
import Revenue from '../admin/pages/Revenue';

import SignIn from '../component/SignIn';
import PrivateRoute from './PrivateRoute';
import MyAccount from '../admin/component/MyAccount';

function AppRouter() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/check" element={<Check />} />
            <Route path="/seatBook" element={<SeatBooking />} />
            <Route path="/pay" element={<Paying />} />
            <Route path="/" element={<Search />} />
            <Route path="/myFlight" element={<MyFlight />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/flight"
                element={
                    <PrivateRoute>
                        <Flight />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/users"
                element={
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/adminUsers"
                element={
                    <PrivateRoute>
                        <AdminUsers />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/revenue"
                element={
                    <PrivateRoute>
                        <Revenue />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/myaccount"
                element={
                    <PrivateRoute>
                        <MyAccount />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default AppRouter;
