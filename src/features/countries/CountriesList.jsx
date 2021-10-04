/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCountries,
  AllCountries,
  searchUpdated,
  selectSearchedResults,
  sortSearchUpdated,
} from './countriesSlice';

import logo from '../../images/Covid_symbol.png';
import searchImg from '../../images/search.png';
import '../../App.css';

const CountryExcerpt = ({ countryId, index }) => {
  const itemNumber = index;
  return (
    <article className="post-excerpt" key={countryId.ID}>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/countries/${countryId.ID}`}
        className="button muted-button"
      >
        <div className="link-excerpt">
          <div className="total-number">
            <p>{itemNumber}</p>
          </div>
          <div className="total-country">
            <p>{countryId.Country}</p>
          </div>
          <div className="total-confirmed">
            <p>{countryId.TotalConfirmed}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default () => {
  const countriesStatus = useSelector((state) => state.countries.status);
  const countries = useSelector(AllCountries);
  const searchedCountries = useSelector(selectSearchedResults);
  // console.log(searchedCountries);

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const onSearchChanged = (e) => setSearch(e.target.value);

  const onSearchClicked = () => {
    if (search) {
      dispatch(searchUpdated({ search }));
    } else {
      dispatch(searchUpdated({ search: '' }));
    }
  };

  const onSortClicked = () => {
    if (search) {
      dispatch(sortSearchUpdated({ search }));
    } else {
      dispatch(sortSearchUpdated({ search: '' }));
    }
  };
  const onLogoClicked = () => {
    setSearch('');
    dispatch(searchUpdated({ search: '' }));
  };

  useEffect(() => {
    if (countriesStatus === 'idle') {
      dispatch(fetchCountries());
    }
  }, [countriesStatus, dispatch]);

  let renderedCountries;

  if (!Array.isArray(searchedCountries)) {
    renderedCountries = countries
      .map((country, i) => <CountryExcerpt key={country.ID} countryId={country} index={i} />);
  } else {
    renderedCountries = searchedCountries
      .map((country, i) => <CountryExcerpt key={country.ID} countryId={country} index={i} />);
  }

  return (
    <>
      <section className="countries-list">
        <div className="header">
          <button onClick={onLogoClicked} type="button" className="logo-container">
            <div className="logo">
              <img className="logo-img" src={logo} alt="logo" />
            </div>
            <div className="statistic">STATISTIC</div>
          </button>
          <div className="search-container">
            <input
              className="searchInput"
              style={{ border: 'none', outline: 'none' }}
              type="text"
              id="searchValue"
              name="searchValue"
              placeholder="Search..."
              value={search}
              onChange={onSearchChanged}
            />
            <button
              style={{ backgroundColor: 'white', border: 'none' }}
              type="button"
              onClick={onSearchClicked}
            >
              <img className="search-Img" alt="search" src={searchImg} />
            </button>
          </div>
        </div>
        <article
          className="post-excerpt"
          style={{ backgroundColor: '#2196F3' }}
        >
          <div className="link-excerpt ">
            <div className="total-number" style={{ color: 'white' }}>
              <p>№</p>
            </div>
            <button
              type="button"
              className="total-country buttonNoSort btnleft"
              style={{ color: 'white', backgroundColor: '#2196F3' }}
              onClick={onSearchClicked}
            >
              <div>
                <p>Country</p>
              </div>
              <div>
                <img
                  className="sortImg"
                  src="https://img.icons8.com/ios/50/000000/sort.png"
                  alt="sortImg"
                />
              </div>
            </button>
            <button
              type="button"
              className="total-confirmed buttonNoSort btnright"
              style={{ color: 'white', backgroundColor: '#2196F3' }}
              onClick={onSortClicked}
            >
              <div>
                <p>Total Confirmed</p>
              </div>
              <div>
                <img
                  className="sortImg"
                  src="https://img.icons8.com/ios/50/000000/sort.png"
                  alt="sortImg"
                />
              </div>
            </button>
          </div>
        </article>
        {renderedCountries}
      </section>
    </>
  );
};

CountryExcerpt.propTypes = {
  countryId: PropTypes.shape({
    ID: PropTypes.string.isRequired,
    Country: PropTypes.string.isRequired,
    TotalConfirmed: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
