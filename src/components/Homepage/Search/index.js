import React, { useState, useEffect } from "react";
import { InputGroup, Container, FormControl } from "react-bootstrap";
import locationCoords from "../../../../assets/zip-codes-to-geo-coords.json";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../state/slices/query";

const Input = () => {
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [entered, setEntered] = useState(false);
    const [invalidValue, setInvalidValue] = useState(false);

    useEffect(() => {
        let elem = document.getElementById("search-input");
        const listener = (event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                setEntered(true);
            }
        };
        if (elem) {
            elem.addEventListener("keydown", listener);
        }
    }, []);
    useEffect(() => {
        if (entered) {
            getSearchResults();
            setValue("");
            setEntered(false);
        }
    }, [entered]);
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    let getSearchResults = () => {
        if (!locationCoords[value]) {
            setInvalidValue(true);
        } else {
            axios
                .get("/weather", { params: { zipCode: value } })
                .then((res) => {
                    dispatch(setQuery(res.data));
                    setInvalidValue(false);
                })
                .catch((err) => console.error(err));
        }
    };
    return (
        <div className="sizing center-div">
            <InputGroup>
                <FormControl
                    id="search-input"
                    placeholder="Enter Zipcode"
                    value={value}
                    type="text"
                    onChange={handleChange}
                    isInvalid={invalidValue}
                />
            </InputGroup>
        </div>
    );
};

export default Input;
