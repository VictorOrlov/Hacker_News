import React from 'react';
import PropTypes from 'prop-types';
import s from './news.module.css';

const NewsPost = ({ author, created_at, num_comments, title, points, url }) => (
  <li className={s.news}>
    <div className={s.description}>
      <a href={url} className={s.newsTitle}>{title}</a>
      <span className={s.text}>{`${points} points`}</span>
      <span className={s.comments}>{`${num_comments} comments`}</span>
      <span className={s.date}>{new Date(created_at).toLocaleDateString()}</span>
      <span className={s.author}>{author}</span>
    </div>
  </li>
);

NewsPost.propTypes = {
  author: PropTypes.string,
  created_at: PropTypes.string.isRequired,
  num_coments: PropTypes.number,
  title: PropTypes.string,
  points: PropTypes.number,
  url: PropTypes.string,
}

NewsPost.defaultProps = {
  author: '',
  num_coments: 0,
  title: 'Here should be s title',
  points: 0,
  url: '#',
}

export default NewsPost;