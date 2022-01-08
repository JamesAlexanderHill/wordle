import { Routes, Route, Outlet, Link, useMatch, useResolvedPath } from "react-router-dom";
import styled, { css } from 'styled-components';

import T01WordOfTheDay from "./components/templates/T01WordOfTheDay";

import { palette } from './util/constants';

const { green, blue, bone, transparent } = palette;
const Header = styled.header`
    display: grid;
    text-align: center;

    > h1::first-letter {
        color: ${green};
        text-decoration: underline;
    }

    > nav > ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
        padding: 0px;
        margin: 0px;

        > li {
            text-align: center;
        }
    }
`;

const StyledLink = styled(({ isActive, ...props }) => <Link {...props} />)`
    color: ${bone};
    margin: 0px 5px;
    padding: 10px 15px;
    text-decoration: none;
    display:inline-block;
    border-bottom: solid 2px ${transparent};

    &:hover {
        color: ${green};
    }

    ${props => props.isActive && css`
        color: ${green};
        border-bottom: solid 2px ${green};
    `}
`;
const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
        <StyledLink
            to={to}
            isActive={match}
            {...props}
        >
            {children}
        </StyledLink>
    );
};

const Layout = () => (
  <div>
    <Header>
      <h1>Wordle</h1>
      <nav>
        <ul>
          <li>
            <CustomLink to="/instructions">Instructions</CustomLink>
          </li>
          <li>
            <CustomLink to="/">Word of the Day</CustomLink>
          </li>
          <li>
            <CustomLink to="/freemode">Freemode</CustomLink>
          </li>
          <li>
            <CustomLink to="/statistics">Statistics</CustomLink>
          </li>
        </ul>
      </nav>
    </Header>
    <main>
        <Outlet />
    </main>
  </div>
);
const P01WordOfTheDay = /* <T01WordOfTheDay  /> */ () => <div>Word of the Day</div>;
const P02Instructions = /* <T02Instructions  /> */ () => <div>Instructions</div>;
const P03Freemode = /* <T03Freemode /> */ () => <div>Freemode</div>;
const P04Statistics = /* <T04Statistics /> */ () => <div>Statistics</div>;

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<P01WordOfTheDay />} />
                    <Route path="instructions" element={<P02Instructions />} />
                    <Route path="freemode" element={<P03Freemode />} />
                    <Route path="statistics" element={<P04Statistics />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
