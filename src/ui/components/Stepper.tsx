import type { FC, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import type { ColorValue, TextStyle, ViewStyle } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native';

type ContentType = {
  content: ReactElement;
  title: string;
};

export interface StepperProps {
  active: number;
  content: ContentType[];
  onNext: Function;
  onBack: Function;
  onFinish: Function;
  wrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
  selectedBackgroundColor?: ColorValue | undefined;
  selectedBorderColor?: ColorValue | undefined;
  selectedTextColor?: ColorValue | undefined;
  xSpace?: number;
  titleTextStyle?: TextStyle;
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map((val) => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
};

const Stepper: FC<StepperProps> = (props) => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
    selectedBackgroundColor = 'white',
    selectedBorderColor = '#4F7942',
    selectedTextColor = '#4F7942',
    xSpace = 0,
    titleTextStyle,
  } = props;
  const [step, setStep] = useState<number[]>([0]);

  const pushData = (val: number) => {
    setStep((prev) => [...Array(val + 1).keys()]);
  };

  const removeData = () => {
    setStep((prev) => {
      prev.pop();
      return prev;
    });
  };
  useEffect(() => {
    pushData(active);
  }, [active]);
  return (
    <View style={wrapperStyle}>
      <View style={{ marginHorizontal: xSpace, marginBottom: 10 }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: '13%',
            right: '13%',
            top: '25%',
            height: 1.5,
            backgroundColor: 'rgba(0,0,0,0.1)',
            opacity: 0.5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {content.map((_, i) => {
            return (
              <React.Fragment key={i}>
                {i !== 0 && (
                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      backgroundColor: 'transparent',
                      opacity: 1,
                      marginHorizontal: 10,
                    }}
                  />
                )}
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={[
                      {
                        backgroundColor: '#1976d2',
                        width: 25,
                        height: 25,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: search(i, step) ? 1 : 0.3,
                      },
                      stepStyle,
                      {
                        backgroundColor: search(i, step)
                          ? selectedBackgroundColor
                          : stepStyle?.backgroundColor ?? 'green',
                      },
                    ]}
                  >
                    {search(i, step) ? (
                      <Text
                        style={[
                          {
                            color: 'white',
                          },
                          stepTextStyle,
                          { color: selectedTextColor },
                        ]}
                      >
                        &#10003;
                      </Text>
                    ) : (
                      <Text
                        style={[
                          {
                            color: 'white',
                          },
                          stepTextStyle,
                        ]}
                      >
                        {i + 1}
                      </Text>
                    )}
                  </View>
                  <Text style={stepTextStyle}>{content[i].title}</Text>
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </View>
      <View style={{ flex: 1 }}>{content[active].content}</View>
      {showButton && (
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {active !== 0 && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
                {
                  backgroundColor: '#a1a1a1',
                },
              ]}
              onPress={() => {
                removeData();
                onBack();
              }}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>Back</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
              ]}
              onPress={() => {
                pushData(active + 1);
                onNext();
              }}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>Next</Text>
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}
            >
              <Text style={[{ color: 'white' }, buttonTextStyle]}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;
