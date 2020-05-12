export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asymc call to database
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        const firestore = getFirestore();
        firestore.collection('projects').add({
            comments: project.comments,
            description: project.description,
            percentages: project.percentages,
            tickers: project.tickers,
            tickerNames: project.tickerNames,
            ratings: project.ratings,
            title: project.title,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()

        }).then(() => {
            dispatch({ type: 'CREATE_PROJECT', project });
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err })
        })

    }
};

export const createComment = (comment, id) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asymc call to database
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
       

        const newComment = {
            content: comment,
            user: `${profile.firstName} ${profile.lastName}`,
            time: new Date()
        }

        const firestore = getFirestore();
        firestore.collection('projects').doc(id).update({
            comments: firestore.FieldValue.arrayUnion(newComment)
        }).then(() => {
                dispatch({ type: 'CREATE_COMMENT', comment });
            }).catch((err) => {
                dispatch({ type: 'CREATE_COMMENT_ERROR', err })
            })
    }

};

export const createRating = (rating, id) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make asymc call to database
       
        const firestore = getFirestore();
        firestore.collection('projects').doc(id).update({
            ratings: firestore.FieldValue.arrayUnion(rating)
        }).then(() => {
                dispatch({ type: 'CREATE_RATING', rating });
            }).catch((err) => {
                dispatch({ type: 'CREATE_RATING_ERROR', err })
            })
    }

};