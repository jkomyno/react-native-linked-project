/**
* @providesModule skydreamer/utils/scaling
*/

/* eslint-disable */

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get(`window`);

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseHeight = 680;

const verticalScale = size => height / guidelineBaseHeight * size;

class Scaling {
    newStylesheet(stylesheet) {
        const obj = {};
        for (var key in stylesheet) {
            const item = stylesheet[key];
            if (typeof item === `object`) {
                if (Array.isArray(item)) {
                    obj[key] = [];
                    for (let i = 0; i < item.length; i++) {
                        if (!isNaN(item[i])) {
                            obj[key][i] = item[i];
                        } else {
                            obj[key][i] = item[i];
                        }
                    }
                } else {
                    obj[key] = this.newStylesheet(item);
                }
            } else if (!isNaN(item)) {
                if (key === `flex`) obj[key] = item;
                else if (key === `lineHeight`) obj[key] = Math.floor(item);
                else obj[key] = verticalScale(item);
            } else {
                if (key === `width` || key === `height`
                    || key === `marginLeft`
                    || key === `marginRight`
                    || key === `marginTop`
                    || key === `marginBottom`) {
                    const last = item.substring(item.length - 1);
                    const value = item.substring(0, item.length - 1);
                    const numb = Number(value);
                    if(last === `w`) {
                        obj[key] = (numb / 100) * width;
                    } else if(last === `h`) {
                        obj[key] = (numb / 100) * height;
                    } else {
                        obj[key] = item;
                    }
                } else {
                    obj[key] = item;
                }
            }
        }
        return obj;
    }

    vertical(number) { return verticalScale(number); }
}

export default new Scaling();
