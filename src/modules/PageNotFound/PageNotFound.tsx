import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export const PageNotFound: React.FC = () => (
  <Container>
    <Row className="mt-5">
      <Col md={6} className="mx-auto">
        <h1 className="text-center mb-4">Page not found</h1>
        <p className="text-center">
          The page you are looking for does not exist.
        </p>
        <div className="text-center">
          <Button href="/home" variant="primary" className="mt-3">
            Go back to home
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
);
