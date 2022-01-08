import styled from "styled-components";

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: auto minmax(300px, 25%)
`;

const T01WordOfTheDay = ({inputs, keyboard}) => {

    return (
        <Wrapper>
            {inputs}
            {keyboard}
        </Wrapper>
    );
}

export default T01WordOfTheDay;