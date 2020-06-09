import { persistentReducer } from "redux-pouchdb-plus";

// Service > user

const initialState = [
    {
        type: 'sponsored',
        image: 'dummy0.png',
        format: 'image',
        user: 'Mike The Dealer',
        avatar: null,
        likes: 8,
        location: 'Sponsored',
        time: '2020-06-08T19:51:40.972Z',
        description: 'High grade Dutch Kush - limited available'
    },
    {
        type: 'post',
        image: 'dummy1.png',
        format: 'image',
        user: 'Mr. Phil the Pill',
        avatar: null,
        likes: 14,
        location: 'Rotterdam',
        time: '2020-06-08T17:31:40.972Z',
        description: 'XTC MDMA First Class'
    },
    {
        type: 'fundraiser',
        format: 'video',
        image: 'slavefreetradeexplainer.mp4',
        user: 'SlaveFreeTrade',
        avatar: null,
        likes: 19,
        location: 'Fundraiser',
        time: '2020-06-08T13:51:40.972Z',
        description: 'The worlds 1st human rights compliance platform.Buy free of #modernslavery.The means to know what is Made in Freedom™.'
    },
    {
        type: 'post',
        image: 'dummy3.png',
        format: 'image',
        user: 'Skunk & Nancy',
        avatar: null,
        likes: 23,
        location: 'Breda',
        time: '2020-06-08T11:51:40.972Z',
        description: ''
    },
    {
        type: 'post',
        image: 'dummy4.png',
        format: 'image',
        user: 'PussyLovers',
        avatar: null,
        likes: 19,
        location: 'LA',
        time: '2020-06-08T13:51:40.972Z',
        description: 'Lemon Haze'
    },
    {
        type: 'shop',
        image: 'dummy5.png',
        format: 'image',
        user: 'OnceUponATime',
        avatar: null,
        likes: 19,
        location: 'BXL',
        time: '2020-06-08T13:51:40.972Z',
        description: 'Finest Haze: 100 gr 550, 50gr 280, 25gr 150'
    },
];

function homefeedState(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

const homefeed = persistentReducer(homefeedState, {
    name: "homefeed"
});

export default homefeed
