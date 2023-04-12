import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export const HomeContent: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Card>
            <Card.Body>
              <h5>Dashboard</h5>
              <hr />
              <p>Here are some important metrics:</p>
              <ul className="list-unstyled">
                <li>Total bookings: 100</li>
                <li>Revenue this month: $10,000</li>
                <li>Drivers on duty: 15</li>
              </ul>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <h5>Upcoming Bookings</h5>
              <hr />
              <ul className="list-unstyled">
                <li>4/15/2023 - John Smith - New York to Los Angeles</li>
                <li>4/20/2023 - Jane Doe - Chicago to Dallas</li>
                <li>4/25/2023 - Bob Johnson - Miami to Orlando</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <h1>Passenger Transportation CRM</h1>
          <hr />
          <p>
            Welcome to your dashboard! Here you can manage all aspects of your
            passenger transportation business.
          </p>
          <h2>Recent Bookings</h2>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Origin</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4/10/2023</td>
                <td>John Smith</td>
                <td>New York</td>
                <td>Los Angeles</td>
              </tr>
              <tr>
                <td>4/9/2023</td>
                <td>Jane Doe</td>
                <td>Chicago</td>
                <td>Dallas</td>
              </tr>
              <tr>
                <td>4/8/2023</td>
                <td>Bob Johnson</td>
                <td>Miami</td>
                <td>Orlando</td>
              </tr>
            </tbody>
          </table>
          <Card className="mt-3">
            <Card.Body>
              <h5>Recent Feedback</h5>
              <hr />
              <p>Here's what some of your customers are saying:</p>
              <ul>
                <li>"Great service, highly recommend!"</li>
                <li>"The driver was very friendly and professional."</li>
                <li>"Booking was easy and hassle-free."</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
