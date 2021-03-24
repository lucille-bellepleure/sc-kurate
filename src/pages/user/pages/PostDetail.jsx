import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import main from "styles.module.css";
import styles from "../user.module.css";
import { useParams, Route, NavLink } from "react-router-dom";
import {
  Home,
  AddCircle,
  ArrowBackIos,
  ArrowForwardIos,
  Favorite,
  FavoriteBorder,
  Person,
  PlayCircleFilledWhite
} from "@material-ui/icons";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PosterChild from "components/PosterChild"
import moment from "moment"
import ActionButton from "components/ActionButton"

import { Avatar, Divider } from "@material-ui/core";
import sortByProp from "helpers/sortByProp";

const theme = createMuiTheme({
  // Style sheet name ⚛️
  palette: {
    primary: {
      main: "#333333"
    },
    secondary: {
      main: "#f55858"
    }
  }
});

function getPosts(state) {
  return state.postState;
}

function getSystem(state) {
  return state.system;
}

function getAccount(state) {
  return state.account
}

export function PostDetail({
  nextStage,
  user,
  }) {
  const dispatch = useDispatch();
  const params = useParams()
  const bzzPost = params.bzzPost
  const userAddress = params.userAddress


  const system = useSelector(state => getSystem(state));
  const account = useSelector(state => getAccount(state))
  const posts = useSelector(state => getPosts(state));

  const [post, setPost] = useState({ id: 0, address: '0x0', avatar: 'a', username: 'waiting', caption: 'waiting', location: 'unknown', time: '' })

  useEffect(() => {
    console.log(bzzPost)
    // const getPostContent = async () => {
    //   post = posts[bzzPost]
    //   console.log(posts)
    // }
    // getPostContent(bzzPost)
   dispatch({type: 'RES_POST', data: { postId: bzzPost, userAddress: userAddress }})
   if(posts[bzzPost]) {
    setPost(posts[bzzPost])
    console.log(post)
   }
  })

  const [followButtonState, setFollowButtonState] = useState("isme");
  const JSONFetcher = url => fetch(url).then(r => r.text());

  return (<ThemeProvider theme={theme}>
    <div className={main.container}>
      <div className={main.header}>
        <div>
          <NavLink className={main.textbutton} to={"/user/"+post.address}>
            <ArrowBackIos color="primary"></ArrowBackIos>
          </NavLink>
        </div>
        <div className={[main.textbutton, main.bodyDefault, main.blue].join()}>
          {/* {user.account.username} */}
          {/* {post.caption} */}

        </div>
        <div>&nbsp;</div>
      </div>

      {/* 
      <div className={styles.scroller}>
        {userfeed.map(item => getPost(item.bzz))}
      </div> */}
      <div className={main.scroller}>
        <div className={main.postHead}>
          <NavLink to={"/user/" + post.address}><Avatar src={post.avatar} className={main.avatar}></Avatar></NavLink>
          <div>
            <div className={main.postUsername}><b>{post.username}</b></div>
            <div className={main.postLocation}>{post.location}</div>
          </div>
        </div>
        <PosterChild format={post.format} image={post.image} onDoubleClick={() => dispatch({ type: 'SET_LIKE', data: { _id: post.id, ilike: true } })}></PosterChild>

        <div className={main.postFooter}>
          {/* <div citemlassName={main.likes}>
                            {item.ilike
                                ? <Favorite
                                    onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: false } })} color="secondary" fontSize="small"></Favorite>
                                : <FavoriteBorder
                                    onClick={() => dispatch({ type: 'SET_LIKE', data: { _id: item._id, ilike: true } })}
                                    color="primary" fontSize="small"></FavoriteBorder>
                            }
                                    &nbsp;
                                    <b>{item.likes}</b></div> */}
          <div className={main.smallestBold}>{moment(post.time).fromNow()}</div>
          <div>{post.caption}</div>
          <a className={main.blueLink}>Collect this post</a>

        </div>

      </div>

      <div className={main.footer}>
        <div className={main.textbutton}>
          <NavLink to="/">
            <Home color="primary" fontSize="large"></Home>
          </NavLink>
        </div>
        <div className={main.textbutton}>
          {
            account.status === "noAccount"
              ? (<NavLink to="/create-account">
                <AddCircle color="primary" fontSize="large"></AddCircle>
                {/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */
                }
              </NavLink>)
              : (<NavLink to="/post-item">
                <AddCircle color="primary" fontSize="large"></AddCircle>
                {/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */
                }
              </NavLink>)
          }
        </div>

        <div className={main.textbutton}>
          {
            account.status === "noAccount"
              ? (<NavLink to="/create-account">
                <img className={main.avatarImage} src={account.avatar}></img>
              </NavLink>)
              : (<NavLink to="/account">
                <img className={main.avatarImage} src={account.avatar}></img>
              </NavLink>)
          }
        </div>
      </div>
    </div>
  </ThemeProvider>);
}

export default PostDetail;