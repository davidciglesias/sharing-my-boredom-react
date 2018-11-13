import React from 'react';
import {address} from './../settings/server'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import withTheme from '@material-ui/core/styles/withTheme';
import TextField from '@material-ui/core/TextField';

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
  
  class LoginButtonDialog extends React.Component {
    state = {
      open: false,
      loading: false,
      email: "",
      password: "",
      loggedIn: false
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    logout = () => {
      this.setState({ loggedIn: false, loading: false})
    }

    login = async (email, password, loggedIn) => {
      await fetch(`${address}/postLogin`, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password
        }),
        headers:{
          'Content-Type': 'application/json',
          'Charset': 'utf-8',
        }
      }).then((response) => {
        if(response.status === 200) {
          response.text().then((resultText) => {
              this.setState({
                loading: false,
                open: false,
                loggedIn: true
              })
          })
        } else{
          this.setState({
            loading: false
          })
        }
      })
    }

    handleAttempt = async () => {
      const {email, password, loggedIn} = this.state
      this.setState({
        loading: true
      })
      if(loggedIn) {
        this.logout()
      } else {
        this.login(email, password, loggedIn)
      }
    }

    handleChange = (name, value) => {
      this.setState({[name]: value})
    }
  
    render() {
      const {email, password, loggedIn} = this.state
      return (
        <div>
          <Button 
            onClick={this.handleClickOpen}
            color="secondary"
          >
            {loggedIn ? "Logout" : "Login"}
          </Button>
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Please input your email and password to log in"}
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={email}
                onChange={(event) => this.handleChange("email", event.target.value)}
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={(event) => this.handleChange("password", event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleAttempt} color="primary" disabled={email === "" || password === ""}>
                {loggedIn ? "Logout" : "Login"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
  
  export default withTheme()(LoginButtonDialog);