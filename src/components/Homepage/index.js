import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "./Navbar"; //might delete
import Searchbar from "./Search";
import Table from "./Table";
export default function HomePage() {
    return (
        <Container>
            <Row>
                <Searchbar />
            </Row>
            <Row className="justify-content-md-center">
                hi
                <Table />
            </Row>
        </Container>
    );
}
