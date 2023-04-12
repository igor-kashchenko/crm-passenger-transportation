import React from "react";
import { Header } from "../Header";
import { BurgerMenu } from "../BurgerMenu/BurgerMenu";
import "./AppLayout.css";
import { Container, Row } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

export const AppLayout: React.FC<Props> = ({ children }) => (
  <>
    <Header />

    <Container fluid className="cont px-0">
      <Row className="w-100 m-0">
        <BurgerMenu />

        <main className="col-md-9 col-lg-10 pt-3 px-4 ">{children}</main>
      </Row>
    </Container>
  </>
);
