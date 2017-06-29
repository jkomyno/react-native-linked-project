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

const TripMonthSelection = ({
  dateMonth,
  dateReturnMonth,
  minDate,
  maxDate,
  updateDateMonth,
  updateDateReturnMonth,
  iconCalendar
}) => (
  <View>
    <View style={styles.departureContainer}>
      <Text style={styles.textValue}>Departure Month:</Text>
      <DatePicker
        style={{ width: 200 }}
        customStyles={datePickerCustomStyles}
        date={dateMonth}
        mode="date"
        placeholder="Select departure date"
        format="MMMM"
        minDate={minDate}
        maxDate={maxDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={iconCalendar}
        onDateChange={newDateMonth =>
          updateDateMonth(newDateMonth)
        }
      />
    </View>

    <View style={styles.returnContainer}>
      <Text style={styles.textValue}>Return Month:</Text>
      <DatePicker
        style={{ width: 200 }}
        customStyles={datePickerCustomStyles}
        date={dateReturnMonth}
        mode="date"
        placeholder="Select return date"
        format="MMMM"
        minDate={dateMonth}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        iconSource={iconCalendar}
        onDateChange={newDateReturnMonth =>
          updateDateReturnMonth(newDateReturnMonth)
        }
      />
    </View>
  </View>
);

TripMonthSelection.propTypes = {
    dateMonth: PropTypes.date.isRequired,
    dateReturnMonth: PropTypes.date.isRequired,
    minDate: PropTypes.date.isRequired,
    maxDate: PropTypes.date.isRequired,
    updateDateMonth: PropTypes.func.isRequired,
    updateDateReturnMonth: PropTypes.func.isRequired,
    iconCalendar: PropTypes.any.isRequired
};

export default TripMonthSelection;
