import styled from 'styled-components';

export const DualRangeSliderSection = styled.div`
  width: 502px;
  margin: 0 auto;
  @media (max-width: 400px) {
    width: 100%;
  }
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
  padding: 10px;
  margin: 15px 0;
`;

export const SliderLine = styled.div`
  height: ${props => props.height};
  background: #dfe0e3;
  position: relative;
`;

export const SelectedSliderLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width = '100%' }) => width};
  height: 2px;
  background: #00bcd5;
  transition: all 0.25s ease;
  transform: translate(${({ translate }) => translate});
`;

export const SliderIcon = styled.div`
  position: absolute;
  top: -5px;
  width: 12px;
  height: 12px;
  background: #00bcd5;
  border-radius: 50%;
  box-shadow: -1px 0 2px #cfcfcf;
  @media (max-width: 400px) {
    top: ${({ top }) => top};
    width: ${({ diameter }) => diameter};
    height: ${({ diameter }) => diameter};
  }
  transition: all 0.25s ease;
  transform: translate(${({ translate }) => translate})
    scale(${({ scale = 1 }) => scale});
  ${({ positionFrom, positionAt }) => `${positionFrom}: ${positionAt}`}
`;

export const LeftSliderIcon = styled(SliderIcon)`
  right: 0;
`;

export const RightSliderIcon = styled(SliderIcon)`
  left: 0;
`;
