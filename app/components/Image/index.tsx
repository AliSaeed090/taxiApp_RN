import PropTypes from "prop-types";
import React from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
export type props = {
  style?: object;
  resizeMode?: string ;
};
const Image = (props : props) => {
  const { style, resizeMode, ...rest } = props;
 
  const getMode = () => {
    let resize :any  = FastImage.resizeMode.cover;
    switch (resizeMode) {
      case "contain":
        resize = FastImage.resizeMode.contain;
        break;
      case "stretch":
        resize = FastImage.resizeMode.stretch;
        break;
      case "center":
        resize = FastImage.resizeMode.center;
        break;
      default:
        break;
    }
    return resize;
  };
  return (
    <FastImage
      style={StyleSheet.flatten([style && style])}
      // {...rest}
      
      resizeMode={getMode()}
    />
  );
};

Image.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  source:PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number ]),
};

// Image.defaultProps = {
//   style: {},
//   resizeMode: "cover",
// };

export default Image;
