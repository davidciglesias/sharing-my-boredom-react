import React from 'react'
import {address} from '../settings/server'
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import marked from 'marked'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';

class EditPostHolder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      postId: -1,
      loading: true,
      markdownText: "",
      normalText: "",
      title: "",
      originalContent: {}
    }
  }

  requestPreviousContent = async (postId) => {
    this.setState({
      loading: true,
      postId: postId
    })
    await fetch(`${address}/getPostById?id=${postId}`, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        }
    }).then((response) => {
        response.text().then((resultText) => {
            let result = JSON.parse(resultText)
            this.setState({
                title: result.title,
                originalContent: result,
                markdownText: result.content,
                normalText: marked(result.content),
                loading: false,
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
    let postId = parseInt(queryString.parse(this.props.routeProps.location.search).postId)
    this.requestPreviousContent(postId)
  }

  handleTextChange = (event) => {
    this.setState({
      markdownText: event.target.value,
      normalText: marked(event.target.value)
    })
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

  handleEditPost = async () => {
    this.setState({
      loading:  true
    })
    await fetch(`${address}/putUpdatePost`, {
      method: 'PUT',
      body: JSON.stringify({
        postId: this.state.postId,
        title: this.state.title.length > 0 ? this.state.title : this.state.originalContent.title,
        content: this.state.markdownText.length > 0 ? this.state.markdownText : this.state.originalContent.markdownText
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.setState({
          loading: false,
      })
    }).catch(() => {
      this.setState({
        loading: false
      })
    })
    this.props.updatePostList()
  }

  handleResetPost = () => {
    this.setState((state) => {
      return {
        title: state.originalContent.title,
        markdownText: state.originalContent.content,
        normalText: marked(state.originalContent.content)
      }
    })
  }

  render() {
    const {classes} = this.props
    const {loading, markdownText, normalText, title, postId, originalContent } = this.state
    return (
      <>  
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            {!loading ? 
            <> 
              <p>
                {`Editing post ${postId} - Previous title: ${originalContent.title}`}
              </p>
              <TextField
                    id="post-title"
                    label="Title"
                    className={classes.textField}
                    value={title}
                    onChange={(event) => this.handleTitleChange(event)}
                    margin="normal"
                    variant={"outlined"}
                    style={{width: "100%"}}
                  />
              <Grid 
                container
                spacing={8}
                direction={"row"}
                justify={"space-around"}>
                <Grid item xs={6}>
                  <TextField
                    id="post-content"
                    placeholder="Markdown Post"
                    className={classes.textField}
                    value={markdownText}
                    onChange={(event) => this.handleTextChange(event)}
                    margin="normal"
                    multiline
                    rows={10}
                    rowsMax={100}
                    variant={"outlined"}
                    style={{width: "100%"}}
                  />
                </Grid>
                <Grid item xs={6}
                style={{margin: "0px", paddingTop: "18.5px", paddingBottom: "18.5px", height: "87%"}}
                >
                  <Paper
                    style={{    borderStyle: "solid",
                        borderWidth: "1px",
                        borderColor: "rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        pointerEvents: "none", 
                        width: "100%", 
                        paddingTop: "18.5px", 
                        paddingBottom: "18.5px", 
                        minHeight: "190px",
                        backgroundColor: "#e1e1e1"}}
                    elevation={0}
                  >
                    <div 
                      style={{ 
                        marginTop: "0px" ,
                        marginBottom: "0px",
                        marginLeft: "18px",
                        marginRight: "18px"
                      }}
                      dangerouslySetInnerHTML={{__html: normalText}}></div>
                  </Paper>
                </Grid>
              </Grid>
              <Button
                disabled={loading || title.length === 0 || markdownText.length === 0}
                variant={"outlined"}
                onClick={() => this.handleEditPost()}
              >
                Edit Post
              </Button>
              <Button
                disabled={loading}
                variant={"outlined"}
                onClick={() => this.handleResetPost()}
              >
                Reset Post
              </Button>
            </>
            : <CircularProgress/>}
          </FormControl>
        </form>
      </>
      )
    }
}

export default EditPostHolder