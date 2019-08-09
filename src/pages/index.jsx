import { parseSource } from 'flipnote.js';
import { useStoreState } from 'pullstate';
import { GlobalStore, GridStore, PlayerStore } from '@/store';
import Layout from '@/components/Layout';
import FlipnoteGrid from '@/components/FlipnoteGrid';
import Pagination from '@/components/Pagination';
import UploadPanel from '@/components/UploadPanel';
import { loadFiles } from '@/utils/loadFiles';
import '@/styles/pages/index.scss';

export default (props) => {

  const gridMode = useStoreState(GridStore, store => store.mode);
  const gridItems = useStoreState(GridStore, store => store.items);
  const gridPage = useStoreState(GridStore, store => store.page);
  const startLoading = () => GlobalStore.update(store => { store.isLoading = true; });
  const stopLoading = () => GlobalStore.update(store => { store.isLoading = false; });

  const loadFlipnote = (src) => {
    startLoading();
    parseSource(src)
      .then(note => {
        PlayerStore.update(store => { store.src = src; store.note = note; });
        props.history.push('/view');
        stopLoading();
      }).catch(err => {
        stopLoading();
        GlobalStore.update(store => {
          store.hasError = true;
          store.errorType = 'FLIPNOTE_COULD_NOT_BE_LOADED',
          store.errorData = {
            flipnoteSrc: src
          };
        });
      })
  }

  const handleDrop = (files) => {
    if (files.length == 1) {
      loadFlipnote(files[0]);
    } else {
      startLoading();
      GridStore.update(store => { store.items = []; });
      loadFiles(files).then(items => {
        GridStore.update(store => { store.items = items; store.mode = 'UPLOADS'; store.page = 0; });
        stopLoading();
      });
    }
  }

  return (
    <Layout page="index">
      <div className="Section Section--side">
        <div className="Section__title">
          <h4 className="title">Upload</h4>
        </div>
        <div className="Section__body">
          <UploadPanel onLoadFiles={ handleDrop } onLoadSrc={ loadFlipnote }/>
        </div>
      </div>
      <div className="Section Section--main">
        <div className="Section__title">
          <h4 className="title">{ gridMode === 'SAMPLE' ? 'Sample Flipnotes' : 'Browse Uploads' }</h4>
          <div className="Section__actions">
            <Pagination 
              current={ gridPage }
              itemCount={ gridItems.length } 
              itemsPerPage={ 12 }
              onChange={ newPage => { GridStore.update(store => {store.page = newPage}) }}
            />
          </div>
        </div>
        <div className="Section__body">
          <FlipnoteGrid 
            items={ gridItems }
            page={ gridPage }
            onSelect={ loadFlipnote }
          />
        </div>
      </div>
    </Layout>
  );
}