import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import wasmWorker from "wasm-worker";
import { storePost } from "helpers/instaSwarm.js";
// Sub-pages
import UploadPhoto from "./pages/UploadPhoto";
import FilterPhoto from "./pages/FilterPhoto";
import MetaDataPhoto from "./pages/MetaDataPhoto";
import SimpleDialog from "pages/status/SimpleDialog";
import SimpleChecklist from "pages/status/SimpleChecklist";

// Ids
const uploadPhoto = "uploadPhoto";
const filterPhoto = "filterPhoto";
const metadataPhoto = "metadataPhoto";
const simpleDialog = "simpleDialog";
const simpleChecklist = "simpleChecklist";

async function loadWasm() {
  try {
    console.log("trying to load wasm");
    const photon = await import("@silvia-odwyer/photon");
    window.photon = photon;
  } finally {
    console.log("loaded wasm successfully");
    //this.loadedWasm = true;
  }
}

function getUser(state) {
  return state.account;
}

function getSystem(state) {
  return state.system;
}

export function PostItemRoot() {
  const history = useHistory();

  useEffect(() => {
    console.log("load wasm");
    loadWasm();
  }, []);

  const dispatch = useDispatch();
  const account = useSelector(state => getUser(state));
  const system = useSelector(state => getSystem(state));

  const [stage, setStage] = useState(uploadPhoto);
  const [photo, setPhoto] = useState();
  const [filteredPhoto, setFilteredPhoto] = useState();

  const [statusState, setStatusState] = useState(1)

  async function sharePost(post) {
    console.log("sharing post");
    if (!system.passWord) {
      console.log("unlock first");
      dispatch({
        type: "SET_SYSTEM",
        data: {
          showPasswordUnlock: true
        }
      });
    } else {
      //setStage(SimpleChecklist)
      console.log("trying to post");
      const dataObject = {
        post: post,
        user: account,
        password: system.passWord
      };
      try {
        setStage(simpleChecklist)
        await storePost(dataObject, function(){
          history.push("/home")
        }); 
        //setStatusState(1)
      } catch (error) {
        //setStatusState(2)
      }
      //dispatch({type: "SHARE_POST", data: dataObject});
    }
  }

  // Router
  switch (stage) {
    case uploadPhoto:
      return (<UploadPhoto nextStage={() => setStage(filterPhoto)} setPhoto={setPhoto} />);
    case filterPhoto:
      return (<FilterPhoto image={photo} nextStage={() => setStage(metadataPhoto)} setFilteredPhoto={setFilteredPhoto}></FilterPhoto>);
    case metadataPhoto:
      return (<MetaDataPhoto image={filteredPhoto} sharePost={sharePost} accountUnlock={system.passWord}></MetaDataPhoto>);
    case simpleDialog:
      return (<SimpleDialog title="Are you ready to post?" text="Postage stamp (2 BZZ) and gas (35000 gwei) is included." confirm={() => { setStage(uploadPhoto) }} cancel={() => { history.goBack() }}></SimpleDialog>);
    case simpleChecklist:
      return (<SimpleChecklist title="Publishing post" titleDone="Post successfully published." titleError="Something went wrong." status={statusState} successStage={() => { history.push("/") }} cancel={() => { history.goBack() }}></SimpleChecklist>);
    default:
      return <h1>Oops...</h1>;
  }
}

export default PostItemRoot;
