import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import DefinedStyle from '../visual/DefinedStyle';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import StyledNavLink from './../components/StyledNavLink'

class AddNewPostHeader extends React.Component {
    render() {
        const { classes } = this.props
        let isTheItemActive = window.location.pathname === '/newPost'
        return (
            <>

                <StyledNavLink 
                    to={{
                        pathname: `/newPost`,
                    }} 
                    color="inherit"
                    className={classNames(classes.drawerHeader, classes.verticalAlign, isTheItemActive ? classNames(classes.navBarSelectedBackground) : {})}
                >
                    <Grid
                        container
                        alignItems={"center"}
                        justify={"center"}
                        direction={"row"}
                    >
                        <Grid item>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                            >
                                Contribute here
                            </Typography>
                        </Grid>
                        <Grid item>
                            <AddIcon/>
                        </Grid>
                    </Grid>
                </StyledNavLink>
                
            </>
        )
    }
}

AddNewPostHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(DefinedStyle, {withTheme: true})(AddNewPostHeader)