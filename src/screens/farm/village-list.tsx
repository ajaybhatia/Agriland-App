import { FlashList } from '@shopify/flash-list';
import { Button, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useGetApiCommonFetchVillageByCityId } from '@/apis/endpoints/api';
import type { Village } from '@/apis/model';
import AppLoader from '@/ui/components/AppLoader';
import EmptyList from '@/ui/components/EmptyList';
import Header from '@/ui/components/Header';
import ItemList from '@/ui/components/ItemList';
import colors from '@/ui/theme/colors';

type Props = {
  cityId: string;
  onVillageSelect?: (village: Village[]) => void;
  onClose?: () => void;
};

const VillageList = ({ onVillageSelect, onClose, cityId }: Props) => {
  const { t } = useTranslation();
  const [selections, setSelection] = useState<number[]>([]);
  const [moreInfo, setMoreInfo] = useState<{
    take: number;
    skip: number;
  }>({
    take: 20,
    skip: 0,
  });
  const [villageResponse, setVillageResponse] = useState<Village[]>([]);

  // Api
  console.log('cityId ==> ', cityId);
  const villageApi = useGetApiCommonFetchVillageByCityId(
    {
      cityId: cityId,
    },
    {
      query: {
        onSuccess: (data: Village[]) => {
          console.log('data ==> ', data);
          if (data.length > 0) {
            setVillageResponse([...villageResponse, ...data]);
          }
        },
        onError(err) {
          Toast.show({
            type: 'error',
            text1: err.message,
          });
        },
      },
    }
  );

  function handleSubmit() {
    if (onVillageSelect && selections.length > 0) {
      var selectedGovernorate = selections.map((v) => {
        return villageResponse.filter((x, index) => index === v)[0];
      });
      onVillageSelect(selectedGovernorate);
    }
  }

  return (
    <View style={styles.fullscreen}>
      <View mx={8} flex={1}>
        <Header
          title={'Select Village'}
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
          data={villageResponse}
          renderItem={({ item, index }: { item: Village; index: number }) => {
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
          // eslint-disable-next-line react/no-unstable-nested-components
          ListEmptyComponent={() =>
            villageResponse.length <= 0 &&
            !villageApi.isLoading &&
            !villageApi.isFetching && <EmptyList value={'Villages not found'} />
          }
          estimatedItemSize={40}
          //onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingBottom: 100 }}
          // onEndReached={() => {
          //   console.log('onEndReached');
          // }}
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
      {villageResponse.length <= 0 &&
        (villageApi.isLoading || villageApi.isFetching) && <AppLoader />}
    </View>
  );
};

export default VillageList;

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
