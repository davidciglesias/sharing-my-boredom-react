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
import PostHolder from './../components/PostHolder';
import AddNewPostHeader from '../components/AddNewPostHeader';
import HomeHolder from './../components/HomeHolder';
import NewPostHolder from './../components/NewPostHolder';
import StyledNavLink from '../components/StyledNavLink';
import Grid from '@material-ui/core/Grid';
import StyledButtonBase from '../components/StyledButtonBase';
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
            loading: false
        }
    }

  componentDidMount = async () => {
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
  

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangePostFilter = (value) => {
    this.setState({
      filteredPostsTerm: value
    })
  }

  render() {
    const { classes } = this.props
    const { open, posts, loading, filteredPostsTerm } = this.state
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
                  <StyledButtonBase
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
                        <Grid item>
                          <Typography variant="h6" color="inherit" noWrap>
                            Sharing My Boredom  
                          </Typography>
                        </Grid>
                        <Grid item>
                          <HomeIcon/>
                        </Grid>
                      </Grid>
                    </StyledNavLink>
                  </StyledButtonBase>
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
                <AddNewPostHeader
                  theme={theme}
                  classes={classes}
                  onClick={() => this.handleDrawerClose()}
                />
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
                <Route path="/newPost" exact render={(routeProps) =>
                  (<NewPostHolder
                    routeProps={routeProps}
                    classes={classes}
                    theme={theme}
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