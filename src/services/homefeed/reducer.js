import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = [

    {
        _id: '2020-06-08T17:31:40.972Z',
        type: 'post',
        image: 'dummyboots.png',
        format: 'image',
        user: 'Prada',
        avatar: 'ava-prada.png',
        likes: 14,
        ilike: false,
        location: 'Rotterdam',
        time: '2020-06-08T17:31:40.972Z',
        description: 'Soon for sale here! #leather #shoe'
    },
    {
        _id: '2020-06-08T13:51:40.972Z',
        type: 'fundraiser',
        format: 'video',
        image: 'slavefreetradeexplainer.mp4',
        user: 'SlaveFreeTrade',
        avatar: 'ava_sft.png',
        likes: 19,
        ilike: false,
        location: 'Fundraiser',
        time: '2020-06-08T13:51:40.972Z',
        description: 'The worlds 1st human rights compliance platform.Buy free of #modernslavery.The means to know what is Made in Freedom™.'
    },
    {
        _id: '2020-06-08T11:51:40.972Z',
        type: 'post',
        image: 'dummy_kev.png',
        format: 'image',
        user: 'Kevin',
        avatar: 'ava_kev.png',
        likes: 23,
        ilike: false,
        location: 'Greater LA',
        time: '2020-06-08T11:51:40.972Z',
        description: 'Lyra attacking the dog lol'
    },
    {
        _id: '2020-06-08T19:51:40.972Z',
        type: 'sponsored',
        image: 'dummy6.png',
        format: 'image',
        user: 'True Environmentalists',
        avatar: 'ava_environ.png',
        ilike: true,
        likes: 8,
        location: 'Sponsored',
        time: '2020-06-08T19:51:40.972Z',
        description: 'Farming in the United States is more than an occupation and a way of life. It’s an essential component of world nutrition, health and economics.'
    },
    {
        _id: '2020-06-08T13:51:40.972Z',
        type: 'post',
        image: 'dummy_orange.png',
        format: 'image',
        user: 'Edina',
        avatar: 'ava_edina.png',
        likes: 19,
        ilike: false,
        location: 'Budapest',
        time: '2020-06-08T13:51:40.972Z',
        description: 'Our next event, Swarm Alpha is coming on 29/06 20:00 CEST. Besides adding a rare NFT to your collection you can also learn about the super cool projects building on Swarm and get more details about the BZZ token.'
    },
    {
        _id: '2020-06-08T13:51:20.972Z',
        type: 'shop',
        image: 'dummy_prada2.png',
        format: 'image',
        user: 'Prada',
        avatar: 'ava-prada.png',
        likes: 19,
        ilike: false,
        location: 'BXL',
        time: '2020-06-08T13:51:20.972Z',
        description: 'Shop our new collection'
    },
];

function homefeed(state = initialState, action) {
    switch (action.type) {
        case t.SET_LIKE:
            return state.map((item) =>
                item._id === action.data._id
                    ? {
                        ...item,
                        ...action.data
                    }
                    : item
            );
        default:
            return state;
    }
}

// const homefeed = persistentReducer(homefeedState, {
//     name: "homefeed"
// });

export default homefeed
