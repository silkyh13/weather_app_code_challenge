import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Searchbar from "./Search";
import Table from "./Table";
export default function HomePage() {
    return (
        <Container>
            <Row className="mt-5 center-div">
                <Searchbar />
            </Row>
            <Row className="justify-content-md-center">
                <Table />
            </Row>
        </Container>
    );
}
