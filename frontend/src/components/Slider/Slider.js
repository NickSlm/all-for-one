import React from "react";
import styled from "styled-components";
import { Slider, Rail, Handles, Tracks} from "react-compound-slider";
import SliderHandle from "./Slider.Handle";
import SliderTrack from "./Slider.Track";



class ControlledSlider extends React.Component {

    state = {
        values: [this.props.defaultValue],
        update: [this.props.defaultValue]
    };

    onUpdate = update => {
        this.setState({ update });
        this.props.onUpdate && this.props.onUpdate(update[0]);
    };

    onChange = values => {
        this.setState({ values });
        this.props.onChange && this.props.onChange(values[0]);
    };

    onStart = values => {
        this.setState({ values });
        this.props.onSliderStart && this.props.onSliderStart(values[0]);
    };

    static getDerivedStateFromProps(props, state) {
        if (props.defaultValue !== state.values[0]){
            return {
                values: [props.defaultValue]
            };
        }
        return null;
    }

    render() {
        const { values } = this.state;
        const { min, max, step, onFocus, onBlur, ...restProps} = this.props;
        return (
            <Container>
                <StyledSlider
                    mode={1}
                    step={step}
                    domain={[min, max]}
                    onUpdate={this.onUpdate}
                    onChange={this.onChange}
                    onSliderStart={this.onSliderStart}
                    values={values}
                    {...restProps}
                >
                    <Rail>
                        {({ getRailProps }) => <StyledRail {...getRailProps()}/>}
                    </Rail>
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <SliderHandle
                                        key={handle.id}
                                        handle={handle}
                                        domain={[this.props.min, this.props.max]}
                                        getHandleProps={getHandleProps}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Tracks right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div>
                                {tracks.map(({ id, source, target })=> (
                                    <SliderTrack
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Tracks>
                </StyledSlider>
            </Container>
        );
    }
}

const Container = styled.div`
  height: 24px;
  padding-top: 12px;
  width: 100%;
`;


const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
`;

const StyledRail = styled.div`
  position: absolute;
  width: 100%;
  height: 14px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #cbcbcb;
`;
export default ControlledSlider;
