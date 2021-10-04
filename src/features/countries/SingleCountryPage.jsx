/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCountryById } from './countriesSlice';

import '../../App';

const SingleCountryPage = ({ match }) => {
  const { countryId } = match.params;
  const country = useSelector((state) => selectCountryById(state, countryId));

  if (!country) {
    return (
      <section>
        <h2>Country not found!</h2>
      </section>
    );
  }

  return (
    <section className="singlecountry-container">
      <article className="userSingle">
        <h3 className="single-country">{country.Country}</h3>
        <div className="single-confirmed-container">
          <p>Total Confirmed:</p>
          <h3 className="single-confirmed">{country.TotalConfirmed}</h3>
        </div>
        <div className="single-death-container">
          <p>Total Deaths:</p>
          <h3 className="single-death">{country.TotalDeaths}</h3>
        </div>
        <div className="single-new-container">
          <p>New Confirmed:</p>
          <h3 className="single-new">{country.NewConfirmed}</h3>
        </div>
      </article>
      <div className="button-okContainer">
        <Link to="/" className="button-specify">
          OK
        </Link>
      </div>
    </section>
  );
};

export default SingleCountryPage;
