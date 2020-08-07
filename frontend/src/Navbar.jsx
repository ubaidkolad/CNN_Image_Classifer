import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import Brightness7SharpIcon from '@material-ui/icons/Brightness7Sharp'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 12,
  },
}))

export default function ButtonAppBar(props) {
  const classes = useStyles()

  return (
    <div>
      <AppBar color={props.darkState ? 'dark' : 'primary'}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            LearnMachineLearning
          </Typography>
          {props.darkState ? (
            <IconButton
              onClick={props.handleThemeChange}
              className={classes.menuButton}
            >
              <Brightness7SharpIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={props.handleThemeChange}
              className={classes.menuButton}
            >
              <Brightness4Icon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
