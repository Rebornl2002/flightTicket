function CheckRole() {
    const storedData = localStorage.getItem('Login');

    if (storedData) {
        const loginData = JSON.parse(storedData);
        const role = loginData.Role;

        switch (role) {
            case 'Quản trị viên hệ thống':
                return {
                    Name: 'Administrator',
                    Code: 'AD',
                };

            case 'Đại lý VietJet Air':
                return {
                    Name: 'VietJet Air',
                    Code: 'VJ',
                };

            case 'Đại lý Vietnam Airlines':
                return {
                    Name: 'Vietnam Airlines',
                    Code: 'VNA',
                };

            case 'Đại lý Jetstar Pacific Airlines':
                return {
                    Name: 'Jetstar Pacific Airlines',
                    Code: 'BL',
                };

            default:
                return {
                    Name: 'Bamboo Airway',
                    Code: 'QH',
                };
            // eslint-disable-next-line no-unreachable
        }
    } else {
        // Handle case where Login data doesn't exist in localStorage
        return null;
    }
}
export default CheckRole;
