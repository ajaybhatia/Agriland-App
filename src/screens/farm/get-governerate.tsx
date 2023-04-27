import { FlashList } from '@shopify/flash-list';
import { Button, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiCommonFetchGovernates } from '@/apis/endpoints/api';
import type { Governorate } from '@/apis/model';
import { EmptyList } from '@/ui';
import AppLoader from '@/ui/components/AppLoader';
import Header from '@/ui/components/Header';
import ItemList from '@/ui/components/ItemList';
import colors from '@/ui/theme/colors';

type Props = {
  onGovernerateSelect?: (governorate: Governorate[]) => void;
  onClose?: () => void;
};

const GetGovernerate = ({ onGovernerateSelect, onClose }: Props) => {
  const { t } = useTranslation();
  const [selections, setSelection] = useState<number[]>([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  const [governateResponse, setGovernateResponse] = useState<Governorate[]>([]);

  // Api

  // const governateApi = useGetApiGovernorateGetGovernorates(
  //   {
  //     skip: moreInfo.skip,
  //     take: moreInfo.take,
  //   },
  //   {
  //     query: {
  //       onSuccess: (data: Governorate[]) => {
  //         if (data.length > 0) {
  //           setGovernateResponse([...governateResponse, ...data]);
  //         }
  //       },
  //     },
  //   }
  // );
  const governateApi = useGetApiCommonFetchGovernates({
    query: {
      onSuccess: (data: Governorate[]) => {
        if (data.length > 0) {
          setGovernateResponse([...governateResponse, ...data]);
        }
      },
    },
  });

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
      <View mx={10} flex={1}>
        <Header
          title={t('select-governerate')}
          iconName={'close'}
          mt={3}
          mb={3}
          ml={0}
          as={MaterialIcons}
          onRightIconClick={() => onClose && onClose()}
        />
        <FlashList
          extraData={selections}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={governateResponse}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() =>
            governateResponse.length <= 0 &&
            !governateApi.isLoading &&
            !governateApi.isFetching && (
              <EmptyList value={'Governate not found'} />
            )
          }
          renderItem={({
            item,
            index,
          }: {
            item: Governorate;
            index: number;
          }) => {
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
    height: '80%',
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
