import Table from 'react-bootstrap/Table';
import HandleTypeTicket from './HandleTypeTicket';

function TableInfo({ UserName, CodeSeat, TypeTicket, CodeSeatReturn, TypeTicketReturn }) {
    return (
        <Table striped bordered hover variant="light">
            <thead>
                <tr>
                    <th>Tên hành khách</th>
                    <th>Ghế</th>
                    <th>Hạng</th>
                    <th>Tình trạng chỗ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ textTransform: 'capitalize' }}>{UserName}</td>
                    {CodeSeat && TypeTicket && (
                        <>
                            <td>{CodeSeat}</td>
                            <td>
                                <HandleTypeTicket Type={TypeTicket} />
                            </td>
                        </>
                    )}
                    {CodeSeatReturn && TypeTicketReturn && (
                        <>
                            <td>{CodeSeatReturn}</td>
                            <td>
                                <HandleTypeTicket Type={TypeTicketReturn} />
                            </td>
                        </>
                    )}
                    <td>Đã xác nhận</td>
                </tr>
            </tbody>
        </Table>
    );
}

export default TableInfo;
