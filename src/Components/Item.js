import React, { Component } from 'react';

export default class Item extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: null,
    };

    this._handleChange = this._handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.data.status === 1 ? false : true });
  }

  _handleChange() {
    this.props.switch(this.props.data.id);
    this.setState({ isChecked: !this.state.isChecked });
  }

  convertToDateFormat = (time) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  };

  render() {
    const { id, priority, status, name, changes } = this.props.data;

    return (
      <div className='item'>
        <div className='item__header'>
          <div className='item__header__priority'>{priority}</div>
          <div className='item__actions'>
            <div
              className='item__header__status'
              style={{ color: status === 1 ? '#32b76c' : '#f26065' }}
            >
              {status === 1 ? 'Available' : 'Not available'}
            </div>
            <button
              onClick={() => this.props.edit(this.props.data)}
              className='item__edit'
            >
              <i className='fas fa-pencil-alt'></i>
            </button>
            <button
              onClick={() => this.props.delete(id)}
              className='item__delete'
            >
              <i className='fas fa-trash-alt'></i>
            </button>
          </div>
        </div>
        <div className='item__body'>
          <div className='item__body__name'>
            {name}
            <label>
              <input
                ref='switch'
                checked={this.state.isChecked}
                onChange={this._handleChange}
                className='switch'
                type='checkbox'
              />
              <div>
                <div></div>
              </div>
            </label>
          </div>
          <div className='item__body__date'>
            <span>last changes:</span>
            {this.convertToDateFormat(changes)}
          </div>
        </div>
      </div>
    );
  }
}
