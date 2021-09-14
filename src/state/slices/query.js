import { createSlice } from "@reduxjs/toolkit";

export const query = createSlice({
    name: "query",
    initialState: {
        week: {},
        today: [],
        city: "",
        currUvi: "",
        geoCoords: {},
    },
    reducers: {
        setQuery: (state, action) => {
            let { list, city, timezone, currUvi, geoCoords } = action.payload;
            // console.log(action.payload);
            let todayInUTC = new Date()
                .toISOString()
                .replace("T", " ")
                .substring(0, 10);
            if (list[todayInUTC]) {
                state.today = [...list[todayInUTC]];
            } else {
                let day = new Date();
                let nextDay = new Date(day);
                nextDay.setDate(day.getDate() + 1);
                nextDay = nextDay
                    .toISOString()
                    .replace("T", " ")
                    .substring(0, 10);
                state.today = [...list[nextDay]];
            }
            console.log(list);
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
