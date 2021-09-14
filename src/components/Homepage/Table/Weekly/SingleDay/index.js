import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Row, Col } from "react-bootstrap";

export default function SingleDay({
    index,
    img,
    date,
    mainWeather,
    temperature,
    miscInfo,
    currUvi,
}) {
    const [openMoreInfo, setOpenMoreInfo] = useState(false);
    let { high, low } = temperature;
    return (
        <Container>
            <Row key={index}>
                <button
                    className="row-container"
                    onClick={() => {
                        setOpenMoreInfo(!openMoreInfo);
                    }}
                >
                    <div className="icon-and-day">
                        <div className="weather-icon mr-2">
                            <img src={img} />
                        </div>
                        <div>
                            <p className="top-font">
                                {index == 0
                                    ? "Today"
                                    : index == 1
                                    ? "Tomorrow"
                                    : date}
                            </p>
                            <p className="bot-font">{mainWeather}</p>
                        </div>
                    </div>

                    <div className="temperature-container">
                        <p className="top-font">{Math.round(high)} &#8457;</p>

                        <p className="bot-font">{Math.round(low)} &#8457;</p>
                    </div>
                </button>
                <div className={"panel " + (openMoreInfo ? "show" : "hide")}>
                    <p>
                        {Object.entries(miscInfo).reduce((acc, curr) => {
                            let categoryName = curr[0].split("_");
                            categoryName = categoryName.map((word) => {
                                return (
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                );
                            });
                            return (
                                acc +
                                categoryName.join(" ") +
                                ": " +
                                curr[1] +
                                " " +
                                "\n"
                            );
                        }, "")}
                        {index === 0 && `UV Index: ${currUvi}`}
                    </p>
                </div>
            </Row>
            <div className="grey-border"></div>
        </Container>
    );
}
