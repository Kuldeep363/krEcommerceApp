import { View, Text } from 'react-native'
import React from 'react'
import GradientButton from './GradientButton'

interface PrimaryGradientButton{
    text:string,
    onPress:()=>void
}

const PrimaryGradientButton:React.FC<PrimaryGradientButton> = ({text,onPress}) => {
  return (
    <GradientButton text={text} onPress={onPress} colors={["#5C64AE","#333866"]} />
  )
}

export default PrimaryGradientButton