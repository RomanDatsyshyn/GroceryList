import React, { Component } from 'react';
import './App.css';

import Item from './Components/Item';

export default class List extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      id: null,
      name: '',
      status: 1,
      priority: 1,
      isEdit: false,
      typeOfSorting: 2,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('items') !== undefined) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.sort(function (a, b) {
        return a.priority - b.priority;
      });

      this.setState({ data: items });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit() {
    const obj = {
      id: Math.random(),
      name: this.state.name,
      status: this.state.status,
      priority: this.state.priority,
      changes: Date.now(),
    };

    let arr = this.state.data;
    arr.push(obj);
    this.setState({ data: arr });

    localStorage.setItem('items', JSON.stringify(this.state.data));
  }

  deleteItem = (id) => {
    let arr = JSON.parse(localStorage.getItem('items'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
      }
    }

    this.setState({ data: arr });
    localStorage.setItem('items', JSON.stringify(arr));
  };

  editItem = ({ id, name, status, priority }) => {
    this.setState({
      id: id,
      name: name,
      status: status,
      priority: priority,
      isEdit: true,
    });
  };

  edit = () => {
    let arr = JSON.parse(localStorage.getItem('items'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === this.state.id) {
        arr[i].name = this.state.name;
        arr[i].priority = this.state.priority;
      }
    }

    this.setState({ data: arr, isEdit: false });
    localStorage.setItem('items', JSON.stringify(arr));
  };

  switchItem = (id) => {
    let arr = JSON.parse(localStorage.getItem('items'));

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr[i].status === 1 ? (arr[i].status = 0) : (arr[i].status = 1);
        arr[i].changes = Date.now();
      }
    }

    this.setState({ data: arr });
    localStorage.setItem('items', JSON.stringify(arr));
  };

  render() {
    const { data, isEdit, typeOfSorting } = this.state;

    let items;

    if (data.length > 0) {
      items = data.map((i) => {
        if (typeOfSorting === 2) {
          return (
            <Item
              key={Math.random()}
              data={i}
              delete={this.deleteItem}
              switch={this.switchItem}
              edit={this.editItem}
            />
          );
        } else if (i.status === 1 && typeOfSorting === 1) {
          return (
            <Item
              key={Math.random()}
              data={i}
              delete={this.deleteItem}
              switch={this.switchItem}
              edit={this.editItem}
            />
          );
        } else if (i.status !== 1 && typeOfSorting === 0) {
          return (
            <Item
              key={Math.random()}
              data={i}
              delete={this.deleteItem}
              switch={this.switchItem}
              edit={this.editItem}
            />
          );
        }
      });
    } else {
      items = null;
    }

    return (
      <div className='container'>
        <h1 className='title'>My Grocery List</h1>
        <div className='nav'>
          <form className='form'>
            <select
              name='priority'
              value={this.state.priority}
              onChange={this.onChange}
              style={{ width: isEdit ? '100%' : null }}
            >
              <option value='1'>1 Priority</option>
              <option value='2'>2 Priority</option>
              <option value='3'>3 Priority</option>
              <option value='4'>4 Priority</option>
              <option value='5'>5 Priority</option>
            </select>
            {!isEdit ? (
              <select
                name='status'
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value='1'>Available</option>
                <option value='0'>Not Available</option>
              </select>
            ) : null}
            <input
              type='text'
              value={this.state.name}
              onChange={this.onChange}
              name='name'
              placeholder='Enter the name of the product'
            />
            <button
              onClick={isEdit ? this.edit : this.onSubmit}
              className='actionButton'
            >
              {isEdit ? 'Edit product' : 'Add product'}
            </button>
          </form>
        </div>
        {data.length > 0 ? (
          <div className='sorted'>
            <button
              onClick={() => this.setState({ typeOfSorting: 2 })}
              className='sort__btn'
            >
              All
            </button>{' '}
            <button
              onClick={() => this.setState({ typeOfSorting: 1 })}
              className='sort__btn'
            >
              Available
            </button>
            <button
              onClick={() => this.setState({ typeOfSorting: 0 })}
              className='sort__btn'
            >
              Unavailable
            </button>
          </div>
        ) : null}
        <div className='block'>
          <div className='list'>{items}</div>
        </div>
      </div>
    );
  }
}
