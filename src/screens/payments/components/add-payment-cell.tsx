import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, Pressable, Text } from 'native-base';
import React, { useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CardWithShadow from '@/ui/components/CardWithShadow';

import type { CardPayment } from '../add-card-payment';

type Props = {
  onAddCard?: (card: CardPayment) => void;
  cardInfo?: CardPayment;
};

const AddpaymentCell = ({ onAddCard, cardInfo }: Props) => {
  const nav = useNavigation();
  const addPayentMethod = useCallback(() => {
    nav.navigate('AddCardPayment', {
      card: cardInfo,
      onAddCard: (card: CardPayment) => {
        onAddCard && onAddCard(card);
      },
    });
  }, [cardInfo, nav, onAddCard]);
  return (
    <CardWithShadow>
      <Pressable onPress={addPayentMethod}>
        <HStack p={3} justifyContent={'space-between'} alignItems={'center'}>
          <Text>Add A New Payment Method</Text>
          <Icon
            as={MaterialCommunityIcons}
            name={'plus-circle'}
            size={'lg'}
            color={'amber.300'}
          />
        </HStack>
      </Pressable>
    </CardWithShadow>
  );
};

export default AddpaymentCell;
