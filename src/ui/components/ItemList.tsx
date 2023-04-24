import { Icon, Pressable, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { black } from '../theme/colors';

type Props = {
  title: String;
  isIconShow?: Boolean;
};
const ItemList = ({ isIconShow = false, title }: Props) => {
  const { t } = useTranslation();

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
        {isIconShow && (
          <Icon
            as={MaterialIcons}
            name={'keyboard-arrow-right'}
            size={8}
            color={black}
          />
        )}
      </View>
    </Pressable>
  );
};

export default ItemList;
