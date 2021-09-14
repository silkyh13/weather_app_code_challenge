import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Searchbar from "./Search";
import Table from "./Table";
export default function HomePage() {
    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Searchbar />
            </Row>
            <Row className="justify-content-md-center">
                <Table />
            </Row>
        </Container>
    );
}
