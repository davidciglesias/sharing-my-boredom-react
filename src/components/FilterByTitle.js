
import React from 'react'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import DefinedStyle from './../visual/DefinedStyle'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import ButtonBase from '@material-ui/core/ButtonBase';

class FilterByTitle extends React.Component {

    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.focusPostFilter = this.focusPostFilter.bind(this)
    }

    focusPostFilter = (input) => {
        input.current.focus()
    };

    render() {
        const { classes, onChange, placeholder } = this.props
        return (
            <>
            <ButtonBase
                onClick={() => this.focusPostFilter(this.textInput)}>
                    <Grid 
                        container 
                        spacing={8} 
                        alignItems="center" 
                        className={classNames(classes.menuButton)}
                        
                    >
                        <Grid item xs={2}>
                            <SearchIcon className={classNames(classes.verticalAlign)}/>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                placeholder={placeholder}
                                margin="normal"
                                onChange={(event) => onChange(event.target.value)}
                                fullWidth
                                inputRef={this.textInput}
                            />
                        </Grid>
                    </Grid>
                </ButtonBase>
            </>
        )
    }
}

FilterByTitle.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(DefinedStyle, { withTheme: true })(FilterByTitle)