import React, { Component } from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';

import Node from './Node';
import data from './Data'

export default class Tree extends Component {
  state = {
    nodes: data,
  };

  getRoot = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  }

  getChild = (node) => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  }

  toggle = (node) => {
    const { nodes } = this.state;
    nodes[node.path].isOpen = !node.isOpen
    this.setState({ nodes });
  }

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  }

  render() {
    const root = this.getRoot();
    return (
      <div>
        {root.map(node => (
          <Node
            node={node}
            getChild={this.getChild}
            toggle={this.toggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    )
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired,
};