import React from 'react';
import styled from 'styled-components';

const NodeContainer = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 16px;
    margin: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NodeHeader = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 8px;
`;

const NodeContent = styled.div`
    font-size: 1em;
`;

const Node = ({ title, children }) => {
    return (
        <NodeContainer>
            <NodeHeader>{title}</NodeHeader>
            <NodeContent>{children}</NodeContent>
        </NodeContainer>
    );
};

export default Node;