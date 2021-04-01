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

// function getUserFromState(state, address) {
//     return state.users[address]
// }

// function getUser(state) {
//     return state.account
// }

export function VerifyRoot() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [stage, setStage] = useState(fetchingCandidate)

    const [userVerify, setUserVerify] = useState({ username: "Fetching", avatar: "Fetching" })

    // const [userfeed, setUserfeed] = useState([])
    // const [usersubs, setUsersubs] = useState([])

    // const account = useSelector(state => getUser(state))

    const params = useParams()
    const shortcode = params.shortcode

    // const user = useSelector(state => getUserFromState(state, address))

    useEffect(() => {
        if (shortcode) {
            h.resolveShortcode(shortcode).then(res => {
                if (res == "error") {
                    console.log('something went wrong, ')
                    setStage(errorfetchingCandidate)
                } else {
                    console.log(res)
                    setUserVerify({
                        username: res.peerUsername,
                        avatar: res.peerAvatar,
                        address: res.peerAddress
                    })
                    setStage(verifyHome)
                }
            })

        }

    }, [params.shortcode])


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
                    nextStage={() => setStage()}
                />
            );


        default:
            return <h1>Oops...</h1>;
    }
}

export default VerifyRoot;
