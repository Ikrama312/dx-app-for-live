const Preference = {
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken',
}

export const GoogleApiKey = 'AIzaSyAmBtVFhTWCdEl3or4YpJkyAcBm81zZ5Kk';

const USER_TYPES = {
    DEALER: 'dealer',
    DRIVER: 'driver'
}

const Constants = {
    userType: USER_TYPES.DEALER
}

function getUserType() {
    return Constants.userType
}

function setUserDealer() {
    Constants.userType = USER_TYPES.DEALER
}

function setUserDriver() {
    Constants.userType = USER_TYPES.DRIVER
}

const IMAGE_TYPES = [
    {
        id: 'front',
        name: 'Front',
    },
    {
        id: 'back',
        name: 'Back',
    },
    {
        id: 'front_left',
        name: 'Front Left',
    },
    {
        id: 'front_right',
        name: 'Front Right',
    },
    {
        id: 'back_left',
        name: 'Back Left',
    },
    {
        id: 'back_right',
        name: 'Back Right',
    },
    {
        id: 'head_light',
        name: 'Head Lights',
    },
    {
        id: 'tail_lights',
        name: 'Tail Lights',
    },
    {
        id: 'trunk',
        name: 'Trunk',
    },
    {
        id: 'front_seat',
        name: 'Front Seats',
    },
    {
        id: 'back_seat',
        name: 'Back Seats',
    },
    {
        id: 'dashboard',
        name: 'Dashboard',
    },
]

const INITIAL_REGION = {
    latitude: 32.194711,
    longitude: 74.179789,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const DX_STATUS = {
    NEW: 'new',
    ASSIGNED: 'assigned',
    STARTED: 'started',
    PICKED: "picked",
    DELIVERED: 'delivered',
    COMFIRMED: 'confirmed'
}

export default {
    setUserDealer,
    setUserDriver,
    getUserType,
    Preference,
    IMAGE_TYPES,
    USER_TYPES,
    INITIAL_REGION,
    DX_STATUS
};