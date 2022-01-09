import styled from 'styled-components';
import { lighten } from 'polished';

import { palette } from '../../../util/constants';
import { media } from '../../../util/styled-helpers';

const { black, bone } = palette;

const StyledButton = styled.button`
    border-radius: 5px;
    background-color: ${lighten(0.2, black)};
    color: ${bone};
    font-size: 0.7rem;
    padding: 20px 7px;
    grid-column-start: span ${({span}) => span || "1"};
    overflow: hidden;

    &:active {
        background-color: ${lighten(0.3, black)};
    }

    ${media.up('md')} {
        font-size: 1.25rem;
        padding: 10px 7px;
    }
`;
const A01Key = ({label, onClick, span}) => {


    return (
        <StyledButton onClick={onClick} span={span}>
            {label}
        </StyledButton>
    );
}

export default A01Key;