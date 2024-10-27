import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCollaboratorsForBoardAction } from '../redux/actions/collaboratorsAction';

const useCollaborators = ({ board }) => {
    const boardId = board?.ExpenseBoardId;
    const dispatch = useDispatch();
    const collaborators = useSelector((state) => state.collaborators.collaboratorsByBoard[boardId] || []);
    const { loading, error } = useSelector((state) => state.collaborators); // 'state.collaborators' should exist

    useEffect(() => {
        dispatch(fetchCollaboratorsForBoardAction(boardId));
    }, [ boardId, dispatch]);

    const reloadCollaborators = (boardId) => {
        if (boardId) {
            dispatch(fetchCollaboratorsForBoardAction(boardId));
        }
    };

    return {
        collaborators,
        loading,
        error,
        reloadCollaborators,
    };
};

export default useCollaborators;
