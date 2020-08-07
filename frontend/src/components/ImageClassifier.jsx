import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  input: {
    display: 'none',
  },
  buttons: {
    margin: theme.spacing(2),
  },
}))

const ImageClassifier = (props) => {
  const [image, setImage] = useState()
  const [uploaded, setUploaded] = useState(false)
  const [response, setResponse] = useState()

  var loadFile = function (event) {
    setUploaded(true)
    setImage(event.target.files[0])
    var reader = new FileReader()
    reader.onload = function () {
      var output = document.getElementById('output')
      output.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const sendFile = () => {
    let formdata = new FormData()
    console.log(image)
    formdata.append('image', image)
    console.log(formdata)
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/predict',
      data: formdata,
      headers: { 'Content-Type': 'application/json' },
    })
      .then(function (response) {
        setResponse(response.data.message)
        console.log(response.data.message)
      })
      .catch(function (response) {
        console.log(response)
      })
  }

  const classes = useStyles()
  return (
    <div>
      <CssBaseline />
      <Container justify="center" fixed>
        <Typography
          component="div"
          style={{ height: '100vh', paddingTop: '6rem' }}
        >
          <Box
            color={props.darkState ? 'info.white' : 'info.main'}
            textAlign="center"
            fontSize={60}
            fontWeight={1}
            m={1}
          >
            Image Classifier
          </Box>
          <Typography>
            <Box
              fontWeight="fontWeightBold"
              color={props.darkState ? 'info.white' : 'info.main'}
              textAlign="center"
            >
              Upload an image to classify whether it is a cat or a dog.
              <br />
              <br />
              <br />
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={loadFile}
              />
              {image ? (
                <img
                  height="300px"
                  alt="no preview"
                  width="auto"
                  style={{ border: '0px' }}
                  id="output"
                />
              ) : (
                <center>No Preview Available</center>
              )}
              <br />
              {uploaded ? (
                response ? (
                  <center>
                    <h4 color={props.darkState ? 'info.white' : 'info.main'}>
                      {response}
                    </h4>
                  </center>
                ) : (
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color={props.darkState ? 'info.white' : 'primary'}
                    component="span"
                    onClick={sendFile}
                  >
                    Classify
                  </Button>
                )
              ) : (
                <label htmlFor="contained-button-file">
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    color={props.darkState ? 'info.white' : 'primary'}
                    component="span"
                  >
                    Upload
                  </Button>
                </label>
              )}
            </Box>
          </Typography>
        </Typography>
      </Container>
    </div>
  )
}

export default ImageClassifier
