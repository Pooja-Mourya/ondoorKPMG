import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/layout/Header';
import moment from 'moment';
import {COLORS, FONTS, SIZES} from '../../../constants';

const ViewRoles = props => {
  const {navigation} = props;

  const roleView = props.route.params;

  return (
    <>
      <Header
        textHeader={'Role View Screen'}
        leftIcon={true}
        onPressArrow={() => navigation.goBack()}
      />
      <View
        style={{
          padding: SIZES.padding,
          backgroundColor: COLORS.support2_08,
          borderRadius: SIZES.radius,
          margin: 10,
        }}
      >
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.dark,
              fontSize: SIZES.h3,
            }}
          >
            Role Name :{' '}
          </Text>
          <Text style={{marginTop: 3}}>{roleView.name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.dark,
              fontSize: SIZES.h3,
            }}
          >
            guard name:{' '}
          </Text>
          <Text style={{marginTop: 3}}>{roleView.guard_name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.dark,
              fontSize: SIZES.h3,
            }}
          >
            se name :{' '}
          </Text>
          <Text style={{marginTop: 3}}>{roleView.se_name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.dark,
              fontSize: SIZES.h3,
            }}
          >
            Created At :{' '}
          </Text>
          <Text style={{marginTop: 3}}>
            {moment(roleView.create_at).format('L')}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              ...FONTS.base,
              color: COLORS.dark,
              fontSize: SIZES.h3,
            }}
          >
            Updated At :{' '}
          </Text>
          <Text style={{marginTop: 3}}>
            {moment(roleView.updated_at).format('L')}
          </Text>
        </View>
      </View>

      <View style={{}}>
        <FlatList
          data={roleView.permissions}
          keyExtractor={ill => ill.id}
          renderItem={(p, i) => {
            console.log('p', p);
            return (
              <View
                style={{
                  backgroundColor: COLORS.secondary20,
                  width: 300,
                  margin: SIZES.padding,
                  padding: SIZES.padding,
                  borderRadius: SIZES.radius,
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
                  {' '}
                  INDEX : {p.index}
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
                      marginTop: 10,
                    }}
                  >
                    id
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.id}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    Name:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.name}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    {' '}
                    Guard Name:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.guard_name}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    Se Name:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.se_name}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    Create At:
                  </Text>
                  <Text style={{marginTop: 10}}>
                    {moment(p.item.create_at).format('L')}
                  </Text>
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
                      marginTop: 10,
                    }}
                  >
                    Updated At:
                  </Text>
                  <Text style={{marginTop: 10}}>
                    {moment(p.item.updated_at).format('L')}
                  </Text>
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
                      marginTop: 10,
                    }}
                  >
                    Group Name:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.group_name}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    Description:
                  </Text>
                  <Text style={{marginTop: 10}}>
                    {p.item.description == null
                      ? 'undefine'
                      : p.item.description}
                  </Text>
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
                      marginTop: 10,
                    }}
                  >
                    Name:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.name}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    Belongs To:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.belongs_to}</Text>
                </View>
                <Text
                  style={{
                    ...FONTS.base,
                    color: 'teal',
                    fontSize: SIZES.h3,
                    textAlign: 'center',
                    marginVertical: 10,
                  }}
                >
                  Pivot
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
                      marginTop: 10,
                    }}
                  >
                    role id:
                  </Text>
                  <Text style={{marginTop: 10}}>{p.item.pivot.role_id}</Text>
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
                      marginTop: 10,
                    }}
                  >
                    permission id:
                  </Text>
                  <Text style={{marginTop: 10}}>
                    {p.item.pivot.permission_id}
                  </Text>
                </View>
              </View>
            );
          }}
          horizontal={true}
        />
      </View>
    </>
  );
};

export default ViewRoles;

const styles = StyleSheet.create({});
