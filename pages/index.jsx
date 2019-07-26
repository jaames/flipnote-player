import { useStoreState } from 'pullstate';
import { GridStore, PlayerStore } from '~/store';
import { parseSource } from 'flipnote.js';
import Layout from '~/components/Layout';
import FlipnoteGrid from '~/components/FlipnoteGrid';
import Pagination from '~/components/Pagination';
import Dropzone from '~/components/Dropzone';
import { loadFiles } from '~/utils/loadFiles';

import '~/assets/styles/pages/index.scss';
export default (props) => {

  const gridMode = useStoreState(GridStore, store => store.mode);
  const gridItems = useStoreState(GridStore, store => store.items);
  const gridPage = useStoreState(GridStore, store => store.page);

  const loadFlipnote = (src) => {
    parseSource(src)
      .then(note => {
        PlayerStore.update(store => { store.src = src; store.note = note; });
        props.history.push('/view');
      })
      .catch((e) => {
        console.log('error!')
      })
  }

  const handleDrop = (files) => {
    if (files.length == 1) {
      loadFlipnote(files[0]);
    } else {
      GridStore.update(store => { store.items = []; });
      loadFiles(files).then(items => {
        GridStore.update(store => { store.items = items; store.mode = 'UPLOADS' });
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
          <Dropzone onDrop={ handleDrop }/>
        </div>
      </div>
      <div className="Section Section--main">
        <div className="Section__title">
          <h4 className="title">{ gridMode === 'SAMPLE' ? 'Sample Flipnotes' : 'Browse Uploads' }</h4>
          <Pagination 
            current={ gridPage }
            itemCount={ gridItems.length } 
            itemsPerPage={ 12 }
            onChange={ newPage => { GridStore.update(store => {store.page = newPage}) }}
          />
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


// class Index extends Component {

//   loadFlipnote(src) {
//     this.props.dispatch({
//       type: 'PLAYER_LOAD_FLIPNOTE',
//       payload: {
//         src: src
//       }
//     });
//     this.
//   }

//   setPage(newPage) {
//     this.props.dispatch({
//       type: 'GRID_SET_PAGE', 
//       payload: {
//         page: newPage
//       }
//     });
//   }

//   onDrop(files) {
//     if (files.length == 1) {
//       this.loadFlipnote(files[0])
//     } 
//     else if (files.length > 1) {
//       this.props.dispatch({
//         type: 'GRID_SET_ITEMS', 
//         payload: {
//           items: []
//         }
//       });
//       loadFiles(files).then(items => {
//         this.props.dispatch({
//           type: 'GRID_SET_MODE', 
//           payload: {
//             mode: 'UPLOADS',
//             items: items
//           }
//         });
//       })
//     }
//   }

//   render() {
//     const {props, state} = this;

//     return (
//       <Layout page="index">
//         <div className="Section Section--side">
//           <div className="Section__title">
//             <h4 className="title">Upload</h4>
//           </div>
//           <div className="Section__body">
//             <Dropzone onDrop={accepted => this.onDrop(accepted)}/>
//           </div>
//         </div>
//         <div className="Section Section--main">
//           <div className="Section__title">
//             <h4 className="title">{ props.gridMode === 'SAMPLE' ? 'Sample Flipnotes' : 'Browse Folder' }</h4>
//             <Pagination 
//               current={props.gridPage}
//               itemCount={props.gridItems.length} 
//               itemsPerPage={12}
//               onChange={newPage => this.setPage(newPage) }
//             />
//           </div>
//           <div className="Section__body">
//             <FlipnoteGrid 
//               items={props.gridItems}
//               page={props.gridPage}
//               onSelect={src => this.loadFlipnote(src)}
//             />
//           </div>
//         </div>
//       </Layout>
//     );
//   }
// }

// export default connect(state=>state)(Index);