function HandleTypeTicket({ Type }) {
    const TYPETICKET = ['Economy Class', 'Business Class', 'Premium Class', 'First Class'];
    let typeNew;
    switch (Type) {
        case 'EconomyClass':
            typeNew = TYPETICKET[0];
            break;
        case 'BusinessClass':
            typeNew = TYPETICKET[1];
            break;
        case 'PremiumClass':
            typeNew = TYPETICKET[2];
            break;
        default:
            typeNew = TYPETICKET[3];
    }

    return <span>{typeNew}</span>;
}

export default HandleTypeTicket;
