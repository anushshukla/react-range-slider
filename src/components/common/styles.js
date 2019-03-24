import styled, { keyframes } from 'styled-components';

export const ResponsiveWidth = styled.div`
  width: ${({ width }) => width};
  margin: ${({ margin = '0 auto' }) => margin};
  @media (max-width: 400px) {
    width: 95%;
  }
`;

export const Font = styled.div`
  font-size: ${({ size }) => size};
`;

export const TopSpace = styled.div`
  margin-top: ${({ space }) => space};
`;

export const Relative = styled.div`
  position: relative;
`;

export const Absolute = styled.div`
  position: absolute;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
`;

export const RippleElement = styled.div`
  position: relative;
`;

const rippleAnimation = keyframes`
  0% {
    transform: scale(1);
  } 
  100% {
    opacity: 0;
    transform: scale(var(--scale));
  }
`;

export const Ripple = styled.div`
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  background-color: ${({ color }) => color};
  --scale: ${({ scale }) => scale};
  width: 2px;
  height: 2px;
  position: absolute;
  border-radius: 50%;
  animation: ${rippleAnimation} ${({ time = '0.5s' }) => time} ease-out;
`;

export const Wrapper = styled.div`
  box-shadow: ${({ withBoxShadow }) =>
    withBoxShadow &&
    '16px 0 16px rgba(0, 0, 0, 0.24), 0 0 16px rgba(0, 0, 0, 0.6)'};
  box-shadow: ${({ boxShadow }) => boxShadow};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  min-height: ${({ minHeight }) => minHeight};
  max-height: ${({ maxHeight }) => maxHeight};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  padding-left: ${({ paddingLeft }) => paddingLeft};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ boldness }) => boldness};
  display: ${({ display }) => display};
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex }) => flex};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  text-align: ${({ textAlign }) => textAlign};
  justify-content: ${({ justifyContent }) => justifyContent};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  bottom: ${({ bottom }) => bottom};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  box-sizing: ${({ boxSizing }) => boxSizing};
  background: ${({ background }) => background};
  overflow: ${({ overflow }) => overflow};
  cursor: ${({ cursor }) => cursor};
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  -webkit-overflow-scrolling: ${({ smoothScroll }) => smoothScroll && 'touch'};
`;

export const FlexWrap = styled(Wrapper)`
  display: flex;
`;

export const Label = styled.label``;

export const TooltipQuestionMark = styled.span`
  border-radius: 50%;
  width: 17.75px;
  height: 17.75px;
  border: 1.25px solid rgba(177, 179, 185, 0.7);
  background-color: ${({ isActive }) => (isActive ? '#b1b3b9' : '#ffffff')};
  display: flex;
  &:after {
    content: '?';
    width: 19px;
    height: 19.5px;
    display: flex;
    font-weight: 500;
    color: ${({ isActive }) => (isActive ? '#ffffff' : '#b1b3b9')};
    justify-content: center;
    transform: scale(0.75, 0.75);
    align-items: center;
    font-size: 16px;
  }
`;
