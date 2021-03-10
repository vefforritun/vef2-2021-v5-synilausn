import React, { useEffect, useState } from 'react';

import { News } from '../news/News';

import s from './NewsList.module.scss';

const apiUrl = process.env.REACT_APP_API_URL;

export function NewsList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null)

      let json;

      try {
        const result = await fetch(apiUrl);

        if (!result.ok) {
          throw new Error('result not ok');
        }

        json = await result.json();
      } catch (e) {
        console.warn('unable to fetch newslist', e);
        setError('Gat ekki sótt fréttalista.');
        return;
      } finally {
        setLoading(false);
      }

      console.log('json :>> ', json);
      setNews(json);
    }
    fetchData();
  }, []);

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

  return (
    <section className={s.newsList}>
      <div className={s.newsList__list}>
        {news.map((item, i) => {

          return (
            <div key={i} className={s.newsList__item}>
              <News
                title={item.title}
                id={item.id}
                allNewsUrl={`/${item.id}`}
                limit={5}
              />
            </div>
          )
        })}
      </div>
    </section>
  );
}
