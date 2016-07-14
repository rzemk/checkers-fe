/* eslint-disable jsx-quotes, react/prop-types, max-len, no-underscore-dangle */

import React from 'react';
import Seat from './Seat';

class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = { total: props.section.total, seats: props.section.seats };
    this.purchase = this.purchase.bind(this);
  }

  purchase(event) {
    if (event.currentTarget.getAttribute('class') === 'taken') return;
    const seatid = event.currentTarget.getAttribute('data-id');
    const sectid = this.props.section._id;
    const body = JSON.stringify({ sectid });

    fetch(`//localhost:3333/seats/${seatid}/purchase`, { method: 'put', body, headers: { 'Content-Type': 'application/json' } })
    .then(r => r.json())
    .then((r) => {
      const seat = this.state.seats.find(s => s._id === r.seat._id);
      seat.isPurchased = true;
      this.setState({ total: r.section.total, seats: this.state.seats });
    });
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-xs-12'>
            <h1>{this.props.section.type}</h1>
            <h3>${this.state.total}</h3>
            {this.state.seats.map(s => <Seat key={s._id} seat={s} purchase={this.purchase} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
