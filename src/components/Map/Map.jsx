import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
// import {mapStyles} from "./mapStyles";
import makeStyles from "./style";
const Map = ({ setCoordinates, setBounds, coordinates, places,setChildClicked,weatherData }) => {
  const classes = makeStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        
          // styles: mapStyles
        
        options={{ disableDefaultUI: true , zoomControl: true }}
        onChange={(e) => {
          // console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {setChildClicked(child)}}
      >
        {places?.map((place, index) => (
          <div
            key={index}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  gutterBottom
                  className={classes.typography}
                  variant="subtitle2"
                >
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                  className={classes.pointer}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
        {
          weatherData?.list?.map((weather,index)=> (
            <div
              key={index}
              lat={weather.coord.lat}
              lng={weather.coord.lon}
              >
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} height="70px" alt={weather.name} />

              </div>
          )
          )
        }
      </GoogleMapReact>
    </div>
  );
};

export default Map;
