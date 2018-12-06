import React, { Component } from 'react';
import './App.css';
import getData from './data.js';
import { InfiniteLoader, List } from 'react-virtualized';
import 'react-virtualized/styles.css';

const remoteRowCount = 10000;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 0,
      size: 30,
    }
  }

  loadRows = () => {
    let { list, page, size } = this.state;
    return getData(size, page)
      .then((rows) => {
        console.log('promise resolved with data for page ', page);
        list.push(...rows);
        this.setState({
          page: this.state.page+1,
          list
        })
      });  
  }

  componentDidMount() {
    this.loadRows().then(x => {
      this.list.forceUpdateGrid();
    });
  }

  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];
  }

  rowRenderer = ({ key, index, style }) => (
    <div
      key={key}
      style={style}
    >
      {JSON.stringify(this.state.list[index])}
    </div>
  )

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React-virtualized
        </header>
        <div className="list-style">
          <InfiniteLoader
            rowCount = {remoteRowCount}
            loadMoreRows = {this.loadRows}
            isRowLoaded = {this.isRowLoaded}
          >
            {({ onRowsRendered }) => (
              <List
                height={200}
                onRowsRendered={onRowsRendered}
                ref={c => {
                  this.list = c;
                }}
                rowCount={remoteRowCount}
                rowHeight={20}
                rowRenderer={this.rowRenderer}
                width={300}
              />
            )}
          </InfiniteLoader>
        </div>
      </div>
    );
  }
}

export default App;
