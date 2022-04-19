import styled from 'styled-components';
const TileContainer = styled.div`
  margin: 3px;
  border: 1px solid
    ${({ borderColor, isActive }) => (isActive ? 'white' : borderColor)};
  border-radius: 5px;
  color: ${({ color, isActive }) => (isActive ? 'white' : color)};
  background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
  font-family: 'Courier New', monospace;
  min-width: 30px;
  min-height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const palette = [
  {
    bg: 'gray',
    border: 'gray',
    text: 'white'
  },
  {
    bg: '#b59f3b',
    border: '#b59f3b',
    text: 'white'
  },
  {
    bg: '#538d4e',
    border: '#538d4e',
    text: 'white'
  }
];

const Tile = ({ isActive, letter, feedback }) => {
  const colourScheme =
    feedback != null && Number.isInteger(feedback)
      ? palette[feedback + 1]
      : {
          bg: 'transparent',
          border: 'gray',
          text: 'gray'
        };
  return (
    <TileContainer
      isActive={isActive}
      borderColor={colourScheme.border}
      color={colourScheme.text}
      backgroundColor={colourScheme.bg}
    >
      {letter}
    </TileContainer>
  );
};

export default Tile;
