import React, { Component } from "react";
import './History.css';

import Message from "../Message/Message";

export default class History extends Component {
  render() {
    const { style } = this.props;
    return (
      <div style={ style } id="History__container">
        <div id="History__messagesParentContainer">
          <div id="History__messagesChildContainer">

          </div>
        </div>
      </div>
    )
  }
}