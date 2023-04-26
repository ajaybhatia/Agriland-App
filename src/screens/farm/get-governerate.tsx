import { FlashList } from '@shopify/flash-list';
import { Button, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiGovernorateGetGovernorates } from '@/apis/endpoints/api';
import type { GovernorateResponse } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import Header from '@/ui/components/Header';
import ItemList from '@/ui/components/ItemList';
import colors from '@/ui/theme/colors';

type Props = {
  onGovernerateSelect?: (governorate: GovernorateResponse[]) => void;
};

const GetGovernerate = ({ onGovernerateSelect }: Props) => {
  const { t } = useTranslation();
  const [selections, setSelection] = useState<number[]>([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  const [governateResponse, setGovernateResponse] = useState<
    GovernorateResponse[]
  >([]);

  // Api

  const governateApi = useGetApiGovernorateGetGovernorates(
    {
      skip: moreInfo.skip,
      take: moreInfo.take,
    },
    {
      query: {
        onSuccess: (data: GovernorateResponse[]) => {
          if (data.length > 0) {
            setGovernateResponse([...governateResponse, ...data]);
          }
        },
      },
    }
  );

  function handleSubmit() {
    if (onGovernerateSelect && selections.length > 0) {
      var selectedGovernorate = selections.map((v) => {
        return governateResponse.filter((x, index) => index === v)[0];
      });
      onGovernerateSelect(selectedGovernorate);
    }
  }

  return (
    <View style={styles.fullscreen}>
      <View mx={8} flex={1}>
        <Header
          title={'Select Governerate'}
          iconName={'close'}
          mt={3}
          mb={3}
          ml={0}
          as={MaterialIcons}
        />
        <FlashList
          extraData={selections}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={governateResponse}
          renderItem={({
            item,
            index,
          }: {
            item: GovernorateResponse;
            index: number;
          }) => {
            console.log('selections ==> ', selections);
            return (
              <ItemList
                title={`${item.name}`}
                index={index}
                isMultiSelection={false}
                selection={true}
                selections={selections}
                setSelection={(
                  selectedIndex: number,
                  isSelected: Boolean,
                  isMultiSelection: Boolean
                ) => {
                  if (isMultiSelection) {
                    if (isSelected) {
                      setSelection([...selections, selectedIndex]);
                    } else {
                      setSelection(
                        selections.filter((x) => x !== selectedIndex)
                      );
                    }
                  } else {
                    setSelection([selectedIndex]);
                  }
                }}
              />
            );
          }}
          estimatedItemSize={40}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 100 }}
          onEndReached={() => {
            console.log('onEndReached');
          }}
        />
      </View>
      {selections.length > 0 && (
        <Button
          backgroundColor={colors.button_color}
          position={'absolute'}
          bottom={10}
          onPress={handleSubmit}
          borderRadius={8}
          width={'80%'}
          fontWeight={'normal'}
          fontSize={20}
          overflow={'hidden'}
          alignSelf={'center'}
        >
          {t('continue')}
        </Button>
      )}
      {governateResponse.length <= 0 &&
        (governateApi.isLoading || governateApi.isFetching) && <AppLoader />}
    </View>
  );
};

export default GetGovernerate;

const styles = StyleSheet.create({
  fullscreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
});
