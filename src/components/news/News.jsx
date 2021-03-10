import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import s from './News.module.scss';
import { NotFound } from '../../pages/NotFound';

const apiUrl = process.env.REACT_APP_API_URL;

News.propTypes = {
  id: PropTypes.string.isRequired,
  allNewsUrl: PropTypes.string,
  limit: PropTypes.number,
}

export function News({ id, onDelete, allNewsUrl, limit = -1 }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setNotFound(false);

      let json;

      const url = new URL(id, apiUrl);

      try {
        const result = await fetch(url);

        if (result.status === 404) {
          setNotFound(true);
          return;
        }

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        console.warn('unable to fetch news', e);
        setError('Gat ekki sótt fréttir.');
        return;
      } finally {
        setLoading(false);
      }

      setNewsItem(json);
    }
    fetchData();
  }, [id]);

  if (error) {
    return (
      <p>Villa kom upp: {error}</p>
    );
  }

  if (loading) {
    return (
      <p>Sæki gögn...</p>
    );
  }

  if (notFound) {
    return (
      <NotFound />
    );
  }

  let items = [];

  if (newsItem && newsItem.items) {
    if (limit > 0) {
      items = newsItem.items.slice(0, limit)
    } else {
      items = newsItem.items;
    }
  }

  return (
    <section className={s.news}>
      <h2 className={s.news__title}>{newsItem && newsItem.title}</h2>
      {items.length === 0 && (
        <p>Engar fréttir</p>
      )}
      <ul className={s.news__list}>
        {items.length > 0 && items.map((item, i) => {
          return (
            <li className={s.news__item} key={i}>
              <a href={item.link}>{item.title}</a>
            </li>
          )
        })}
      </ul>
      
      <div className={s.news__links}>
        {allNewsUrl && (
          <Link className={s.news__link} to={allNewsUrl}>Allar fréttir</Link>
        )}

        {!allNewsUrl && (
          <Link className={s.news__link} to="/">Til baka</Link>
        )}
      </div>
    </section>
  );
}