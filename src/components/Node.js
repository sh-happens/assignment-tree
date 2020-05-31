import React from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';
import styled from 'styled-components';
import { FaFile, FaFolder, FaFolderOpen, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const getPadding = (level, type) => {
  let paddingLeft = level * 10;
  if (type === 'file') paddingLeft += 10;
  return paddingLeft;
}

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 20px;
  color: grey;
  padding-left: ${props => getPadding(props.level, props.type)}px;
  &:hover {
    background: grey;
    color: white
  }
`;

const NodeIcon = styled.div`
  font-size: 20px;
  margin-right: ${props => props.marginRight ? props.marginRight : 5}px;
`;

const getLabel = (node) => last(node.path.split('/'));

const Node = (props) => {
  const { node, getChild, level, toggle, onNodeSelect } = props;

  return (
    <React.Fragment>
      <StyledWrapper level={level} type={node.type}>

        <NodeIcon onClick={() => toggle(node)}>
          {node.type === 'folder' && (node.isOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </NodeIcon>

        <NodeIcon marginRight={10}>
          {node.type === 'file' && <FaFile />}
          {node.type === 'folder' && node.isOpen === true && <FaFolderOpen />}
          {node.type === 'folder' && !node.isOpen && <FaFolder />}
        </NodeIcon>

        <span role='button' onClick={() => onNodeSelect(node)}>
          {getLabel(node)}
        </span>
      </StyledWrapper>

      {node.isOpen && getChild(node).map(childNode => (
        <Node
          {...props}
          node={childNode}
          level={level + 1}
        />
      ))
      }
    </React.Fragment >
  );
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
  getChild: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired,
}

Node.defaultProps = {
  level: 0,
}

export default Node;