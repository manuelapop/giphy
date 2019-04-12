import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";

class SearchComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      queryval: "",
      results: [],
      hasMoreItems: true,
      offset: 0,
      totalCount: 0
    };

    this.fetchMoreData = this.fetchMoreData.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const values = queryString.parse(this.props.location.search);
    const val = values["query"];
    const prevvalues = queryString.parse(prevProps.location.search);
    const prevval = prevvalues["query"];
    if (val !== prevval) {
      const getapiUrl = `https://api.giphy.com/v1/gifs/search?api_key=yq5UrV4CBOHD6JB6RGO7D917rzRvj1Xt&q=${val}&limit=50&offset=0&rating=G&lang=en`;

      axios
        .get(getapiUrl)
        .then(response => {
          this.setState({
            results: response.data.data,
            offset: response.data.pagination.offset,
            totalCount: response.data.pagination.total_count
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const val = values["query"];
    const getapiUrl = `https://api.giphy.com/v1/gifs/search?api_key=yq5UrV4CBOHD6JB6RGO7D917rzRvj1Xt&q=${val}&limit=50&offset=0&rating=G&lang=en`;

    this.setState({ queryval: val });

    axios
      .get(getapiUrl)
      .then(response => {
        this.setState({
          results: response.data.data,
          offset: response.data.pagination.offset,
          totalCount: response.data.pagination.total_count
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchMoreData() {
    var self = this;
    const val = this.state.queryval;

    if (this.state.offset !== this.state.totalCount) {
      const offset = this.state.offset + 50 + 1;
      const getapiUrl = `https://api.giphy.com/v1/gifs/search?api_key=yq5UrV4CBOHD6JB6RGO7D917rzRvj1Xt&q=${val}&limit=50&offset=${offset}&rating=G&lang=en`;
      axios
        .get(getapiUrl)
        .then(response => {
          this.setState({
            results: this.state.results.concat(response.data.data),
            offset: response.data.pagination.offset,
            totalCount: response.data.pagination.total_count
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

    if (
      this.state.offset === this.state.totalCount &&
      this.state.offset !== 0 &&
      this.state.totalCount !== 0
    ) {
      self.setState({
        hasMoreItems: false
      });
    }
  }

  render() {
    return (
      <div className="tracks">
        <InfiniteScroll
          dataLength={this.state.results.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMoreItems}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          >
          {this.state.results.map((image, index) => (
            <div className="track" key={index}>
              <a href={image.images.original.url} target="_blank">
                <img
                  src={image.images.fixed_width.url}
                  width="150"
                  height="150"
                  alt=""
                />
                <p className="title">{image.title}</p>
              </a>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default SearchComponent;
