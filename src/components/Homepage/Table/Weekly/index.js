import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { stateOfquery, setQuery } from "../../../../state/slices/query";
import iconReference from "../../../../../assets/weather-codes-icon-map.json";

export default function weeklyTable() {
    const dispatch = useDispatch();

    const query = useSelector(stateOfquery);

    useEffect(() => {
        if (!query.city) {
            axios
                .get("/weather", { params: { zipCode: 90210 } })
                .then((res) => {
                    dispatch(setQuery(res.data));
                })
                .catch((err) => console.error(err));
        }
    }, [query.city]);

    const extractingMaxMinTemp = () => {
        return Object.entries(query.week).map((day, i) => {
            const date = day[0];
            const weatherInfoForThatDay = day[1];
            let high = 0,
                low = 100,
                modeMap = {},
                maxCount = 0,
                mainWeather = "",
                icon = "",
                img = "";

            weatherInfoForThatDay.forEach((timeSlot) => {
                for (const [time, info] of Object.entries(timeSlot)) {
                    high = Math.max(high, info.miscInfo.temp_max);
                    low = Math.min(low, info.miscInfo.temp_min);
                    modeMap[info.weatherMain]
                        ? modeMap[info.weatherMain]++
                        : (modeMap[info.weatherMain] = 1);
                    if (modeMap[info.weatherMain] > maxCount) {
                        maxCount = modeMap[info.weatherMain];
                        mainWeather = info.weatherMain;
                        icon = info.weatherIcon;
                    }
                }
                img = `/assets/${iconReference[icon]}`;
            });

            return (
                <Row key={i}>
                    <button class="row-container">
                        <div className="icon-and-day">
                            <div className="weather-icon mr-2">
                                <img src={img} />
                            </div>
                            <div>
                                <p className="top-font">
                                    {i == 0
                                        ? "Today"
                                        : i == 1
                                        ? "Tomorrow"
                                        : date}
                                </p>
                                <p className="bot-font">{mainWeather}</p>
                            </div>
                        </div>

                        <div className="temperature-container">
                            <p className="top-font">
                                {Math.round(high)} &#8457;
                            </p>

                            <p className="bot-font">
                                {Math.round(low)} &#8457;
                            </p>
                        </div>
                    </button>
                    <div className="row-container"></div>
                    <div className="grey-border"></div>
                </Row>
            );
        });
    };
    return (
        <Container className="weekly-table">
            <Row className="justify-content-md-center">
                <Form>
                    <Form.Group
                        className="mt-2 mb-2"
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label>{query.city}</Form.Label>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Container>{query.week && extractingMaxMinTemp()}</Container>
            </Row>
        </Container>
    );
}

// for (const [key, value] of Object.entries(
//     day[1][0]
// )) {
//     earliestTime = key;
// }
// const high =
//     day[1][4] !== undefined
//         ? day[1][4]["12pm"].miscInfo.temp_max
//         : day[1][0][earliestTime].miscInfo.temp_max;
// const low =
//     day[1][4] !== undefined
//         ? day[1][4]["12pm"].miscInfo.temp_min
//         : day[1][0][earliestTime].miscInfo.temp_min;
