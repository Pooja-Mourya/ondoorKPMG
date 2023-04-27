import {StyleSheet, Text, Alert, View, ScrollView, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, constants, FONTS, SIZES} from '../../../constants';
import Header from '../../../components/layout/Header';
import moment from 'moment';
import ApiMethod from '../../../Services/APIService';
import {useSelector} from 'react-redux';
import {useCustomHook} from '../../theme/ThemeContext';

const ViewNotes = props => {
  let routeParm = props?.route?.params;
  //   console.log('viewNote', routeParm);
  const token = useSelector(state => state?.user?.user?.access_token);
  const {dark} = useCustomHook();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewNote, setViewNote] = useState({});

  const handleGetList = async () => {
    const url = constants.endPoint.note + '/' + routeParm.id;
    setIsRefreshing(true);
    try {
      const result = await ApiMethod.getData(url, token, null);
      console.log('noteViewResult', result?.data?.data, url, 'url');
      setViewNote(result?.data?.data);
      setIsRefreshing(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    handleGetList();
  }, []);
  return (
    <>
      <Header
        leftIcon={true}
        // onPressArrow={() => setFilterModal(!filterModal)}
        textHeader={'Notes Details'}
      />
      <View
        style={{
          backgroundColor: dark ? COLORS.dark : COLORS.secondary,
          height: SIZES.height,
          borderRadius: SIZES.radius,
        }}
      >
        <ScrollView
          style={{
            height: SIZES.height,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  //   marginTop: 10,
                }}
              >
                Status :
              </Text>
              <Text>{viewNote.status == 1 ? 'active' : 'inactive'}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  //   marginTop: 10,
                }}
              >
                Edited By :
              </Text>
              <Text>{viewNote.edited_by == null ?? 'undefine'}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                }}
              >
                Edited Date :
              </Text>
              <Text>{moment(viewNote.edited_date).format('L')}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                }}
              >
                Created At :
              </Text>
              <Text>{moment(viewNote.created_at).format('L')}</Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                }}
              >
                Meeting Due Date :
              </Text>
              <Text>{moment(viewNote.updated_at).format('L')}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  //   marginTop: 10,
                }}
              >
                User Id
              </Text>
              <Text>{viewNote.id}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  //   marginTop: 10,
                }}
              >
                Meeting Id :
              </Text>
              <Text>{viewNote.meeting_id}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                  //   marginTop: 10,
                }}
              >
                Meeting duration
              </Text>
              <Text>{viewNote.meeting_duration}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.dark,
                  fontSize: SIZES.h3,
                }}
              >
                Decision :
              </Text>
              <Text style={{marginRight: 50}}>{viewNote.decision}</Text>
            </View>
            <View
              style={{
                backgroundColor: COLORS.support4_08,
                borderRadius: SIZES.radius,
                padding: 10,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.primary,
                  fontSize: SIZES.h3,
                  textAlign: 'center',
                  marginVertical: 10,
                }}
              >
                Created By
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Id
                </Text>
                <Text style={{marginTop: 5}}>{viewNote.created_by?.id}</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Email :
                </Text>
                <Text>{viewNote?.created_by?.email}</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Name:
                </Text>
                <Text>{viewNote?.created_by?.name}</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.support1_08,
                borderRadius: SIZES.radius,
                padding: 10,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.primary,
                  fontSize: SIZES.h3,
                  textAlign: 'center',
                  marginVertical: 10,
                }}
              >
                Meeting
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Meeting Title :
                </Text>
                <Text>{viewNote?.meeting_title}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Agenda of Meeting :
                </Text>
                <Text style={{width: '50%'}}>
                  {viewNote?.agenda_of_meeting}
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
                  }}
                >
                  Meeting Date
                </Text>
                <Text>{moment(viewNote.meeting_date).format('L')}</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Meeting Start Time :
                </Text>
                <Text>{moment(viewNote.meeting_time_start).format('L')}</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Meeting End Time :
                </Text>
                <Text>{moment(viewNote.meeting_time_end).format('L')}</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Meeting UId :
                </Text>
                <Text>
                  {!viewNote?.meeting_uid ? 'undefine' : viewNote?.meeting_uid}
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
                  }}
                >
                  Invite File :
                </Text>
                <Text>{viewNote.invite_file}</Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Meeting Link :
                </Text>
                {/* <Text onPress={Linking.openURL(viewNote.meeting_link)}>
                  invite file
                </Text> */}
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Organizer :
                </Text>
                <Text>{viewNote?.organised_by}</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.light20,
                borderRadius: SIZES.radius,
                padding: 10,
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  ...FONTS.base,
                  color: COLORS.primary,
                  fontSize: SIZES.h3,
                  textAlign: 'center',
                  marginVertical: 10,
                }}
              >
                Action
              </Text>

              {!viewNote.action_items ? (
                <Text>'______________'</Text>
              ) : (
                viewNote.action_items.map((n, i) => {
                  return (
                    <View key={i} style={{}}>
                      <Text>
                        Meeting Id :<Text style={{}}>{n.meeting_id}</Text>
                      </Text>
                      <Text>
                        Owner Id : <Text>{n.owner_id}</Text>
                      </Text>
                      <Text>
                        Note Id : <Text>{n.note_id}</Text>
                      </Text>
                      <Text>
                        Open Date :{' '}
                        <Text>{moment(n.date_opened).format('L')}</Text>
                      </Text>
                      <Text>
                        Task : <Text>{n.task}</Text>
                      </Text>
                      <Text>
                        Priority : <Text>{n.priority}</Text>
                      </Text>
                      <Text>
                        Due date : <Text>{moment(n.due_date).format('L')}</Text>
                      </Text>
                      <Text>
                        Complete Percentage :{' '}
                        <Text>{n.complete_percentage}</Text>
                      </Text>
                      <Text>
                        Status: <Text>{n.status}</Text>
                      </Text>
                      <Text>
                        Created By: <Text>{n.created_by}</Text>
                      </Text>
                      <Text>
                        Complete date :{' '}
                        <Text>{moment(n.complete_date).format('L')}</Text>
                      </Text>
                      <Text>
                        Comment: <Text>{n.comment}</Text>
                      </Text>
                      <Text>
                        Created At :{' '}
                        <Text>{moment(n.created_at).format('L')}</Text>
                      </Text>
                      <Text>
                        Updated At :{' '}
                        <Text>{moment(n.updated_at).format('L')}</Text>
                      </Text>
                      {/* <Text>
                        Owner ID: <Text>{n.owner.id ? n.owner.id : null}</Text>
                      </Text> */}
                      {/* <Text>
                        Owner Name:{' '}
                        <Text>{n.owner.name ? n.owner.name : null}</Text>
                      </Text> */}
                      {/* <Text>
                        Owner Email: <Text>{n.owner.email}</Text>
                      </Text> */}
                    </View>
                  );
                })
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    ...FONTS.base,
                    color: COLORS.dark,
                    fontSize: SIZES.h3,
                  }}
                >
                  Meeting Due Date :
                </Text>

                <Text>
                  {moment(viewNote.action_item?.[0]?.due_date).format('L')}
                </Text>
              </View>
            </View>

            <Text
              style={{
                ...FONTS.base,
                color: COLORS.primary,
                fontSize: SIZES.h3,
                textAlign: 'center',
                marginVertical: 10,
              }}
            >
              Attendees
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ViewNotes;

const styles = StyleSheet.create({});
