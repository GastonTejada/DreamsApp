import React, { useState } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import InputForm from "../components/InputForm";
import { colors } from '../constants/colors';

const DatePickerInput = ({ label, onChange, value }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDateSelect = (selectedDate) => {
    const formattedDate = formatDate(selectedDate.dateString);
    onChange(formattedDate); // Envía la fecha formateada al componente padre
    setShowCalendar(false); // Cierra el modal
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <InputForm
          label={label}
          value={value} // Usa el valor pasado desde el componente padre
          editable={false} // Evita que el usuario escriba manualmente
        />
      </TouchableOpacity>

      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{
                [value]: { selected: true, selectedColor: colors.primary },
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContainer: {
    width: "90%",
    backgroundColor: colors.gray4,
    borderRadius: 10,
    padding: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.darkDreams,
    fontWeight: "bold",
  },
});

export default DatePickerInput;