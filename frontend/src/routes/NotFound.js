import Alert from "react-bootstrap/Alert";

function NotFound() {
  return (
    <>
      <Alert variant="warning" className="mt-3">
        <Alert.Heading>Oh snap! You got an warning!</Alert.Heading>
        <p>Routes doesn't exist.</p>
      </Alert>
    </>
  );
}

export default NotFound;
