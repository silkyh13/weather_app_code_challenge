import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { stateOfquery, setQuery } from "../../../../state/slices/query";
import iconReference from "../../../../../assets/weather-codes-icon-map.json";
import SingleDay from "./SingleDay";
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
            let temperature = { high: 0, low: 100 },
                modeMap = {},
                maxCount = 0,
                mainWeather = "",
                icon = "",
                miscInfo = "",
                img = "";

            weatherInfoForThatDay.forEach((timeSlot) => {
                for (const [time, info] of Object.entries(timeSlot)) {
                    temperature.high = Math.max(
                        temperature.high,
                        info.miscInfo.temp_max
                    );
                    temperature.low = Math.min(
                        temperature.low,
                        info.miscInfo.temp_min
                    );
                    modeMap[info.weatherMain]
                        ? modeMap[info.weatherMain]++
                        : (modeMap[info.weatherMain] = 1);
                    if (modeMap[info.weatherMain] > maxCount) {
                        maxCount = modeMap[info.weatherMain];
                        mainWeather = info.weatherMain;
                        icon = info.weatherIcon;
                    }
                    miscInfo = info.miscInfo;
                }
                img = `/assets/${iconReference[icon]}`;
            });
            return (
                <SingleDay
                    index={i}
                    temperature={temperature}
                    img={img}
                    date={date}
                    mainWeather={mainWeather}
                    miscInfo={miscInfo}
                    currUvi={query.currUvi}
                />
            );
        });
    };
    return (
        <Container className="sizing">
            <div className="center-div">
                <Form>
                    <Form.Group
                        className="mt-2 mb-2"
                        controlId="formPlaintextEmail"
                    >
                        <Form.Label>{query.city}</Form.Label>
                    </Form.Group>
                </Form>
            </div>
            <Row>
                <Container>{query.week && extractingMaxMinTemp()}</Container>
            </Row>
        </Container>
    );
}
