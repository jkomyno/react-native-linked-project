import React from 'react';
import { View } from 'react-native';
import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop
} from 'react-native-svg';

export default class GradientText extends React.Component {
    render() {
        const { text, size, fontWeight, startColor, endColor, style } = this.props;
        const width = text.length * ( size * 0.57142 );
        return (
            <View style={[style, { justifyContent: `center` }]}>
                <Svg height={size} width={width}>
                    <Defs>
                        <LinearGradient id="gradientText" x1="0" y1="0" x2={width} y2="0">
                            <Stop offset="0" stopColor={startColor} stopOpacity="1" />
                            <Stop offset="1" stopColor={endColor} stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Text fontSize={size} fill="url(#gradientText)" fontWeight={fontWeight}>{text}</Text>
                </Svg>
            </View>
        );
    }
}
