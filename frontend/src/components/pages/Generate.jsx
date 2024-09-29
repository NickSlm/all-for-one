import React, {useState, useEffect} from "react";
import api from "../../api/api";
import MainLayout from "./Layout";
import { Box, Button, Slider, Grid, Typography, ButtonGroup, ImageList, ImageListItem } from "@mui/material";
import {styled} from "@mui/material/styles"
import MuiInput from "@mui/material/Input"
import hasJWT from "../../api/JWT";
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import DoneIcon from '@mui/icons-material/Done'


const Input = styled(MuiInput)`
width: 42px;
`;

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

class Generate extends React.Component{

  constructor() {
    super();
    this.state = {
      images: [],
      value: 4,
      selectedImages: [],
    };
  }


  handleSliderChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  handleInputChange= (event) => {
    this.setState({ value: event.target.value === '' ? 0: Number(event.target.value) });
  };

  handleBlur = () => {
    const {value} = this.state.value;
    if (this.state.value < 0) {
      this.setState({ value: 1 });
    } else if (this.state.value > 32) {
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

  handleAddImage = (event) => {
    this.state.selectedImages.indexOf(event.target.src) === -1 ? this.state.selectedImages.push(event.target.src) : console.log("this Item already in")
    console.log(this.state.selectedImages)
  }


  render(){
    return (
      <MainLayout>
          <Box
            sx={{
              maxWidth: 400,
              mx: 'auto',
              marginTop: 8,
              boxShadow: 3,
              padding: 2,
            }}
          >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
              <Typography variant="a">Number of Images:</Typography>
            </Grid>

            <Grid item xs={4} display="flex" justifyContent="center" alignItems="center">
              <Slider
                value={typeof this.state.value === 'number' ? this.state.value : 0}
                onChange={this.handleSliderChange}
                min={1}
                max={32}
              />
            </Grid>

            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
              <Input
                value={this.state.value}
                size="small"
                onChange={this.handleInputChange}
                onBlur={this.handleBlur}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: 32,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Grid>

            <Grid item display="flex" justifyContent="center">
              <ImageList sx={{ margin: 'auto' }} cols={8} rowHeight={32}>
                {this.state.images.map((src, index) => (
                  <ImageListItem key={src}>
                    <Box
                      component="img"
                      key={index}
                      src={src}
                      loading="lazy"
                      sx={{
                        transition: 'opacity 0.3s ease', '&:hover':{cursor:'pointer',
                          opacity:0.7
                        }
                      }}
                      onMouseDown={this.handleAddImage}
                      />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
            <Button variant="outlined" onClick={this.onGenerateImage}>
              Generate
            </Button>
            <ButtonGroup variant="outlined" aria-label="Loading button group">
                  <Button variant="outlined" startIcon={<FileDownloadIcon/>} >Download</Button>
                  {hasJWT() && <Button variant="outlined">Save</Button>}
            </ButtonGroup>
          </Box>
          </Box>
      </MainLayout>
    );
  }
}


export default Generate;