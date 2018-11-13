import React from 'react'
import {address} from '../settings/server'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Checkbox, FormControlLabel } from '@material-ui/core';

class NewUserHolder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      userName: "",
      password: "",
      email: "",
      isAuthor: false
    }
  }

  componentDidMount = () => {
    this.setState({
      loading: false
    })
  }

  handleAuthorChange = (event) => {
    this.setState({
      isAuthor: event.target.value
    })
  }

  handleUserNameChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
    console.log(this.state)
  }

  handleSubmitNewUser = async () => {
    this.setState({
      loading:  true
    })
    console.log(JSON.stringify({
      username: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      isauthor: `"${this.state.isAuthor}"`
    }))
    await fetch(`${address}/postNewUser`, {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        isauthor: this.state.isAuthor
      }),
      headers:{
        'Content-Type': 'application/json',
        'Charset': 'utf-8',
      }
    }).then(() => {
      this.setState({
          loading: false,
          title: "",
          normalText: "",
          markdownText: ""
      })
    }).catch(() => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const {classes} = this.props
    const {loading, isAuthor, userName, email, password } = this.state
    console.log(this.state)
    return (
      <>  
        <form className={classes.root} autoComplete="off">
          <FormControl 
            className={classes.formControl}
          >
            {!loading ? 
            <> 
              <TextField
                id="user-fullName"
                label="Full Name"
                className={classes.textField}
                value={userName}
                onChange={(event) => this.handleChange("userName", event.target.value)}
                margin="normal"
                variant={"outlined"}
                style={{width: "100%"}}
              />
              <TextField
                id="user-email"
                label="Email"
                className={classes.textField}
                value={email}
                onChange={(event) => this.handleChange("email", event.target.value)}
                margin="normal"
                variant={"outlined"}
                style={{width: "100%"}}
               />
              <TextField
                id="user-password"
                type="password"
                label="Password"
                className={classes.textField}
                value={password}
                onChange={(event) => this.handleChange("password", event.target.value)}
                margin="normal"
                variant={"outlined"}
                style={{width: "100%"}}
              />  
              <FormControlLabel
                style={{width: "100%"}}
                control={<Checkbox
                  id="user-isAuthor"
                  checked={isAuthor}
                  onChange={(event) => this.handleChange("isAuthor", event.target.checked)}
                />  
                }
                label="Author"
              />
              <Button
                disabled={loading || userName === "" || password === "" || email === ""}
                variant={"outlined"}
                onClick={() => this.handleSubmitNewUser()}
              >
                Add new user
              </Button>
            </>
            : <CircularProgress/>}
          </FormControl>
        </form>
      </>
      )
    }
}

export default NewUserHolder