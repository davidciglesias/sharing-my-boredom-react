import React from 'react'
import {address} from './../settings/server'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import marked from 'marked'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class NewPostHolder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      authors: [],
      currentAuthorId: -1,
      markdownText: "",
      normalText: "",
      title: ""
    }
  }

  requestAuthors = async () => {
    this.setState({
      loading: true
    })
    await fetch(`${address}/getAllAuthors`, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        }
    }).then((response) => {
        response.text().then((resultText) => {
            let result = JSON.parse(resultText)
            this.setState({
                authors: result,
                currentAuthorId: result.length > 0 ? result[0].iduser : -1,
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
    this.requestAuthors()
  }

  handleAuthorChange = (event) => {
    this.setState({
      currentAuthorId: event.target.value
    })
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

  handleSubmitNewPost = async () => {
    this.setState({
      loading:  true
    })
    await fetch(`${address}/postNewPost`, {
      method: 'POST',
      body: JSON.stringify({
        idauthor: this.state.currentAuthorId,
        title: this.state.title,
        content: this.state.markdownText
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
    this.props.updatePostList()
  }

  render() {
    const {classes} = this.props
    const {loading, authors, currentAuthorId, markdownText, normalText, title } = this.state
    return (
      <>  
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            {!loading ? 
            <> 
              <InputLabel htmlFor="author-simple">Author</InputLabel>
              <Select
                value={currentAuthorId}
                onChange={(event) => this.handleAuthorChange(event)}
                inputProps={{
                  name: 'author',
                  id: 'author-simple',
                }}
              >
                {authors.map((author, index) => {
                  return (
                    <MenuItem key={index} value={author.iduser}>
                      {author.fullname}
                    </MenuItem>
                  )})
                }
              </Select>
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
                disabled={loading || currentAuthorId === -1 || markdownText.length === 0}
                variant={"outlined"}
                onClick={() => this.handleSubmitNewPost()}
              >
                Submit new post
              </Button>
            </>
            : <CircularProgress/>}
          </FormControl>
        </form>
      </>
      )
    }
}

export default NewPostHolder