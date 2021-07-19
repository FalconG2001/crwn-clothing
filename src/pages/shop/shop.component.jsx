import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import CollectionOverview from "../../components/collection-overview/collection-overview.component.jsx";
import CollectionPage from "../collection/collection.component.jsx";

import {updateCollections} from "../../redux/shop/shop.actions.js";
import WithSpinner from "../../components/with-spinner/with-spinner.component.jsx";

import {
  firestore,
  convertCollectionsSnapshotToMap
} from "../../firebase/firebase.utils.js";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {updateCollectionts} = this.props;
    const collectionRef = firestore.collection("collections");

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollectionts(collectionsMap);
      this.setState({loading: false});
    });
  }

  render() {
    const {match} = this.props;
    const {loading} = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollectionts: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
