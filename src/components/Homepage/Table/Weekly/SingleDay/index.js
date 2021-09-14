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
}) {
    const [openMoreInfo, setOpenMoreInfo] = useState(false);
    let { high, low } = temperature;
    return (
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
                        return (
                            acc +
                            curr[0].split("_").join(" ") +
                            ": " +
                            curr[1] +
                            " " +
                            "\n"
                        );
                    }, "")}
                </p>
            </div>
            {/* <div className="row-container"></div> */}
            <div className="grey-border"></div>
        </Row>
    );
}
