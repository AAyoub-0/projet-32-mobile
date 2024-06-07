import { DimensionValue, View } from "react-native";

type Props = {
    margin?: number;
    marginTop?: DimensionValue;
    marginBottom?: DimensionValue;
    width?: DimensionValue;
    height?: DimensionValue;
    backgroundColor: string;
    rounded: boolean;
    orientation?: 'horizontal' | 'vertical';
    align?: 'center' | 'flex-start' | 'flex-end';
    translateX?: number;
}

const Line: React.FC<Props> = ({ margin, marginBottom, marginTop, 
    width, height, backgroundColor, 
    rounded, orientation = 'horizontal', 
    align = 'flex-start', translateX = 0 }) => {
    return (
        <View style={{
            marginVertical: orientation === 'horizontal' ? margin : 0,
            marginHorizontal: orientation === 'horizontal' ? 0 : margin, 
            width: orientation === 'horizontal' ? width : 2, 
            height: orientation === 'horizontal' ? 2 : height,
            backgroundColor: backgroundColor,
            borderRadius: rounded ? 3 : 0,
            alignSelf: align,
            marginTop: marginTop,
            marginBottom: marginBottom,
            transform: [{ translateX: translateX }]
         }} />
    )
}
export default Line;