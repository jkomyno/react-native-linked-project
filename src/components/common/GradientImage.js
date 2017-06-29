import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, {
    LinearGradient,
    Image,
    Rect,
    Defs,
    Stop
} from 'react-native-svg';

const window = Dimensions.get(`window`);

export default class GradientImage extends React.Component {
    render() {
        var { height, width, source, startColor, endColor, style } = this.props;
        if(height === `max`) height = window.height;
        if(width === `max`) width = window.width;
        return (
            <View style={style}>
                <Svg height={height} width={width}>
                    <Defs>
                        <LinearGradient id="gradientText" x1="50%" y1="0" x2="0" y2="50%">
                            <Stop offset="0" stopColor={startColor} stopOpacity="3" />
                            <Stop offset="1" stopColor={endColor} stopOpacity="3" />
                        </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradientText)" />
                    <Image width="100%" height="100%" opacity="0.3" href={source} />
                </Svg>
            </View>
        );
    }
}
