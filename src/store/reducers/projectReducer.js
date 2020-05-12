const initState = {
    projects: [
        {id: '1', title: 'first title', content: 'first content bla'},
        {id: '2', title: 'second title', content: 'second content bla'},
        {id: '3', title: 'third title', content: 'third content bla'},
    ]
}

const projectReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log('created project', action.project)
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('create project error', action.err);
            return state;
        case 'CREATE_COMMENT':
            console.log('created comment', action.project)
            return state;
        case 'CREATE_COMMENT_ERROR':
            console.log('created comment error', action.err)
            return state;
            case 'CREATE_RATING':
                console.log('created rating', action.project)
                return state;
            case 'CREATE_RATING_ERROR':
                console.log('created rating error', action.err)
                return state;
        default:
            return state;
    }
}

export default projectReducer