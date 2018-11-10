import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DefinedStyle from './../visual/DefinedStyle';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

class DrawerHeader extends React.Component {
    render() {
        const { classes, theme, onClick } = this.props
        return (
            <>
              <div className={classNames(classes.drawerHeader)}>
                <Typography>
                    These are lovely posts
                </Typography>
                <IconButton onClick={onClick}>
                  {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
              </div>
            </>
        )
    }
}

DrawerHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(DefinedStyle, {withTheme: true})(DrawerHeader)