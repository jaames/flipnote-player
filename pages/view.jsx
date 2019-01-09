import { Component } from 'react';
import { connect } from "react-redux";
import Layout from '~/components/Layout';

class View extends Component {

  render() {
    const {props, state} = this;

    console.log(props, state);

    return (
      <Layout>
        <div className="Section Section--main">
          <div className="Section__body">
            player { props.name }
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

export default connect(state => state)(View);