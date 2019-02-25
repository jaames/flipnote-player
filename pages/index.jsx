import { Component } from 'react';
import { connect } from "react-redux";
import { Router } from "react-router-dom";
import Layout from '~/components/Layout';
import FlipnoteGrid from '~/components/FlipnoteGrid';
import Pagination from '~/components/Pagination';
import Dropzone from '~/components/Dropzone';

import { loadFiles } from '~/utils/loadFiles';

import '~/assets/styles/pages/index.scss';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  loadFlipnote(src) {
    this.props.dispatch({
      type: 'PLAYER_LOAD_FLIPNOTE',
      payload: {
        src: src
      }
    });
    this.props.history.push('/view');
  }

  setPage(newPage) {
    this.setState({page: newPage});
  }

  onDrop(items) {
    if (items.length == 1) {
      this.loadFlipnote(items[0])
    } 
    else if (items.length > 1) {
      this.props.dispatch({
        type: 'LOAD_SAMPLE_FLIPNOTES', 
        payload: {
          sampleFlipnotes: []
        }
      });
      loadFiles(items).then(meta => {
        this.props.dispatch({
          type: 'LOAD_SAMPLE_FLIPNOTES', 
          payload: {
            sampleFlipnotes: meta
          }
        });
      })
    }
  }

  render() {
    const {props, state} = this;

    return (
      <Layout page="index">
        <div className="Section Section--side">
          <div className="Section__title">
            <h4 className="title">Upload Flipnote</h4>
          </div>
          <div className="Section__body">
            <Dropzone onDrop={accepted => this.onDrop(accepted)}/>
          </div>
        </div>
        <div className="Section Section--main">
          <div className="Section__title">
            <h4 className="title">Sample Flipnotes</h4>
            <Pagination 
              current={state.page}
              itemCount={props.sampleFlipnotes.length} 
              itemsPerPage={12} onChange={newPage => this.setPage(newPage) }
            />
          </div>
          <div className="Section__body">
            <FlipnoteGrid 
              items={props.sampleFlipnotes}
              page={state.page}
              onSelect={src => this.loadFlipnote(src)}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(state=>state)(Index);