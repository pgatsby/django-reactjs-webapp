import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ center, xs, md, children}) {
  return (
    <Container>
      <Row className={center ? "justify-content-md-center" : ""}>
        <Col xs={xs} md={md}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
