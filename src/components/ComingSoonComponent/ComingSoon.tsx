import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const ComingSoon: React.FC = () => {
  return (
    <Container className="py-5 h-100 d-flex align-items-center justify-content-center">
      <Row className="justify-content-center w-100">
        <Col md={8} lg={6} className="text-center">
          <h1 className="mb-4">Coming Soon!</h1>

          <p className="lead">We're still working on this page.</p>
        </Col>
      </Row>
    </Container>
  );
};
