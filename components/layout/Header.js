import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../styles/base';
import { StyleSheet } from 'react-native';
import { Header as NBHeader, Left, Body, Right } from 'native-base';
import Text from '../typography/Text';

const Header = (props) => {
  return (
    <NBHeader {...props} style={[headerStyles.header, props.style]}>
      <Left style={headerStyles.left}>
        <Text variant='header'>{props.children}</Text>
      </Left>
      <Body style={headerStyles.body} />
      <Right style={headerStyles.right} />
    </NBHeader>
  );
}

/* Styles */

const segment = {
  flex: 1,
  alignSelf: "flex-end",
}

const headerStyles = StyleSheet.create({
  header: {
    height: 90,
    alignItems: "flex-end",
    paddingVertical: 16,
    backgroundColor: theme.colors.darkGrey,
  },
  left: {
    ...segment,
    marginLeft: 16,
  },
  body: {
    ...segment,
    alignItems: "center",
  },
  right: {
    ...segment,
    marginRight: 16,
  },
});

export default Header;