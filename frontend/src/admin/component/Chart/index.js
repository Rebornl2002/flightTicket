import React from 'react';
import { Chart } from 'react-google-charts';

import { TableRevenueTypeFlight, TableRevenueCompany } from '../../pages/Revenue/TotalMoney';
import TotalMoneyPerDay from '../TotalMoneyPerDay';

const getCurrentMonthAndYear = (date) => {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${month}/${year}`;
};

// const StorageMoney = TotalMoney();

export const PieChartCompareTypeFlight = ({ StorageMoney }) => {
    let ratingOneway = TableRevenueTypeFlight(StorageMoney).ratingOneway * 100;
    let ratingroundtrip = 100 - ratingOneway;

    const dataTypeFlight = [
        ['TypeFlight', 'Percent'],
        ['Một chiều', ratingOneway],
        ['Khứ hồi', ratingroundtrip],
    ];

    const optionsTypeFlight = {
        title: `Biểu đồ so sánh doanh thu một chiều và khứ hồi trong tháng ${getCurrentMonthAndYear()}`,
        is3D: true,
    };

    return (
        <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '70%', marginLeft: '-10%', marginTop: '-2%' }}>
                <Chart
                    chartType="PieChart"
                    data={dataTypeFlight}
                    options={{
                        ...optionsTypeFlight,
                        legend: {
                            textStyle: {
                                fontSize: 16,
                            },
                            labels: {
                                fontSize: 20,
                            },
                        },
                        titleTextStyle: {
                            fontSize: 16,
                        },
                    }}
                    width={'100%'}
                    height={'400px'}
                />
            </div>
            <div style={{ width: '30%', paddingRight: '5%', paddingTop: '8%' }}>
                <h5 className="mb-3">Bảng doanh thu theo loại vé</h5>
                {TableRevenueTypeFlight(StorageMoney).render}
            </div>
        </div>
    );
};

export const PieChartCompany = ({ StorageMoney }) => {
    let ratingVJ = TableRevenueCompany(StorageMoney).ratingVJ * 100;
    let ratingVNA = TableRevenueCompany(StorageMoney).ratingVNA * 100;
    let ratingBL = TableRevenueCompany(StorageMoney).ratingBL * 100;

    // let ratingQH = 100 - ratingBL - ratingVJ - ratingVNA;
    let ratingQH = TableRevenueCompany(StorageMoney).ratingQH * 100;
    console.log(ratingVJ, ratingQH, ratingBL, ratingVNA);
    const dataCompany = [
        ['Company', 'Percent'],
        ['Vietnam Airlines', ratingVNA],
        ['VietJet Air', ratingVJ],
        ['Jetstar Pacific Airlines', ratingBL],
        ['BamBo Airways', ratingQH],
    ];

    const optionsCompany = {
        title: `Biểu đồ so sánh doanh thu giữa các hãng hàng không trong tháng ${getCurrentMonthAndYear()}`,
        is3D: true,
    };
    return (
        <div
            style={{
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '30px',
            }}
        >
            <div style={{ width: '70%', marginLeft: '-10%', marginTop: '-2%' }}>
                <Chart
                    chartType="PieChart"
                    data={dataCompany}
                    options={{
                        ...optionsCompany,
                        legend: {
                            textStyle: {
                                fontSize: 16,
                            },
                            labels: {
                                fontSize: 20,
                            },
                        },
                        titleTextStyle: {
                            fontSize: 16,
                        },
                    }}
                    width={'100%'}
                    height={'400px'}
                />
            </div>
            <div style={{ width: '30%', paddingRight: '5%', paddingTop: '5%' }}>
                <h5 className="mb-3">Bảng doanh thu theo hãng hàng không</h5>
                {TableRevenueCompany(StorageMoney).render}
            </div>
        </div>
    );
};

export const LineChart = () => {
    const moneyPerDay = TotalMoneyPerDay();

    const length = Object.keys(moneyPerDay).length;

    const data = [['Ngày', 'Doanh thu']];
    for (let day = 1; day <= length; day++) {
        const ngay = `${day}/1`;
        const doanhThu = moneyPerDay[ngay] || 0;
        data.push([ngay, doanhThu]);
    }

    const options = {
        chart: {
            title: 'Biểu đồ so sánh lợi nhuận mỗi ngày trong tháng 01/2024',
            subtitle: 'Được tính theo đồng (VNĐ)',
        },
        // colors: ['blue'], // Set custom color (e.g., blue)
    };

    return <Chart chartType="Line" width="100%" height="400px" data={data} options={options} />;
};

export const LineChartOption = ({ data, company, date, month }) => {
    const moneyPerDay = data;

    const Company = ['Vietnam Airlines', 'VietJet Air', 'Jetstar Pacific Airlines', 'BamBo Airways'];

    switch (company) {
        case 'VNA':
            company = Company[0];
            break;
        case 'VJ':
            company = Company[1];
            break;
        case 'BL':
            company = Company[2];
            break;
        default:
            company = Company[3];
            break;
    }

    const length = Object.keys(moneyPerDay).length;

    const chartData = [['Ngày', 'Doanh thu']];
    for (let day = 1; day <= length; day++) {
        const ngay = `${day}/${month}`;
        const doanhThu = moneyPerDay[ngay] || 0;

        chartData.push([ngay, doanhThu]);
    }

    const options = {
        chart: {
            title: `Biểu đồ so sánh lợi nhuận mỗi ngày trong tháng ${date} của hãng hàng không ${company}`,
            subtitle: 'Được tính theo đồng (VNĐ)',
        },
        // colors: ['blue'], // Set custom color (e.g., blue)
        vAxis: {
            viewWindow: {
                min: 0,
                max: 1,
            },
        },
    };

    return <Chart chartType="Line" width="100%" height="400px" data={chartData} options={options} />;
};
