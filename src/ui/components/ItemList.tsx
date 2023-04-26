import { Icon, Pressable, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors, { black } from '../theme/colors';

type Props = {
  title: String;
  isIconShow?: Boolean;
  selection?: Boolean;
  isMultiSelection?: Boolean;
  index: number;
  selections?: number[];
  setSelection?: (
    selectedIndex: number,
    isSelected: Boolean,
    isMultiSelection: Boolean
  ) => void;
};
const ItemList = ({
  isIconShow = false,
  title,
  selection,
  index,
  selections = [],
  isMultiSelection,
  setSelection,
}: Props) => {
  const { t } = useTranslation();
  console.log();
  return (
    <Pressable>
      <View
        justifyContent={'space-between'}
        flexDirection={'row'}
        alignItems={'center'}
        borderBottomColor={'gray.100'}
        borderBottomWidth={1}
        py={3}
      >
        <Text>{title}</Text>
        {isIconShow && !selection && (
          <Icon
            as={MaterialIcons}
            name={'keyboard-arrow-right'}
            size={8}
            color={black}
          />
        )}
        {selection && (
          <Pressable
            onPress={() => {
              if (isMultiSelection) {
                if (selections.filter((x) => x === index).length > 0) {
                  setSelection && setSelection(index, false, true);
                } else {
                  setSelection && setSelection(index, true, true);
                }
              } else {
                setSelection && setSelection(index, true, false);
              }
            }}
          >
            <Icon
              as={MaterialIcons}
              name={
                !isMultiSelection
                  ? selections.filter((x) => x === index).length > 0
                    ? 'radio-button-on'
                    : 'radio-button-off'
                  : selections.filter((x) => x === index).length > 0
                  ? 'check-box'
                  : 'check-box-outline-blank'
              }
              size={6}
              color={colors.button_color}
            />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default ItemList;
