import { Component } from 'react';
import { connect } from "react-redux";
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Dropzone from 'react-dropzone';
import Layout from '~/components/Layout';
import FlipnoteGrid from '~/components/FlipnoteGrid';
import Pagination from '~/components/Pagination';

import '~/assets/styles/pages/index.scss';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  static async getInitialProps({store, isServer, pathname, query}) {
    const res = await fetch(process.env.BASE_URL + '/static/manifest.json');
    const data = await res.json();
    return {memos: data['items']}
  }

  loadFlipnote(type, src) {
    Router.push('/view', {test: "aaaa"});
    this.props.dispatch({type: 'CHANGE_NAME', name: 'James'})
  }

  setPage(newPage) {
    this.setState({page: newPage});
  }

  render() {
    const {props, state} = this;

    console.log(props);
    

    return (
      <Layout>
        <div className="Section Section--side">
          <div className="Section__title">
            <h4 className="title">{this.props.foo}</h4>
          </div>
          <div className="Section__body">
            <Dropzone 
              className="Dropzone"
              activeClassName="Dropzone--active"
              acceptClassName="Dropzone--accept"
              rejectClassName="Dropzone--reject"
              accept=".ppm, .kwz"
              multiple={false}
              onDrop={ (accepted) => this.onDrop(accepted) }
              style={{}}
            >
              <div className="Dropzone__content">
                <p>Drag &amp; drop a Flipnote .PPM or .KWZ file here</p>
                <div className="Button Button--inline">Browse Files</div>
              </div>
            </Dropzone>
          </div>
        </div>
        <div className="Section Section--main">
          <div className="Section__title">
            <h4 className="title">Sample Flipnotes</h4>
            <Pagination 
              current={state.page}
              itemCount={props.memos.length} 
              itemsPerPage={12} onChange={newPage => this.setPage(newPage) }
            />
          </div>
          <div className="Section__body">
            <FlipnoteGrid 
              items={props.memos}
              page={state.page}
              onSelect={src => this.loadFlipnote('SAMPLE', src)}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default connect(state=>state)(Index);