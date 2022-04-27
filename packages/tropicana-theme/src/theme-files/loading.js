import React from "react"
import { styled, keyframes } from "frontity"

const Loading = () => <Spinner />

export default Loading

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Spinner = styled.div`
  border: 12px solid #FFF6DA;
  border-top: 12px solid #F3791C;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 2s linear infinite;
  position: relative;
  left: 50%;
  top: 0px;
  margin: 200px 0;
  margin-left: -40px;
`
