import React, { useState, useEffect } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import locationCoords from "../../../../assets/zip-codes-to-geo-coords.json";
import axios from "axios";

const Input = () => {
    const [values, setValues] = useState("");
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
            setValues("");
            setEntered(false);
        }
    }, [entered]);
    const handleChange = (event) => {
        setValues(event.target.value);
    };

    let getSearchResults = () => {
        if (!locationCoords[values]) {
            setInvalidValue(true);
        } else {
            console.log("write api req here");
            setInvalidValue(false);
        }
    };
    return (
        <InputGroup className="search ml-3 mt-3 mb-3">
            <FormControl
                id="search-input"
                placeholder="Enter Zipcode"
                value={values}
                type="text"
                onChange={handleChange}
                isInvalid={invalidValue}
            />
        </InputGroup>
    );
};

export default Input;
