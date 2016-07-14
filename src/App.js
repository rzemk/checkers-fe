/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */

import React from 'react';
import SectionCreator from './SectionCreator';
import Section from './Section';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sections: [] };
    this.create = this.create.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    fetch('//localhost:3333/sections')
    .then(r => r.json())
    .then(j => {
      this.setState({ sections: j.sections });
    });
  }

  create(e) {
    const quantity = this.refs.section.refs.quantity.value;
    const amount = this.refs.section.refs.amount.value;
    const type = this.refs.section.refs.type.value;
    const body = JSON.stringify({ quantity, amount, type });

    fetch('//localhost:3333/sections', { method: 'post', body, headers: { 'Content-Type': 'application/json' } })
    .then(r => r.json())
    .then(() => this.refresh());

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-4'>
            <SectionCreator ref='section' create={this.create} />
          </div>
          <div className='col-xs-8'>
          </div>
        </div>
        {this.state.sections.map(s => <Section key={s._id} section={s} />)}
      </div>
    );
  }
}

export default App;
