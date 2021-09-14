import { createSlice } from "@reduxjs/toolkit";

export const query = createSlice({
    name: "query",
    initialState: {
        week: {},
        city: "",
        currUvi: "",
        geoCoords: {},
    },
    reducers: {
        setQuery: (state, action) => {
            let { list, city, currUvi, geoCoords } = action.payload;

            state.week = { ...list };
            state.city = city;
            state.currUvi = currUvi;
            state.geoCoords = { ...geoCoords };
        },
    },
});

export const { setQuery } = query.actions;
export const stateOfquery = (state) => state.query;

export default query.reducer;
