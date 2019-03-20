import styled from 'styled-components';

export const DualRangeSliderSection = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  margin: 10px 0;
`;

export const RangeValue = styled.div`
  flex: 1;
  text-align: ${({ textAlign = 'left' }) => textAlign};
`;

export const SliderLineContainer = styled.div`
  margin: 15px 0;
`;

export const SliderLineWrapper = styled.div`
  padding: 10px;
`;

export const SliderLine = styled.div`
  width: 100%;
  margin: 0 auto;
  height: ${props => props.height};
  background: #dfe0e3;
  position: relative;
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
  width: 12px;
  height: 12px;
  transform: ${({ scale = 1 }) => `scale(${scale})`};
  background: #00bcd5;
  border-radius: 50%;
  box-shadow: -1px 0 2px #cfcfcf;
  @media (max-width: 400px) {
    top: ${({ top }) => top};
    width: ${({ diameter }) => diameter};
    height: ${({ diameter }) => diameter};
  }
`;

export const LeftSliderIcon = styled(SliderIcon)`
  left: ${({ left }) => left};
`;

export const RightSliderIcon = styled(SliderIcon)`
  ${({ positionFrom, positionAt }) => `${positionFrom}: ${positionAt}`}
`;