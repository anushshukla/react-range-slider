import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  margin-top: 15px;
`;

export const RangeValue = styled.div`
  flex: 1;
  text-align: left;
`;

export const SliderLine = styled.div`
  width: 300px;
  height: 2px;
  background: #dfe0e3;
  position: relative;
  margin-top: 15px;
`;

export const SelectedSliderLine = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.left};
  width: ${props => props.width};
  height: 2px;
  background: #00bcd5;
`;

export const SliderIcon = styled.div`
  position: absolute;
  top: -5px;
  left: ${props => props.left};
  height: 12px;
  width: 12px;
  background: #00bcd5;
  border-radius: 50%;
`;