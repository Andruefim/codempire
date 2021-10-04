/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  searchState: {},
  sortState: {},
  status: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    const response = await fetch(
      'https://api.covid19api.com/summary',
      requestOptions,
    );
    const result = await response.text();
    const obj = JSON.parse(result);
    const countriesObj = obj.Countries;
    // console.log(countriesObj);
    return countriesObj;
  },
);

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    searchUpdated(state, action) {
      const { search } = action.payload;
      state.searchState = state.countries.filter((country) => country.Country
        .toLowerCase().includes(search.toLowerCase()));
      // state.sortState = state.searchState.sort((a,b)=> b.TotalConfirmed - a.TotalConfirmed)
    },
    sortSearchUpdated(state, action) {
      const { search } = action.payload;
      if (search) {
        state.searchState = state.countries.filter((country) => country.Country
          .toLowerCase().includes(search.toLowerCase()));
        state.searchState.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      } else {
        state.searchState = state.countries.filter((country) => country.Country
          .toLowerCase().includes(search.toLowerCase()));
        state.searchState.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
      }
      // state.searchState = state.searchState.sort((a,b)=> b.TotalConfirmed - a.TotalConfirmed)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.countries = state.countries.concat(action.payload);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  searchUpdated, sortSearchUpdated, sortUpdated, setStatus,
} = countriesSlice.actions;
export default countriesSlice.reducer;

export const AllCountries = (state) => state.countries.countries;
export const selectCountryById = (state, countryId) => state.countries.countries
  .find((country) => country.ID === countryId);
export const selectSearchedResults = (state) => state.countries.searchState;
export const selectSortedResults = (state) => state.countries.sortState;
