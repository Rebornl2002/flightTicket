import Alert from 'react-bootstrap/Alert';

const PrivateRoute = (props) => {
    const isLoggedIn = localStorage.getItem('Login');

    if (!isLoggedIn) {
        // User is not logged in, show alert and prevent access to the routes
        return (
            <Alert variant="warning" className="mt-3">
                <Alert.Heading>Bạn không được phép truy cập vào trang web này.</Alert.Heading>
                <p>
                    Hãy tiến hành đăng nhập để truy cập nó: Truy cập đường link:{' '}
                    <a href="http://localhost:3000/signin">Chuyển đến đăng nhập</a>
                </p>
            </Alert>
        );
    } else {
        // User is logged in, allow access to the protected routes
        return <>{props.children}</>;
    }
};

export default PrivateRoute;
