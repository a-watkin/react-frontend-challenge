import React, { Component } from 'react';
import data from './data';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Button from './components/Button/Button';
import Card from './components/Card/Card';
import PageIndicator from './components/PageIndicator/PageIndicator';

const TIMEOUT = 10;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      currentData: data.slice(0, 4),
      filteredData: null,
      maxResults: 4,
      currentFilter: null,
      maxPages: null,
      currentPage: 0,
      time: TIMEOUT,
      humanClick: false,
      statuses: ['Ready to try', 'On the way', 'In the queue', 'Out of stock']
    }
  }

  getMaxPages(data) {
    let maxPages = Math.ceil(data.length / this.state.maxResults);
    if (maxPages <= 0) {
      maxPages += 1;
    }
    return maxPages;
  }

  componentDidMount() {
    this.setState({
      maxPages: this.getMaxPages(this.state.data)
    });

    this.interval = setInterval(() => this.setState({ time: this.state.time - 1 }), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    let { maxPages, currentPage, currentFilter, humanClick } = prevState;

    if (!currentFilter && !humanClick) {
      if (prevState.time <= 0) {
        if (currentPage < maxPages - 1) {
          currentPage += 1;
        } else {
          currentPage = 0;
        }
        this.setState({
          currentPage,
          time: TIMEOUT
        });
        this.handlePaginationClick(currentPage);
      }
    }
  }

  handleResultFilter(filterBy) {
    let { currentFilter } = this.state;

    if (currentFilter === filterBy) {
      this.setState({
        currentData: data.slice(0, 4),
        maxPages: this.getMaxPages(this.state.data),
        currentPage: 0,
        currentFilter: null
      })
    } else {
      let filteredData = this.state.data.filter((elem) => {
        return elem.Status === filterBy;
      });

      this.setState({
        currentData: filteredData.slice(0, 4),
        filteredData,
        currentPage: 0,
        currentFilter: filterBy,
        maxPages: this.getMaxPages(filteredData)
      });
    }
  }

  handleAutoRotate() {
    let { humanClick } = this.state;
    this.setState({
      humanClick: !humanClick
    });
  }

  handlePaginationClick(page) {
    let { maxResults, currentFilter, filteredData } = this.state;
    let start = 0;
    let stop = maxResults;
    let data = [...this.state.data];

    if (currentFilter) {
      data = filteredData;
    }

    // Get slice numbers.
    start = page * stop;
    stop = page * stop + 4;

    this.setState({
      currentData: data.slice(start, stop),
      currentPage: page
    });
  }

  render() {
    let pages;
    // Gets an array of page numbers.
    if (this.state.maxPages) {
      pages = [...Array(this.state.maxPages).fill(null).map((x, i) => i)]
    }

    const { statuses } = this.state;

    return (

      // Filter buttons.
      <div className="container" >
        <div className="row filter-button-container">
          <div className="col text-right">
            {
              statuses.map((elem, index) => {
                let status = elem.toLowerCase().split(' ').join('-');
                return (
                  <Button
                    key={index}
                    value={elem}
                    btnStyle={`large-circle-btn ${status}`}
                    highlight={
                      this.state.currentFilter === elem ? 'highlight-filter' : null
                    }
                    handleClick={() => this.handleResultFilter(elem)}
                  >
                  </Button>
                )
              })
            }
          </div>
        </div>

        {/* Product cards. */}
        <div className="row">
          <div className="col">
            {
              this.state.currentData.length > 0 ?
                this.state.currentData.map((elem, index) => {
                  let status = elem.Status.toLowerCase().split(' ').join('-');

                  return (
                    <Card
                      key={index}
                      style={`card-body ${status}`}
                      img={elem.img}
                      productName={elem.Product_name}
                      category={elem.Category}
                      size={elem.Size}
                      colour={elem.Colour}
                      customerInitials={elem.Customers_initials}
                    >
                    </Card>
                  )
                })

                : <h1 className="text-center">
                  No data.
                </h1>
            }
          </div>
        </div>

        {/* Pagination buttons. */}
        <div className="row text-center pagination-container">
          <div className="col">
            <span></span>
          </div>

          <div className="col text-center">
            {
              pages ?
                pages.map((elem) => {
                  let cssClass = "small-circle-btn";
                  if (elem === this.state.currentPage) {
                    cssClass = "small-circle-btn highlight"
                  }

                  return (
                    <Button key={elem} btnStyle={cssClass}
                      handleClick={() => this.handlePaginationClick(elem)}
                      page={this.state.currentPage}
                    ></Button>
                  )
                })
                : null
            }
          </div>

          {/* Page number indicators. */}
          <div className="col text-right">
            {/* Plus 1 because the page count starts at 0. */}
            <PageIndicator
              currentPage={this.state.currentPage + 1}
              endPage={this.state.maxPages}
            ></PageIndicator>
          </div>
        </div>

        {/* Button for stopping auto rotation. */}
        {/* <button className="btn btn-primary" onClick={() => this.handleAutoRotate()}>Toggle autorotate</button> */}
      </div >
    )
  }
}

export default App;
