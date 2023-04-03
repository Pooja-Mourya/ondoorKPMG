import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../../components/layout/Header';
import {TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ApiMethod from '../../../Services/APIService';
import {ScrollView} from 'react-native';
import moment from 'moment/moment';

const STATUS = [
  {id: '1', status: 'In Progress'},
  {id: '2', status: 'Completed'},
  {id: '3', status: 'On Hold'},
  {id: '4', status: 'Not Started'},
  {id: '5', status: 'Cancelled'},
];
const ViewActionItem = props => {
  const {navigation} = props;
  const items = props.route.params;

  const [openPer, setOpenPre] = useState(false);
  const [widthPre, setWidthPre] = useState(0);
  const [isInc, setIsInc] = useState(true);
  const [listState, setListState] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const progressFunction = () => {
    if (isInc) {
      setWidthPre(oldWidth => oldWidth + 5);
    } else {
      setWidthPre(oldWidth => oldWidth - 5);
    }
    if (isInc && widthPre + 5 === 100) setIsInc(false);
    if (!isInc && widthPre - 5 === 0) setIsInc(true);
    setWidthPre(listState);
  };

  console.log('status', items.status);
  if (isRefreshing) return <ActivityIndicator />;
  return (
    <>
      <Header
        textHeader={'Action Item Details'}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <ScrollView style={{}}>
        <View
          style={{
            padding: SIZES.padding,
            backgroundColor: COLORS.light20,
            borderRadius: SIZES.radius,
            margin: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   marginTop: 10,
              backgroundColor: COLORS.primary,
            }}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.light,
                fontSize: SIZES.h3,
                padding: 10,
                marginTop: 5,
              }}
            >
              Complete %
            </Text>
            <View style={{}}>
              <TouchableOpacity
                onPress={() => progressFunction()}
                style={{
                  borderWidth: 1,
                  height: 10,
                  alignSelf: 'center',
                  backgroundColor: COLORS.light,
                  width: `${items.complete_percentage}%`,
                  marginTop: 5,
                  // width: `${widthPre}%`,
                }}
              ></TouchableOpacity>
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.light,
                  fontSize: SIZES.h3,
                  padding: 10,
                }}
              >
                {items.complete_percentage} %
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.primary,
                fontSize: SIZES.h3,
                paddingVertical: 10,
              }}
            >
              {items.meeting.meeting_title.toUpperCase()}
            </Text>
            <Text style={{marginTop: 10}}></Text>
          </View>

          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                paddingVertical: 10,
              }}
            >
              Task
            </Text>
            <Text
              style={{
                paddingVertical: 10,
                color: COLORS.primary,
                ...FONTS.font1,
                fontWeight: '500',
                fontSize: 16,
              }}
            >
              {items.task}
            </Text>
          </View>

          <View
            style={{flexDirection: 'column', justifyContent: 'space-between'}}
          >
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                paddingVertical: 10,
              }}
            >
              Comment
            </Text>
            <Text
              style={{
                paddingVertical: 10,
                color: COLORS.primary,
                ...FONTS.font1,
                fontWeight: '500',
                fontSize: 16,
              }}
            >
              {items.comment}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
              backgroundColor: COLORS.secondary20,
              padding: 10,
              borderRadius: SIZES.radius,
            }}
          >
            <View
              style={{flexDirection: 'column', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Priority
              </Text>
              <Text style={{textTransform: 'uppercase'}}>{items.priority}</Text>
            </View>

            <View
              style={{flexDirection: 'column', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Status
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: items.status ? 'red' : ' green',
                  backgroundColor: items.status
                    ? COLORS.support4_08
                    : COLORS.support2_08,
                  padding: 5,
                  borderRadius: SIZES.radius,
                  textTransform: 'uppercase',
                }}
              >
                {items.status == 1 ? 'active' : ' inactive'}
              </Text>
            </View>
          </View>

          {/* all action ids */}
          <View
            style={{
              //   marginHorizontal: 30,
              backgroundColor: COLORS.support4_08,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Reference Id:
              </Text>
              <Text style={{marginTop: 10}}>{items.mm_ref_id}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Meeting Id:
              </Text>
              <Text style={{marginTop: 10}}>{items.meeting_id}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Note Id:
              </Text>
              <Text style={{marginTop: 10}}>{items.note_id}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Owner Id:
              </Text>
              <Text style={{marginTop: 10}}>{items.owner_id}</Text>
            </View>
          </View>
          <View
            style={{
              //   marginHorizontal: 30,
              backgroundColor: COLORS.primary20,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
              marginTop: 10,
            }}
          >
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Complete Date:
              </Text>
              <Text style={{marginTop: 10}}>
                {items.complete_date ?? 'undefine'}
              </Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Open Date:
              </Text>
              <Text style={{marginTop: 10}}>
                {moment(items.date_opened).format('L')}
              </Text>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  paddingVertical: 10,
                }}
              >
                Due Date:
              </Text>
              <Text style={{marginTop: 10}}>
                {moment(items.due_date).format('L')}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                ...FONTS.base,
                color: COLORS.dark,
                fontSize: SIZES.h3,
                paddingVertical: 10,
              }}
            >
              Document :
            </Text>
            <Text style={{marginTop: 10}}>{items.documents[0]}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ViewActionItem;

const styles = StyleSheet.create({});

{
  /* <View>
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

            <TouchableOpacity onPress={() => handleComplete()}>
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
          </View> */
}
