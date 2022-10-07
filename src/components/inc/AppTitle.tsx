import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components';
import { bounce, fadeIn, slideInUp } from 'react-animations';
import { UserContext } from '../../UserContext';


const animation = keyframes`${slideInUp}`;

export const AnimDiv = styled.div`
  animation: 1s ${animation};
`;




function AppTitle(item: {title: string}) {

  const {data, setData} = useContext(UserContext)
  return (
    <>
        <AnimDiv>
            <h2 style={{color: data.color}}>{item.title}</h2>
        </AnimDiv>
        
    </>
  )
}

export default AppTitle