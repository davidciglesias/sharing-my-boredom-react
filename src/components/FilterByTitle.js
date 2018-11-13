
import React from 'react'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import DefinedStyle from './../visual/DefinedStyle'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

class FilterByTitle extends React.Component {

    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.closeButton = React.createRef()
    }

    focusPostFilter = (input) => {
        input.current.focus()
    }
    
    deletePostFilter = (event, input, onChange) => {
        event.preventDefault()
        event.stopPropagation()
        input.current.value = ""
        onChange("")
    }

    render() {
        const { classes, onChange, placeholder } = this.props
        return (
            <>
                <Grid 
                    direction="row"
                    container
                    spacing={8}
                    justify="space-evenly"
                    onClick={() => this.focusPostFilter(this.textInput)}
                    className={classNames(classes.drawerHeader)}
                >
                    <Grid item xs={2}>
                        <SearchIcon className={classNames(classes.verticalAlign)}/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            placeholder={placeholder}
                            onChange={(event) => { onChange(event.target.value)}}
                            inputRef={this.textInput}
                            className={classNames(classes.verticalAlign)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            color={"inherit"}
                            onClick={(event) => this.deletePostFilter(event, this.textInput, onChange)}
                            buttonRef={this.closeButton}
                        >
                            <CloseIcon className={classNames(classes.verticalAlign)}/>
                        </IconButton>
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