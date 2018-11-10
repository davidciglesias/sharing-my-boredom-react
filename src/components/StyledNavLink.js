import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const StyledNavLink = styled(NavLink)`
    color: black;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props) => <StyledNavLink {...props} />;