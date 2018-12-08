import Layout from '../components/Layout';
import FlipnoteGrid from '../components/FlipnoteGrid';
import fetch from 'isomorphic-unfetch';

const Index = (props) => (
  <Layout>
    <div className="fileSelect modal">
      <div className="fileSelect__side modal__region modal__region--left">
        <div className="region__title">
          <h4 className="title">Upload Flipnote</h4>
        </div>
        <div className="region__body">
          {/* <Dropzone 
            className="dropzone"
            activeClassName="dropzone--active"
            acceptClassName="dropzone--accept"
            rejectClassName="dropzone--reject"
            accept=".ppm, .kwz"
            multiple={false}
            onDrop={ (accepted) => this.onDrop(accepted) }
            style={{}}
          >
            <div className="dropzone__content">
              <p>Drag &amp; drop a Flipnote .PPM or .KWZ file here</p>
              <div className="button button--inline">Browse Files</div>
            </div>
          </Dropzone> */}
        </div>
      </div>
      <div className="fileSelect__main modal__region modal__region--right modal__region--gray">
        <div className="region__title">
          <h4 className="title">Sample Flipnotes</h4>
          {/* <Pagination 
            current={state.page}
            itemCount={props.sampleMemos.length} 
            itemsPerPage={12} onChange={newPage => this.setPage(newPage) }
          /> */}
        </div>
        <div className="region__body">
          <FlipnoteGrid 
            items={props.memos}
            // page={state.page}
            // onSelect={src => this.loadFlipnote(src, true)}
          />
        </div>
      </div>
    </div>
  </Layout>
)

Index.getInitialProps = async function(context) {
  const res = await fetch(process.env.BASE_URL + '/static/manifest.json');
  const data = await res.json();

  return {
    memos: data['items']
  }
}

export default Index;