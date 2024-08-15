import React, {useState, useEffect} from "react";
import axios from 'axios';
import api from "../../api/api";
import "./style.css"
import MainLayout from "./Layout";
import Input from "./Input";
import ControlledSlider from "../Slider/Slider";
import { Container, Box, Button, Slider, Grid, Typography } from "@mui/material";
import MuiInput from '@mui/material/Input';


class Generate extends React.Component{

  constructor() {
    super();
    this.state = {
      images: [],
      value: 4,
    };
  }


  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleInputChange= (event) => {
    this.setState({ value: event.target.value === '' ? 0: Number(event.target.value) });
  };

  handleBlur = () => {
    const { value } = this.state.value;
    if (value < 0) {
      this.setState({ value: 1 });
    } else if (value > 32) {
      this.setState({ value: 32 });
    }
  };

  onGenerateImage = async() => {
    try {
      const response = await api.post('/generate_image', {
        n_images: this.state.value
      });
      const data = response.data
      const base64Images = data.images.map(image => `data:image/jpeg;base64,${image}`)
      
      this.setState({
        images: base64Images
      });

      } catch (error) {
        console.log(error)
      }

  };


  render(){
    return (
      <MainLayout>
          <Typography>
            <h1>Generate Images</h1>
          </Typography>
        <Box sx={{ width: 100 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof this.state.value === 'number' ? this.state.value : 0}
                  onChange={this.handleSliderChange}
                  aria-labelledby="input-slider"
                  max={32}
                  min={1}
                />
              </Grid>
              <Grid item>
                <Input
                  value={this.state.value}
                  size="small"
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
              </Grid>
            </Grid>
          </Box>
          <Button variant="contained" type="submit" onClick={this.onGenerateImage}>Generate</Button>
          <div className="image-grid">
          {this.state.images.map((src, index) => (
            <img style={{width:32, height:32}} key={index} src={src} alt={`Dynamic Image ${index}`} />
          ))}
        </div>
      </MainLayout>
    );
  }
}


export default Generate;