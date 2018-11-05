import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostHolder from './../components/PostHolder'
import DefinedStyle from './../visual/DefinedStyle'
import FilterByTitle from '../components/FilterByTitle';
import PostList from '../components/PostList';

class PersistentDrawerLeft extends React.Component {
  
   constructor(props) {
        super(props)
        this.state = {
            open: true,
            currentPostId: -1,
            posts: [{"idpost": -1, "title": "loading"}],
            allPosts: [],
            filteredPostsTerm: "",
            currentPostContent: {
                content: "Click on a post on the left to load it!"
            },
            loading: false
        }
        this.handleClickOnItem = this.handleClickOnItem.bind(this)
    }

  componentDidMount = async () => {
    this.setState({
      loading: true
    })
    await fetch('http://localhost:2005/getAllPosts', {
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

  handleClickOnStatus = async (type) => {
    this.setState({
      loading: true
    })
    await fetch(`http://localhost:2005/putUpdate?id=${this.state.currentPostId}&column=${type}&change=1`, {
      method: 'PUT'
    }).then(() => {
      this.setState((state) => {
        var temp = state.currentPostContent
        temp[type]++
        return {
          loading: false,
          currentPostContent: temp
        }
      })
    }).catch(() => {
      this.setState({
        loading: false
      })
    })
  }

  handleChangePostFilter = (value) => {
    this.setState({
      filteredPostsTerm: value
    })
  }

  handleClickOnItem = async (idpost) => {
    this.setState({
        loading: true
    })
    if(!this.state.allPosts.map((post) => post.idpost).includes(idpost)) {
            await fetch(`http://localhost:2005/getPostById?id=${idpost}`, {
            method: 'GET',
            headers: {
            'Accept': 'text/plain',
            }
        }).then((response) => {
            response.text().then((resultText) => {
                let result = JSON.parse(resultText)
                this.setState((state) => {
                    return {
                        currentPostId: idpost,
                        currentPostContent: result,
                        allPosts: [...state.allPosts,{"idpost": idpost, "content": result}],
                        loading: false 
                    }
                })
            }
            )
        })
    }
    else {
        let currPost = this.state.allPosts.filter((post) => post.idpost === idpost)[0]
        this.setState({
            currentPostId: currPost.idpost,
            currentPostContent: currPost.content,
            loading: false
        })
    }
  }

  render() {
    const { classes, theme } = this.props;
    const { open, posts, currentPostContent, loading, filteredPostsTerm } = this.state;

    return (
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
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Sharing My Boredom  
            </Typography>
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
          <div className={classes.drawerHeader}>
            These are lovely posts
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
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
              onClick={(item) => this.handleClickOnItem(item)}
            />
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        <div className={classes.drawerHeader} />
          <PostHolder
            classes={classes}
            theme={theme}
            currentPostContent={currentPostContent}
            onStatusClick={(label) => this.handleClickOnStatus(label)}
          />
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(DefinedStyle, { withTheme: true })(PersistentDrawerLeft);
