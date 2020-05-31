import React, { Component } from 'react';
import styled from 'styled-components';
import Tree from './Tree';

const StyledBrowser = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: block;  
`;

const StyledWrapper = styled.div`
  width: 250px;
`;

export default class Browser extends Component {
  state = {
    selectedFile: null,
  };

  onSelect = (file) => this.setState({ selectedFile: file });

  render() {
    const { selectedFile } = this.state;

    return (
      <StyledBrowser>
        <StyledWrapper>
          <Tree onSelect={this.onSelect} />
        </StyledWrapper>
        <h3>
          {selectedFile && selectedFile.type === 'file' && selectedFile.content}
        </h3>
      </StyledBrowser>
    )
  }
}