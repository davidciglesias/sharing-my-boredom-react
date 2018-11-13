import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import CircularProgress from '@material-ui/core/CircularProgress';
import DefinedStyle from './../visual/DefinedStyle'
import FilterByTitle from '../components/FilterByTitle';
import PostList from '../components/PostList';
import { address } from './../settings/server'
import DefinedTheme from './../visual/DefinedTheme'
import DrawerHeader from './../components/DrawerHeader'
import { BrowserRouter as Router, Route } from "react-router-dom";
import io from 'socket.io-client'
import PostHolder from './../components/PostHolder';
import HeaderButton from '../components/HeaderButton';
import HomeHolder from './../components/HomeHolder';
import NewPostHolder from './../components/NewPostHolder';
import StyledNavLink from '../components/StyledNavLink';
import Grid from '@material-ui/core/Grid';
import EditPostHolder from './../components/EditPostHolder';
import NewUserHolder from '../components/NewUserHolder';
import LoginButtonDialog from '../components/LoginButtonDialog'

const API_URL = 'http://localhost:8080'
const socket = io(API_URL)

class App extends React.Component {
   constructor(props) {
        super(props)
        this.state = {
            open: true,
            currentPostId: -1,
            posts: [{"idpost": -1, "title": "loading"}],
            loadedPosts: [],
            filteredPostsTerm: "",
            currentPostContent: {
                title: "lol",
                content: "Click on a post on the left to load it!"
            },
            loading: false,
            user: {},
            disabled: ''
        }
    }

    updatePostList = async() => {
      this.setState({
        loading: true
      })
      await fetch(`${address}/getAllPosts`, {
          method: 'GET',
          headers: {
            'Accept': 'text/plain',
          }
      }).then((response) => {
          response.text().then((resultText) => {
              let result = JSON.parse(resultText)
              this.setState({
                  posts: result,
                  loading: false
              })
            }
          )
      }).catch(() => {
        this.setState({
          loading: false
        })
      })
    }

  componentDidMount = () => {
    this.updatePostList()
    socket.on('user', user => {
      this.popup.close()
      this.setState({user})
    })
  }
  

  handleDrawerOpen = () => {
    this.setState({ open: true })
  };

  handleDrawerClose = () => {
    this.setState({ open: false })
  };

  handleChangePostFilter = (value) => {
    this.setState({
      filteredPostsTerm: value
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup() {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    
    const url = `${API_URL}/google?socketId=${socket.id}`
    // const url = `${API_URL}/twitter?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  }  
  
  startAuth() {
    if (!this.state.disabled) {  
      this.popup = this.openPopup()  
      this.checkPopup()
      this.setState({disabled: 'disabled'})
    }
  }

  async handleLogout() {
    await fetch(`${address}/logout`, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
      }
    }).then(() => {
      this.setState({
          user: {},
      })
    }).catch(() => {
      this.setState({
        luser: {}
      })
    })
  }

  closeCard() {
    //this.setState({user: {}})
  }

  render() {
    const { classes } = this.props
    const { open, posts, loading, filteredPostsTerm, user, disabled } = this.state
    const { name, photo } = user
    const theme = DefinedTheme
    return (
      <>
        <Router>
          <MuiThemeProvider 
            theme={theme}>
            <div className={classes.root}>
              <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                  [classes.appBarShift]: open,
                })}
              >
                <Toolbar disableGutters={!open}>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon/>
                  </IconButton>
                  <div
                    color="inherit"
                    aria-label="Home"
                    className={classNames(classes.homeButton, classes.noTextTransform)}
                  >
                    <StyledNavLink 
                      to={{
                          pathname: `/`,
                      }} 
                      className={classNames(classes.homeButton, classes.verticalAlign)}  
                    >
                      <Grid 
                        container 
                        spacing={16}
                        alignItems={"center"}
                      >
                        <Grid item xs={6}>
                          <Typography variant="h6" color="inherit" noWrap>
                            Sharing My Boredom  
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <HomeIcon/>
                        </Grid>
                        <Grid item xs={2}>
                          <div className={'container'}>
                            {/* Show the user if it exists. Otherwise show the login button */}
                            {name
                              ? <div className={'card'}>              
                                  <img src={photo} alt={name} />
                                  <IconButton
                                    name={'times-circle'}
                                    className={'close'}
                                    onClick={() => this.handleLogout()}
                                  >
                                    <HomeIcon className={classNames(classes.homeButton)}/>
                                  </IconButton>
                                  <h4>{`@${name}`}</h4>
                                </div>
                              : <div className={'button'}>
                                  <button 
                                    onClick={() => this.startAuth()} 
                                    className={`twitter ${disabled}`}
                                  >
                                    <HomeIcon
                                      name={'twitter'}
                                    />
                                  </button>
                                </div>
                            }</div>
                        </Grid>
                        <Grid item xs={2}>
                          <LoginButtonDialog/>
                        </Grid>
                      </Grid>
                    </StyledNavLink>
                  </div>
                  <Typography variant="h6">
                      {loading ? <CircularProgress className={classNames(classes.progress)} color="secondary"/> : <></>}
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                <DrawerHeader
                  theme={theme}
                  classes={classes}
                  onClick={() => this.handleDrawerClose()}
                />
                <Divider />
                <HeaderButton
                  theme={theme}
                  classes={classes}
                  text={"Add a new post"}
                  route={"/postNewPost"}
                >
                  <AddIcon/>
                </HeaderButton>
                <Divider />
                <HeaderButton
                  theme={theme}
                  classes={classes}
                  text={"Add a new user"}
                  route={"/postNewUser"}
                >
                  <AddIcon/>
                </HeaderButton>
                <Divider />
                {loading 
                ? 
                <>
                  <CircularProgress></CircularProgress>
                </>
                :
                <>
                  <FilterByTitle 
                  classes={classes}
                  placeholder={"Filter by Title"}
                  onChange={(value) => this.handleChangePostFilter(value)}
                  />
                  <Divider /> 
                  <PostList
                    classes={classes}
                    filteredPostsTerm={filteredPostsTerm}
                    posts={posts}
                    theme={theme}
                  />
                </>
                }
              </Drawer>
              <main
                className={classNames(classes.content, {
                  [classes.contentShift]: open,
                })}
              >
                <div className={classes.drawerHeader} />
                <Route path="/post" exact render={(routeProps) =>
                  (<PostHolder
                    routeProps={routeProps}
                    classes={classes}
                    theme={theme}
                  />)}
                />
                <Route path="/" exact render={(routeProps) =>
                  (<HomeHolder
                    routeProps={routeProps}
                    classes={classes}
                    theme={theme}
                  />)}
                />
                <Route path="/postNewPost" exact render={(routeProps) =>
                  (<NewPostHolder
                    routeProps={routeProps}
                    classes={classes}
                    theme={theme}
                    updatePostList={() => this.updatePostList()}
                  />)}
                />
                <Route path="/putUpdatePost" render={(routeProps) =>
                  (<EditPostHolder
                    routeProps={routeProps}
                    classes={classes}
                    theme={theme}
                    updatePostList={() => this.updatePostList()}
                  />)}
                />
                <Route path="/postNewUser" render={(routeProps) =>
                  (<NewUserHolder
                    routeProps={routeProps}
                    classes={classes}
                    theme={theme}
                    updatePostList={() => this.updatePostList()}
                  />)}
                />
              </main>
            </div>
          </MuiThemeProvider>
        </Router>
      </>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(DefinedStyle, { withTheme: true })(App)