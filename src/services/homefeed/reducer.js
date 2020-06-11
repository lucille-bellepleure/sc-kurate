import * as t from "./actionTypes";
import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = [

    {
        _id: '2020-06-08T17:31:40.972Z',
        type: 'post',
        image: 'dummy1.png',
        format: 'image',
        user: 'Mr. Phil the Pill',
        avatar: 'ava_pill.png',
        likes: 14,
        ilike: false,
        location: 'Rotterdam',
        time: '2020-06-08T17:31:40.972Z',
        description: 'Got my first batch in. Soon for sale here! #XTC #MDMA'
    },
    {
        _id: '2020-06-08T13:51:40.972Z',
        type: 'fundraiser',
        format: 'video',
        image: 'slavefreetradeexplainer.mp4',
        user: 'SlaveFreeTrade',
        avatar: 'ava_sft.png',
        likes: 19,
        ilike: true,
        location: 'Fundraiser',
        time: '2020-06-08T13:51:40.972Z',
        description: 'The worlds 1st human rights compliance platform.Buy free of #modernslavery.The means to know what is Made in Freedom™.'
    },
    {
        _id: '2020-06-08T11:51:40.972Z',
        type: 'post',
        image: 'dummy3.png',
        format: 'image',
        user: 'Skunk & Nancy',
        avatar: 'ava_skunk.png',
        likes: 23,
        ilike: false,
        location: 'Breda',
        time: '2020-06-08T11:51:40.972Z',
        description: ''
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
        image: 'dummy4.png',
        format: 'image',
        user: 'PussyLovers',
        avatar: 'ava_pussy.png',
        likes: 19,
        ilike: true,
        location: 'LA',
        time: '2020-06-08T13:51:40.972Z',
        description: 'Lemon Haze'
    },
    {
        _id: '2020-06-08T13:51:20.972Z',
        type: 'shop',
        image: 'dummy5.png',
        format: 'image',
        user: 'OnceUponATime',
        avatar: 'defaultAvatar.png',
        likes: 19,
        ilike: false,
        location: 'BXL',
        time: '2020-06-08T13:51:20.972Z',
        description: 'Finest Haze: 100 gr 550, 50gr 280, 25gr 150'
    },
];

function homefeedState(state = initialState, action) {
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

const homefeed = persistentReducer(homefeedState, {
    name: "homefeed"
});

export default homefeed
