import React from 'react';
import styled from 'styled-components';


const StyledMenuDiv = styled.div`
    height: 5vh !important;
    width: 100% !important;

    &:focus, &:hover, &:visited, &:link, &:active {
        height: 5vh !important;
        width: 100% !important;
    }
`;

export default (props) => <StyledMenuDiv {...props} />;