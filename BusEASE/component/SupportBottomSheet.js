import React, { useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const SupportBottomSheet = ({ sheetRef, closeSheet }) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={closeSheet}
      enableDismissOnClose={true}
    >
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Chat with EASE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>FAQS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#B9b9b9',
    borderRadius: 10,
    marginHorizontal: 10
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
});

export default SupportBottomSheet;
