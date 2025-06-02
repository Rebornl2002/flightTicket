import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import NumberFormat from '../../../component/NumberFormat/NumberFormat';

function TotalMoney() {
    const [moneyOneway, setMoneyOneway] = useState(0);
    const [moneyRoundtrip, setMoneyRoundtrip] = useState(0);
    const [moneyVJ, setMoneyVJ] = useState(0);
    const [moneyVNA, setMoneyVNA] = useState(0);
    const [moneyQH, setMoneyQH] = useState(0);
    const [moneyBL, setMoneyBL] = useState(0);

    async function fetchAPIGetMoney(param) {
        try {
            let response = await fetch(`http://localhost:4000/info/search/getInfoBooked${param}MonthNow`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            // console.log(data1.data);

            return data1.data;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }
    async function fetchAPICompany(company) {
        try {
            let response = await fetch(
                `http://localhost:4000/info/search/getInfoBookedCompany?FlightNumber=${company}`,
            );

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            let data1 = await response.json();
            // console.log(data1.data);

            return data1.data;
        } catch (error) {
            // Handle the error here
            console.error(error);

            // You can also set an error state or show an error message to the user
        }
    }

    const getTotalMoney = (data) => {
        // console.log(data);
        return data.reduce((accumuluator, currentValue) => {
            return accumuluator + currentValue.TotalMoney;
        }, 0);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                let Oneway = await fetchAPIGetMoney('Oneway');
                let Roundtrip = await fetchAPIGetMoney('Roundtrip');

                let VJ = await fetchAPICompany('VJ');
                let VNA = await fetchAPICompany('VNA');
                let QH = await fetchAPICompany('QH');
                let BL = await fetchAPICompany('BL');

                setMoneyOneway(getTotalMoney(Oneway));
                setMoneyRoundtrip(getTotalMoney(Roundtrip));

                setMoneyVJ(getTotalMoney(VJ));
                setMoneyVNA(getTotalMoney(VNA));
                setMoneyQH(getTotalMoney(QH));
                setMoneyBL(getTotalMoney(BL));

                // Handle the quantity data as needed
            } catch (error) {
                console.error(error);
                // Handle errors if necessary
            }
        }

        fetchData();
    }, []);

    let StorageMoney = {
        MoneyOneway: moneyOneway,
        MoneyRoundtrip: moneyRoundtrip,
        moneyVJ,
        moneyVNA,
        moneyBL,
        moneyQH,
    };
    return StorageMoney;
}

export default TotalMoney;

export const TableRevenueTypeFlight = (StorageMoney) => {
    const moneyOneway = StorageMoney.MoneyOneway;
    const moneyRoundtrip = StorageMoney.MoneyRoundtrip;

    const ratingOneway = (moneyOneway / (moneyOneway + moneyRoundtrip)).toFixed(4);

    const renderTable = () => {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Loại vé</th>
                            <th>Doanh thu (VNĐ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Một chiều</td>
                            <td>{NumberFormat(moneyOneway)}</td>
                        </tr>
                        <tr>
                            <td>Khứ hồi</td>
                            <td>{NumberFormat(moneyRoundtrip)}</td>
                        </tr>
                        <tr>
                            <td>Tổng tiền</td>
                            <td>{NumberFormat(moneyOneway + moneyRoundtrip)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };
    return {
        render: renderTable(),
        ratingOneway,
    };
};
export const TableRevenueCompany = (StorageMoney) => {
    // const StorageMoney = TotalMoney();
    const moneyVJ = StorageMoney.moneyVJ;
    const moneyVNA = StorageMoney.moneyVNA;
    const moneyBL = StorageMoney.moneyBL;
    const moneyQH = StorageMoney.moneyQH;
    const total = moneyVJ + moneyVNA + moneyBL + moneyQH;

    const ratingVJ = (moneyVJ / total).toFixed(4);
    const ratingVNA = (moneyVNA / total).toFixed(4);
    const ratingBL = (moneyBL / total).toFixed(4);
    const ratingQH = (moneyQH / total).toFixed(4);

    const renderTable = () => {
        return (
            <div>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Hãng hàng không</th>
                            <th>Doanh thu (VNĐ)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Vietnam Airlines</td>
                            <td>{NumberFormat(moneyVNA)}</td>
                        </tr>
                        <tr>
                            <td>VietJet Air</td>
                            <td>{NumberFormat(moneyVJ)}</td>
                        </tr>
                        <tr>
                            <td>BamBo Airways</td>
                            <td>{NumberFormat(moneyQH)}</td>
                        </tr>
                        <tr>
                            <td>Jetstar Pacific Airlines</td>
                            <td>{NumberFormat(moneyBL)}</td>
                        </tr>
                        <tr>
                            <td>Tổng tiền</td>
                            <td>{NumberFormat(total)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    };
    return {
        render: renderTable(),
        ratingVJ,
        ratingVNA,
        ratingBL,
        ratingQH,
    };
};
