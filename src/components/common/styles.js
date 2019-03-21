import styled from 'styled-components';

export const ResponsiveWidth = styled.div`
  width: ${({ width }) => width};
  margin: ${({ margin = '0 auto' }) => margin};
  @media (max-width: 400px) {
    width: 90%;
  }
`;

export const TopSpace = styled.div`
  margin-top: ${({ space }) => space};
`;

export const Label = styled.label``;
