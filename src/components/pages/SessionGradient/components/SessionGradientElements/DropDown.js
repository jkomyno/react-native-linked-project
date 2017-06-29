import React, { PropTypes } from 'react';
import {
  Picker
} from 'react-native';

const DropDown = ({ selectedValue, onValueChange, options }) => (
  <Picker
    mode="dropdown"
    selectedValue={selectedValue}
    onValueChange={(itemValue, itemPosition) => {
        onValueChange(itemValue, itemPosition);
    }}
  >
    {
      options.map((item, i) => (
        <Picker.Item
          key={i}
          style={styles.picker}
          label={item.label}
          value={item.value}
        />
      ))
    }
  </Picker>
);

const styles = {
    picker: {
        color: `#ffffff`,
        fontSize: 78,
        width: 200,
        fontFamily: `Poppins-Light`
    }
};

DropDown.propTypes = {
    selectedValue: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })).isRequired
};

export default DropDown;
