// @flow

import React from "react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

type AutoTableProps = {
  headers: Array<string>,
  list: Array<Object>
};

export default class AutoTable
  extends React.Component<void, AutoTableProps, void> {
  rowClick(e: Event, data: Object) {
    if (typeof this.props.onRowClick === "function") {
      this.props.onRowClick(e, data);
    }
  }
  renderHeaders(headers: Array<string>) {
    return headers.map((str, index) => {
      return (
        <Table.HeaderCell key={index}>{str.toUpperCase()}</Table.HeaderCell>
      );
    });
  }
  renderRows(headers: Array<string>, list: Array<Object>) {
    let rows = list.map((item, i) => {
      let cells = headers.map((header, index) => {
        let cell = <Table.Cell key={index}>{item[header]}</Table.Cell>;
        return cell;
      });
      return (
        <Table.Row onClick={e => this.rowClick(e, item)} key={i}>{cells}</Table.Row>
      );
    });
    return rows;
  }
  render() {
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            {this.renderHeaders(this.props.headers)}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.renderRows(this.props.headers, this.props.list)}
        </Table.Body>
      </Table>
    );
  }
}
