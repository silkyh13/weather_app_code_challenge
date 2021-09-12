import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function table() {
    return (
        <Table responsive="sm" bordered>
            <tbody>
                <tr>
                    <td>1</td>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
                <tr>
                    <td>2</td>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
                <tr>
                    <td>3</td>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                    ))}
                </tr>
            </tbody>
        </Table>
    );
}
