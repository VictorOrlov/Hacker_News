import React, { Component } from "react";
import Title from "../../templates/title";
import NewsPost from '../../templates/news';
import Input from '../../templates/input-search-news';
import Select from '../../templates/select';
import Pagination from '../../templates/pagination';
import s from './HNews.module.css';

const BASE_PATCH = 'http://hn.algolia.com/api/v1';
const SEARCH_PATCH = '/search';
const SEARCH_PARAM = 'query=';
const PAGE_HITS = 'hitsPerPage=';
const PAGE_PARAM = 'page=';

const HITS = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 40,
    label: 40,
  },
  {
    value: 50,
    label: 50,
  }
];

export default class News extends Component{

  state = {
    searchQuery: '',
    result: {},
    hitsPerPage: 20,
    page: 0,
  }

  componentDidMount(){
    const { searchQuery, hitsPerPage, page } = this.state;
    this.fetchData(searchQuery, hitsPerPage, page);
  }

  fetchData = (searchQuery, hitsPerPage, page) => {
    fetch(`${BASE_PATCH}${SEARCH_PATCH}?${SEARCH_PARAM}${searchQuery}&${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`)
      .then(res => res.json())
      .then(result => this.setNews(result))
      .catch(error => error);
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value
    })
  }

  getSearch = ({ key }) => {
    if(key === 'Enter') {
      const { searchQuery, hitsPerPage } = this.state;
      this.setState({
        page: 0,
      })
      this.fetchData(searchQuery, hitsPerPage, 0);
    }
  }

  setNews = result => {
    this.setState({ result });
  }

  handleHitsChange = ({ target: {value} }) => {
    const { searchQuery } = this.state;
    this.setState({
      hitsPerPage: +value,
      page: 0,
    }, () => {
      this.fetchData(searchQuery, this.state.hitsPerPage, 0);
    })
  }

  handlePageChange = ({ target }) => {
    const btnType = target.getAttribute('data-name');
    let { page } = this.state;

    if(!isNaN(btnType)) {
      this.updatePage(+btnType);
    } else {
      switch (btnType) {
        case 'next':
          this.updatePage(page + 1);
          break;
        case 'prev':
          this.updatePage(page - 1);
          break;
        default: ;
      }
    }
  }

  updatePage = (number) => {
    const { searchQuery, hitsPerPage } = this.state;
    this.setState({
      page: number
    }, () => {
      this.fetchData(searchQuery, hitsPerPage, number);
    })
  }

  render(){
    const { searchQuery, result, hitsPerPage } = this.state;
    const { hits = [], page, nbPages } = result;

    console.log(result);

    return(
      <div className={s.wrapper}>
        <Title title='Hacker News'/>
        <Select 
        options={HITS}
        handleChange={this.handleHitsChange}
        value={hitsPerPage}
        />
        <Pagination 
          onClick={this.handlePageChange}
          page={page}
          lastPage={nbPages}
        />
        <Input onKeyPress={this.getSearch} onChange={this.handleInputChange} value={searchQuery} />
        <ul className={s.newsList}>
        {hits.map(({ author, created_at, num_comments, objectID, title, points, url }) =>
          <NewsPost
            key={objectID}
            author={author}
            created_at={created_at}
            num_comments={num_comments}
            title={title}
            points={points}
            url={url}
          />
          )}
        </ul>
      </div>
    );
  }
}