import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
  Avatar,
  Button, CssBaseline, Link as LinkMatui,
  Grid, Box,
  Typography, Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Copyright from '../CopyrightComponent/Copyright';
import CarMake from '../SignUpDropDownComponents/CarMake';
import CarModel from '../SignUpDropDownComponents/CarModel';
import CarColor from '../SignUpDropDownComponents/CarColor';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding: '15px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    marginTop: '10px'
  }
}));

export default function SignUpSecondary(props) {
  const classes = useStyles();
  let history = useHistory();
  const { user, updateUser } = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();
    if (user.car.car_make.length < 1 || user.car.car_model.length < 1 || user.car.car_color.length < 1) {
      alert(`What you whippin dawg? Don't leave us hangin...`);
      return
    }
    fetch("/signup", {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify({
        id: user.id,
        car: {
          car_make: user.car.car_make,
          car_model: user.car.car_model,
          car_color: user.car.car_color
        }
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        console.log("user response: ", res.successfulSignup);
        if (res.successfulSignup === true) {
          console.log('going to main');
          history.push("/main");
        } // if user creation is successful, redirect signup2
        else {
          console.log('going to signup')
          history.push("/signup"); // if user creation fails
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCarMakeChange = (e) => {
    updateUser({
      car: {
        car_color: '',
        car_model: '',
        car_make: e.target.value
      }
    });
  }
  const handleCarModelChange = (e) => {
    updateUser({
      car: {
        ...user.car,
        car_color: '',
        car_model: e.target.value
      }
    });
  }
  const handleCarColorChange = (e) => {
    updateUser({
      car: {
        ...user.car,
        car_color: e.target.value
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DriveEtaIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Car Details
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12}>
            <CarMake fullWidth handleChange={handleCarMakeChange} carMake={user.car.car_make} />
          </Grid>
          <Grid item xs={12}>
            <CarModel fullWidth handleChange={handleCarModelChange} carMake={user.car.car_make} carModel={user.car.car_model} />
          </Grid>
          <Grid item xs={12}>
            <CarColor fullWidth handleChange={handleCarColorChange} carColor={user.car.car_color} />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Let's Park!
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to={`/login`}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container >
  );
}
