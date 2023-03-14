import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/layout/Header';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useEffect} from 'react';

const ViewActionItem = props => {
  const {navigation} = props;
  const items = props.route.params;

  //   console.log(
  //     'items',
  //     items.documents.map(item => console.log(item)),
  //   );
  const [openPer, setOpenPre] = useState(false);
  const [widthPre, setWidthPre] = useState(0);
  const [isInc, setIsInc] = useState(true);

  const progressFunction = () => {
    if (isInc) {
      setWidthPre(oldWidth => oldWidth + 5);
    } else {
      setWidthPre(oldWidth => oldWidth - 5);
    }
    if (isInc && widthPre + 5 === 100) setIsInc(false);
    if (!isInc && widthPre - 5 === 0) setIsInc(true);
    // setOpenPre(false);
  };

  //   useEffect(() => {
  //     if (items.complete_percentage === '100%') {
  //       setOpenPre(false);
  //     }
  //   }, []);

  console.log('status', items.status);
  return (
    <>
      <Header
        textHeader={'Action Item Details'}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <View
        style={{
          padding: SIZES.padding,
          backgroundColor: COLORS.secondary,
          flex: 1,
          justifyContent: 'space-evenly',
        }}
      >
        {/* <View>
          {openPer ? (
            <View
              style={{
                backgroundColor: COLORS.light20,
                alignItems: 'center',
                justifyContent: 'center',
                padding: SIZES.padding,
                borderRadius: SIZES.radius,
                flexDirection: 'row',
              }}
            >
              <View style={{width: '80%'}}>
                <TouchableOpacity
                  onPress={() => progressFunction()}
                  style={{
                    borderWidth: 1,
                    height: 10,
                    alignSelf: 'center',
                    backgroundColor: COLORS.primary,
                    // width: `${items.complete_percentage}%`,
                    width: `${widthPre}%`,
                  }}
                ></TouchableOpacity>
                <Text style={{textAlign: 'center'}}>
                  {items.complete_percentage > 0
                    ? `${widthPre}%`
                    : items.complete_percentage}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setOpenPre(false)}>
                <AntDesign
                  style={{
                    backgroundColor: COLORS.light,
                    marginTop: -10,
                    borderRadius: 50,
                    padding: 5,
                    elevation: 1,
                    marginLeft: 10,
                  }}
                  name="close"
                  size={20}
                  color={COLORS.dark}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              setOpenPre(!openPer);
            }}
          >
            <Text>
              <FontAwesome5 name="percentage" size={20} color={COLORS.dark} />
              Percentage %
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <Ionicons
                name="checkmark-done-sharp"
                size={25}
                color={COLORS.dark}
              />
              Complete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <MaterialCommunityIcons
                name="gesture-tap-hold"
                size={25}
                color={COLORS.dark}
              />
              On Hold
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <Entypo name="progress-one" size={25} color={COLORS.dark} />
              In Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>
              <AntDesign name="close" size={25} color={COLORS.dark} />
              Cancelled
            </Text>
          </TouchableOpacity>
        </View> */}

        <Text>
          Meeting Title: <Text>{items.meeting.meeting_title}</Text>
        </Text>
        <Text>
          Task : <Text>{items.task}</Text>
        </Text>
        <Text>
          Comment : <Text>{items.comment}</Text>
        </Text>
        <Text>
          Document : <Text>{items.documents[0]}</Text>
        </Text>
        <Text>
          Priority : <Text>{items.priority}</Text>
        </Text>
        <Text>
          Due Date: <Text>{items.due_date}</Text>
        </Text>
        <Text>
          Status: <Text>{items.status}</Text>
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text>
            Complete %:{' '}
            {/* <Text>
              {items.complete_percentage > 0
                ? widthPre
                : items.complete_percentage}
            </Text> */}
          </Text>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => progressFunction()}
              style={{
                borderWidth: 1,
                height: 10,
                alignSelf: 'center',
                backgroundColor: COLORS.primary,
                width: `${items.complete_percentage}%`,
                // width: `${widthPre}%`,
              }}
            ></TouchableOpacity>
            <Text style={{textAlign: 'center'}}>
              {items.complete_percentage}
            </Text>
          </View>
        </View>

        <Text>
          Complete Date: <Text>{items.complete_date}</Text>
        </Text>
        <Text>
          Open Date: <Text>{items.date_opened}</Text>
        </Text>
        <Text>
          Reference Id: <Text>{items.mm_ref_id}</Text>
        </Text>
      </View>
    </>
  );
};

export default ViewActionItem;

const styles = StyleSheet.create({});
