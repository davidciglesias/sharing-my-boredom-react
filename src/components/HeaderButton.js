import React from 'react'
import DefinedStyle from '../visual/DefinedStyle';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import StyledNavLink from './StyledNavLink'

class HeaderButton extends React.Component {
    render() {
        
        const { classes, text, route } = this.props
        let isTheItemActive = window.location.pathname === route
        return (
            <>
                <StyledNavLink 
                    to={{
                        pathname: route,
                    }} 
                    color="inherit"
                    className={classNames(classes.drawerHeader, classes.verticalAlign, isTheItemActive ? classNames(classes.navBarSelectedBackground) : {})}
                >
                    <Grid
                        container
                        spacing={24}
                        alignItems={"center"}
                        justify={"center"}
                        direction={"row"}
                    >
                        <Grid>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                            >
                            {text}
                            </Typography>
                        </Grid>
                        <Grid item>
                            {this.props.children}
                        </Grid>
                    </Grid>
                </StyledNavLink>
                
            </>
        )
    }
}

HeaderButton.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(DefinedStyle, {withTheme: true})(HeaderButton)