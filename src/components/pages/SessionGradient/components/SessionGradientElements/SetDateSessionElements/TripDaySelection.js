import React, { PropTypes } from 'react';
import {
  View,
  Text
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Scaling from 'skydreamer/utils/scaling';

const styles = Scaling.newStylesheet({
    departureContainer: {
        marginLeft: 25
    },
    returnContainer: {
        marginLeft: 25,
        marginBottom: 25
    },
    textValue: {
        color: `#FFF`,
        marginTop: 25,
        marginRight: 25,
        marginLeft: 5,
        fontSize: 18,
        fontFamily: `NotoSans-Regular`,
        justifyContent: `flex-start`
    }
});

const datePickerCustomStyles = {
    dateIcon: {
        width: 40
    },
    dateText: {
        color: `#fff`,
        fontSize: 25,
        textAlign: `left`
    },
    dateInput: {
        borderWidth: 0
    }
};

const TripDaySelection = ({
  date,
  dateReturn,
  minDate,
  maxDate,
  updateDate,
  updateDateReturn,
  iconCalendar
}) => (
  <View>
    <View style={styles.departureContainer}>
      <Text style={styles.textValue}>Departure Day:</Text>
      <DatePicker
        style={{ width: 200 }}
        customStyles={datePickerCustomStyles}
        date={date}
        mode="date"
        placeholder="Select departure date"
        format="DD/MM/YYYY"
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={iconCalendar}
        onDateChange={newDate =>
          updateDate(newDate)
        }
      />
    </View>

    <View style={styles.returnContainer}>
      <Text style={styles.textValue}>Return Day:</Text>
      <DatePicker
        style={{ width: 200 }}
        customStyles={datePickerCustomStyles}
        date={dateReturn}
        mode="date"
        placeholder="Select return date"
        format="DD/MM/YYYY"
        minDate={date}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={iconCalendar}
        onDateChange={newDateReturn =>
          updateDateReturn(newDateReturn)
        }
      />
    </View>
  </View>
);

TripDaySelection.propTypes = {
    date: PropTypes.date.isRequired,
    dateReturn: PropTypes.date.isRequired,
    minDate: PropTypes.date.isRequired,
    maxDate: PropTypes.date.isRequired,
    updateDate: PropTypes.func.isRequired,
    updateDateReturn: PropTypes.func.isRequired,
    iconCalendar: PropTypes.any.isRequired
};

export default TripDaySelection;
