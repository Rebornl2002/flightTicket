function HandlePlace({ place }) {
    const PLACE = [
        'Hà Nội',
        'Hải Phòng',
        'Điện Biên',
        'Thanh Hóa',
        'Quảng Ninh',
        'Vinh',
        'Huế',
        'Đồng Nai',
        'Đà Nẵng',
        'Pleiku',
        'Tuy Hòa',
        'Hồ Chí Minh',
        'Nha Trang',
        'Đà Lạt',
        'Phú Quốc',
        'Tam Kì',
        'Qui Nhơn',
        'Cần Thơ',
        'Côn Đảo',
        'Ban Mê Thuật',
        'Rạch Giá',
        'Cà Mau',
    ];
    let placeNew;
    switch (place) {
        case 'HAN':
            placeNew = PLACE[0];
            break;
        case 'HPH':
            placeNew = PLACE[1];
            break;
        case 'DIN':
            placeNew = PLACE[2];
            break;
        case 'THD':
            placeNew = PLACE[3];
            break;
        case 'VDO':
            placeNew = PLACE[4];
            break;
        case 'VII':
            placeNew = PLACE[5];
            break;
        case 'HUI':
            placeNew = PLACE[6];
            break;
        case 'VDH':
            placeNew = PLACE[7];
            break;
        case 'DAD':
            placeNew = PLACE[8];
            break;
        case 'PXU':
            placeNew = PLACE[9];
            break;
        case 'TBB':
            placeNew = PLACE[10];
            break;
        case 'SGN':
            placeNew = PLACE[11];
            break;
        case 'CXR':
            placeNew = PLACE[12];
            break;
        case 'DLI':
            placeNew = PLACE[13];
            break;
        case 'PQC':
            placeNew = PLACE[14];
            break;
        case 'VCL':
            placeNew = PLACE[15];
            break;
        case 'UIH':
            placeNew = PLACE[16];
            break;
        case 'VCA':
            placeNew = PLACE[17];
            break;
        case 'VCS':
            placeNew = PLACE[18];
            break;
        case 'BMV':
            placeNew = PLACE[19];
            break;
        case 'VKG':
            placeNew = PLACE[20];
            break;

        default:
            placeNew = PLACE[21];
    }
    return <span>{placeNew}</span>;
}

export default HandlePlace;
