export const initialUserState = {
    userId: 1000,
}

export default function userReducer (state = initialUserState, action: any) {
    return {...state, userId: state.userId + 1 };
}