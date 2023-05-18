import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Auth from '../../utils/auth'

const CommentList = ({ comments = [], commentDeleter }) => {

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              
              <div className="p-3 bg-dark text-light">
                {Auth.loggedIn() && comment.commenter === Auth.getProfile().data.username ? (
                  <CloseButton variant='white' id={comment._id} onClick={commentDeleter} />
                ): null
                }
                <h5 className="card-header">
                  {comment.commenter} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
