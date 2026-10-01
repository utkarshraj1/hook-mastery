import { useReducer, useRef } from "react";

function bookmarkReducer = (state, action) {
    switch (action.type) {
        case 'ADD':
            if (state.some(item => item.id === action.payload.id)) return state;
        case 'REMOVE':
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
}

export function BookmarkManager({ onBookmarkSelect }) {
    const [bookmarks, dispatch] = useReducer(bookmarkReducer, []);
    const quickNoteRef = useRef(null);

    const focusInput = () => {
        quickNoteRef.current?.focus();
    };

    return (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <h3>Saved Repositories ({bookmarks.length})</h3>
            <button onClick={focusInput}>Focus Note Input (useRef)</button>
            <input ref={quickNoteRef} placeholder="Quick note..." style={{ marginLeft: '10px' }} />

            <ul>
                {
                    bookmarks.map(repo => {
                        return (
                            <li key={repo.id}>
                                {repo.name} - ⭐ {repo.stargazers_count}
                                <button
                                    onClick={() => dispatch({ type: 'REMOVE', payload: repo.id })}
                                    style={{ marginLeft: '8px' }}
                                >
                                    Remove
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}