export const FormatDate = (date) => {
    if (date) {
        const dateFormat = new Date(date);
        const year = dateFormat.getFullYear();
        const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
        const day = String(dateFormat.getDate()).padStart(2, '0');
        // const formattedDate = `${year}-${month}-${day}`;

        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }
    return '';
};

export const FormatDateYMD = (date) => {
    if (date) {
        const dateFormat = new Date(date);
        const year = dateFormat.getFullYear();
        const month = String(dateFormat.getMonth() + 1).padStart(2, '0');
        const day = String(dateFormat.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }
    return '';
};
export const FormatTime = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `${hours}:${minutes}`;
    }
    return '';
};
