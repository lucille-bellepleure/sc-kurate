import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
//import sortByProp from "helpers/sortByProp"
import * as h from "helpers/instaSwarm";


// Sub-pages
import VerifyHome from './pages/VerifyHome';
import SimpleChecklist from '../status/SimpleChecklist';

// Ids
const verifyHome = 'verifyHome';
const fetchingCandidate = 'fetchingCandidate';
const errorfetchingCandidate = 'errorfetchingCandidate'
const verifyingState = "verifyingState"

// function getUserFromState(state, address) {
//     return state.users[address]
// }

// function getUser(state) {
//     return state.account
// }

function getSystem(state) {
    return state.system;
}

function getUser(state) {
    return state.account;
}

export function VerifyRoot() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [stage, setStage] = useState(fetchingCandidate)

    const system = useSelector(state => getSystem(state));
    const account = useSelector(state => getUser(state));

    const [userVerify, setUserVerify] = useState({ username: "Fetching", avatar: "Fetching" })

    // const [userfeed, setUserfeed] = useState([])
    // const [usersubs, setUsersubs] = useState([])

    // const account = useSelector(state => getUser(state))

    const params = useParams()
    const shortcode = params.shortcode

    const verificationCall = async () => {
        // check for passwd
        if (!system.passWord) {
            console.log("unlock first");
            dispatch({
                type: "SET_SYSTEM",
                data: {
                    showPasswordUnlock: true
                }
            });
        } else {

            setStage(verifyingState)
            const dataObject = {
                user: account,
                password: system.passWord,
                verifeeAvatar: userVerify.avatar,
                verifeeUsername: userVerify.username,
                verifeePublickey: userVerify.publickey,
            };
            console.log("starting verification of ", userVerify.address)
            await h.verifyUser(userVerify.address, dataObject, function (res) {
                console.log(res)
                setStage(verifyHome)
            })

        }
    }

    // const user = useSelector(state => getUserFromState(state, address))

    useEffect(() => {
        if (shortcode) {
            h.resolveShortcode(shortcode).then(res => {
                if (res === "error") {
                    console.log('something went wrong, ')
                    setStage(errorfetchingCandidate)
                } else {
                    console.log(res)
                    setUserVerify({
                        username: res.peerUsername,
                        avatar: res.peerAvatar,
                        address: res.peerAddress,
                        publickey: res.peerPublickey
                    })
                    setStage(verifyHome)
                }
            })

        }

    }, [shortcode])


    // Router
    switch (stage) {
        case fetchingCandidate:
            return (
                <SimpleChecklist title="Resolving shortcode" titleDone="Post successfully published." titleError="Something went wrong." status={1}></SimpleChecklist>);
        case errorfetchingCandidate:
            return (
                <SimpleChecklist title="Resolving shortcode" titleDone="Post successfully published." titleError="Could not resolve shortcode. Try again." status={3} errorClick={() => history.goBack()}></SimpleChecklist>);
        case verifyHome:
            return (
                <VerifyHome
                    userVerify={userVerify}
                    nextStage={() => { verificationCall() }}
                />
            );
        case verifyingState:
            return (
                <SimpleChecklist title="Verifying user" titleDone="Post successfully published." titleError="Something went wrong." status={1}></SimpleChecklist>);


        default:
            return <h1>Oops...</h1>;
    }
}

export default VerifyRoot;
