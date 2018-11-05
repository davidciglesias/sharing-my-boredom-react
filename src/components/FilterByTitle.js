
import React from 'react'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import DefinedStyle from './../visual/DefinedStyle'
import { withStyles } from '@material-ui/core/styles'

class FilterByTitle extends React.Component {

    render() {
        const { classes, onChange, placeholder } = this.props
        return (
            <>
                <Grid container spacing={8} alignItems="center" className={classNames(classes.menuButton)}>
                    <Grid item>
                    <SearchIcon className={classNames(classes.verticalAlign)}/>
                    </Grid>
                    <Grid item>
                    <TextField
                        placeholder={placeholder}
                        margin="normal"
                        onChange={(event) => onChange(event.target.value)}
                    />
                    </Grid>
                </Grid>
            </>
        )
    }
}

FilterByTitle.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(DefinedStyle, { withTheme: true })(FilterByTitle)