import { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '~/components/Layout';
import FlipnotePlayer from '~/components/FlipnotePlayer';
import FlipnoteDetails from '~/components/FlipnoteDetails';

import '~/assets/styles/pages/view.scss';

class View extends Component {

  componentDidMount() {
    if (!this.props.playerSrc) {
      this.props.history.push('/')
    }
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