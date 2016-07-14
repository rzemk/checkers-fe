/* eslint-disable jsx-quotes, react/prop-types */

import React from 'react';

class SectionCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { types: [] };
  }

  componentDidMount() {
    fetch('//localhost:3333/sections/types')
    .then(r => r.json())
    .then(j => {
      this.setState({ types: j.types.sections });
    });
  }

  render() {
    return (
      <div>
        <h1>Section Creator</h1>
        <form>
          <div className='form-group'>
            <label>Quantity</label>
            <input className='form-control' ref='quantity' type='text' />
          </div>
          <div className='form-group'>
            <label>Amount</label>
            <input className='form-control' ref='amount' type='text' />
          </div>
          <div className='form-group'>
            <label>Type</label>
            <select className='form-control' ref='type'>
              {this.state.types.map((t, i) => <option key={i}>{t}</option>)}
            </select>
          </div>
          <button className='btn btn-primary' onClick={this.props.create}>Create</button>
        </form>
      </div>
    );
  }
}

export default SectionCreator;
