import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface Icon {
  focused: boolean;
  color: string;
  size: number;
}

const Icon: React.FC<Icon> = ({focused, color, size}) => {
  return (
   <AntDesign name='home' size={size}/>
  );
};

export default Icon;
