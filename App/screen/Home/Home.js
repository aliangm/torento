import React, { PureComponent } from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { withNavigation } from 'react-navigation';
import styles from './styles';
import PostList from './PostList';
import { ThemeContext } from "../../context/index";
import {AntDesign} from "@expo/vector-icons";
import FollowTag from "./FollowTag";

const headerTitle = {
  'following': 'MY KONTRABAND',
  'hot': 'HOT',
  'new': 'NEW'
}

class Home extends PureComponent {

  constructor(props) {
    super(props);
  }

  handlePressMore = () => {
    this.props.navigation.navigate('Tags');
  }

  checkFollowingItem = (tag) => {
    let tagsName = []
    if (this.props.followingTagsList) {
      this.props.followingTagsList.forEach(element => {
        tagsName.push(element.name)
      });
    }

    return tagsName.includes(tag)
  }

  renderHeaderTitle = (section) => {
    if (headerTitle[section]) {
      return <Text style={[stylesAdd.titleWrapper, stylesAdd.name]}>{headerTitle[section]}</Text>
    }
  }

  render() {
    const params = this.props.navigation.getParam('params', { section: "hot", page: 1 });
    console.log(params);
    return (
      <ThemeContext.Consumer>
        {
          (({ theme }) => (
            <View style={styles[`${theme}__mainContainer`]}>
              {
                params.section === 'tags' &&
                <View style={stylesAdd.headerFilter}>
                  <Text style={stylesAdd.name}>{tags.toUpperCase()}</Text>
                  <TouchableOpacity onPress={() => this.props.onFollow(tags)}
                                    style={stylesAdd.btnFollow}>
                    <AntDesign
                      name={this.checkFollowingItem(params.tags) ? "star" : "staro"} size={24}
                      color='#fff'
                    />
                    <Text style={stylesAdd.follow}>FOLLOW</Text>
                  </TouchableOpacity>
                </View>
              }
              {
                this.renderHeaderTitle(params.section)
              }
              {
                params.section === 'following' &&
                <View style={stylesAdd.headerFilter}>
                  <ScrollView horizontal>
                    {
                      this.props.followingTagsList && this.props.followingTagsList.map( (item, idx) => (
                        <FollowTag key={`followingtag${idx}`} onFollow={this.props.onFollow} item={item} />))
                    }
                    <FollowTag isMoreBtn={true} onPressMoreBtn={this.handlePressMore} />
                  </ScrollView>
                </View>
              }
              <PostList
                loading={this.props.loading}
                params={params}
                onFollow={this.props.onFollow}
                followingTagsList={this.props.followingTagsList}
              />
            </View>
          ))
        }
      </ThemeContext.Consumer>
    );
  }
}

export default withNavigation(Home);

const stylesAdd = StyleSheet.create({
  headerFilter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
  name: {
    fontSize: 24,
    color: '#c4201b',
    marginBottom: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleWrapper: {
    paddingTop: 10,
    height: 40
  },
  btnFollow: {
    flexDirection: 'row',
    backgroundColor: '#c4201b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 4,
  },
  follow: {
    color: '#fff',
    marginLeft: 8
  }
})