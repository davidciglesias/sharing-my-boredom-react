import React from 'react'
import TitleHolder from './TitleHolder';
import ContentHolder from './ContentHolder';
import AuthorDateHolder from './AuthorDateHolder';
import SmileyHolder from './SmileyHolder';
import { address } from './../settings/server'
import queryString from 'query-string'
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from 'react-router-dom/Link';

class PostHolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadedPosts: [],
      currentPostContent: {
        title: "Loading..."
      },
      loading: true,
      loadingStates: {
        happy: false,
        angry: false,
        sad: false,
        surprised: false
      }
    }
  }  

  componentDidMount = () => {
    this.obtainPostData(this.props, this.state)
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.routeProps.location.search !== this.props.routeProps.location.search) {
      this.obtainPostData(this.props, this.state)
    }
  }

  obtainPostData = async (props, state) => {
    const { routeProps } = props
    const { loadedPosts } = state
    let idpost = parseInt(queryString.parse(routeProps.location.search).id)
    if(idpost === undefined || isNaN(idpost)) {
      this.setState({
        currentPostContent: {
          title: "Wrong post"
        },
        loading: false
      })
    }
    else {
      this.setState({
        currentPostContent: {
          title: "Loading post...!"
        },
        loading: true
      })
      if(!loadedPosts.map((post) => post.id).includes(idpost)) {
              await fetch(`${address}/getPostById?id=${idpost}`, {
              method: 'GET',
              headers: {
              'Accept': 'text/plain',
              }
          }).then((response) => {
            if(response.status !== 404) {
              response.text().then((resultText) => {
                  let result = JSON.parse(resultText)
                  let idContent = {
                    id: idpost,
                    content: result
                  }
                  this.setState((state) => {
                      return {
                          loadedPosts: [...state.loadedPosts, idContent],
                          currentPostId: idContent.id,
                          currentPostContent: idContent.content,
                          loading: false
                      }
                  })
              }
              )
            } else {
              this.setState({
                    currentPostId: idpost,
                    currentPostContent: {
                      title: "Not found"
                    },
                    loading: false
              })
            }
          })
      } else {
        let currPost = loadedPosts.filter((post) => post.id === idpost)[0]
        this.setState({
            currentPostId: currPost.id,
            currentPostContent: currPost.content,
            loading: false
        })
      }
    }
  }  

  handleClickOnStatus = async (type) => {
    this.setState({
      loadingStates: {
        [type]: true
      } 
    })
    await fetch(`${address}/putUpdateStatus?id=${queryString.parse(window.location.search).id}&column=${type}&change=1`, {
      method: 'PUT'
    }).then(() => {
      this.setState((state) => {
        var temp = state.currentPostContent
        temp[type]++
        return {
          currentPostContent: temp,
          loadingStates: {
            [type]: false
          } 
        }
      })
    }).catch(() => {
      this.setState({
        loadingStates: {
          [type]: false
        } 
      })
    })
  }
  
  render() {
    const { classes, theme } = this.props
    const { currentPostContent, currentPostId, loading, loadingStates } = this.state

    return (
      <>  
        <div>{loading ? <LinearProgress/> : <span></span>}</div>
        <TitleHolder title={currentPostContent.title}/>
        <ContentHolder content={currentPostContent.content}/>
        <AuthorDateHolder
          classes={classes}
          theme={theme}
          fullname={currentPostContent.fullname}
          email={currentPostContent.email}
          creationDate={currentPostContent.creationDate}
        />
        <SmileyHolder 
          happy={currentPostContent.happy}
          sad={currentPostContent.sad}
          angry={currentPostContent.angry}
          surprised={currentPostContent.surprised}
          onClick={(label) => this.handleClickOnStatus(label)}
          loadingState={loadingStates}
        />
        <Link
            to={{
              pathname: `/putUpdatePost`,
              search: `?postId=${currentPostId}`
            }} 
          >
          Edit
        </Link>
      </>
      )
    }
}

export default PostHolder