import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import styled from 'styled-components';


const StyledButtonBase = styled(ButtonBase)`
    padding: "10px";

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props) => <StyledButtonBase {...props} />;