import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from '../components/design';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux';
import Product from '../components/Product';
import { getProducts } from '../actions';

function HomeScreen(props) {
  
  React.useEffect(() => {
    if(props.products.length === 0) {
      props.getProducts();
    }
  });

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={(Dimensions.get('window').width/2)-30}
        fixed
        keyExtractor={(item) => item._id}
        items={props.products}
        style={{flex:1, marginTop: 20}}
        renderItem={({ item, index }) => (
          <Product product={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps(state) {
  return {products: state.products, cart: state.cart};
}

export default connect(mapStateToProps, { getProducts })(HomeScreen);