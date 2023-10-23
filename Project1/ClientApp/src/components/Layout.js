import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render(FormHandler) {
    return (
      <div>
        <NavMenu clickHandler={FormHandler} />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
