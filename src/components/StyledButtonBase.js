import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import styled from 'styled-components';


const StyledButtonBase = styled(ButtonBase)`
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props) => <StyledButtonBase {...props} />;