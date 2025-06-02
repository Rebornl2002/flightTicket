import Sidenav from '../../component/Sidenav';
import Navbar from '../../component/Navbar';

import Box from '@mui/material/Box';
import { PieChartCompareTypeFlight, PieChartCompany, LineChart } from '../../component/Chart';
import TotalMoney from './TotalMoney';

import CheckRevenue from './CheckRevenue';
import CheckRole from '../../component/CheckRole';
// import { Chart } from 'react-google-charts';

function Revenue() {
    const StorageMoney = TotalMoney();
    const valueRole = CheckRole();
    const checkRevenue = CheckRevenue();
    console.log(checkRevenue);
    // console.log(checkRevenue.pushData);
    // // console.log(checkRevenue[1], checkRevenue[0]);

    // const chartData = [['Ngày', 'Doanh thu']];
    // const moneyPerDay = checkRevenue.pushData;
    // for (let day = 1; day <= 31; day++) {
    //     const ngay = `${day}/01`;
    //     const doanhThu = moneyPerDay[ngay] || 0;

    //     chartData.push([ngay, doanhThu]);
    // }
    // const options = {
    //     chart: {
    //         title: `Biểu đồ so sánh lợi nhuận mỗi ngày trong tháng  của hãng hàng không`,
    //         subtitle: 'Được tính theo đồng (VNĐ)',
    //     },
    //     // colors: ['blue'], // Set custom color (e.g., blue)
    //     vAxis: {
    //         viewWindow: {
    //             min: 0,
    //             max: 1,
    //         },
    //     },
    // };

    return (
        <>
            <Navbar />
            <Box height={64} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {valueRole.Code === 'AD' && (
                        <>
                            <div style={{ display: 'flex' }}>
                                <PieChartCompareTypeFlight StorageMoney={StorageMoney} />
                            </div>
                            <PieChartCompany StorageMoney={StorageMoney} />
                            <LineChart />
                        </>
                    )}

                    <div>{checkRevenue.render}</div>
                    {/* <Chart chartType="Line" width="100%" height="400px" data={chartData} options={options} /> */}
                </Box>
            </Box>
        </>
    );
}

export default Revenue;
