import { Component } from 'react';
import Layout from '../components/Layout';

export default class View extends Component {

  render() {
    const {props, state} = this;

    return (
      <Layout>
        <div className="Section Section--main">
          <div className="Section__body">
            player
          </div>
        </div>
        <div className="Section Section--side">
          <div className="Section__title">
            <h4 className="title">Title</h4>
          </div>
          <div className="Section__body">
            details
          </div>
        </div>
      </Layout>
    );
  }

}