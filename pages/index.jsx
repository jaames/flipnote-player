import { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import Dropzone from 'react-dropzone';
import Layout from '../components/Layout';
import FlipnoteGrid from '../components/FlipnoteGrid';
import Pagination from '../components/Pagination';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  static async getInitialProps(context) {
    const res = await fetch(process.env.BASE_URL + '/static/manifest.json');
    const data = await res.json();
  
    return {
      memos: data['items']
    }
  }

  setPage(newPage) {
    this.setState({page: newPage});
  }

  render() {
    const {props, state} = this;

    return (
      <Layout>
        <main className="view">
          <div className="section section--side">
            <div className="section__title">
              <h4 className="title">Upload Flipnote</h4>
            </div>
            <div className="section__body">
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
                  <div className="button button--inline">Browse Files</div>
                </div>
              </Dropzone>
            </div>
          </div>
          <div className="section section--main">
            <div className="section__title">
              <h4 className="title">Sample Flipnotes</h4>
              <Pagination 
                current={state.page}
                itemCount={props.memos.length} 
                itemsPerPage={12} onChange={newPage => this.setPage(newPage) }
              />
            </div>
            <div className="section__body">
              <FlipnoteGrid 
                items={props.memos}
                page={state.page}
                onSelect={src => this.loadFlipnote(src, true)}
              />
            </div>
          </div>
        </main>
      </Layout>
    );
  }

}