import { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Layout from '~/components/Layout';
import FlipnotePlayer from '~/components/FlipnotePlayer';
import FlipnoteDetails from '~/components/FlipnoteDetails';

import '~/assets/styles/pages/view.scss';

class View extends Component {

  static async getInitialProps({ store, res}) {
    const state = store.getState();
    if (!state.playerSrc) {
      if (res) {
        res.writeHead(302, {
          Location: '/'
        });
        res.end();
      } else {
        Router.push('/')
      }
    }
    return {};
  }

  render() {
    const {props, state} = this;
    return (
      <Layout page="view">
        <div className="Section Section--main">
          <div className="Section__body">
            <FlipnotePlayer src={props.playerSrc}/>
          </div>
        </div>
        <div className="Section Section--side">
          <div className="Section__title">
            { props.playerAuthor && <h4 className="title">Flipnote By { props.playerAuthor }</h4> }
          </div>
          <div className="Section__body">
            <FlipnoteDetails/>
          </div>
        </div>
      </Layout>
    );
  }

}

export default connect(state => state)(View);