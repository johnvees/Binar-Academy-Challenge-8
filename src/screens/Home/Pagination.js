import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from '../../components';
import {usePagination, DOTS} from './usePagination';
import Feather from 'react-native-vector-icons/Feather';
import {ms} from 'react-native-size-matters';
import {colors} from '../../utils';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

//   if (currentPage === 0 || paginationRange.length < 2) {
//     return null;
//   }

  const onNext = () => {
    if (currentPage < 1 ) {
      onPageChange(currentPage + 1);
    }
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage < 1) {
      onPageChange(currentPage + 1);
    }
    onPageChange(currentPage - 1);
  };

  //   let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={onPrevious}>
        <Feather name="chevron-left" size={ms(24)} color={colors.black} />
      </TouchableOpacity>
      <Text>{currentPage}</Text>
      <TouchableOpacity onPress={onNext}>
        <Feather name="chevron-right" size={ms(24)} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
