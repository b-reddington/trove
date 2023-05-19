import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Auth from '../../utils/auth'
import { Col, Row } from 'react-bootstrap/';

const CommentList = ({ comments = [], commentDeleter }) => {

  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <div className="flex-row">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">

              <div className="p-3 commentBody">
                {Auth.loggedIn() && comment.commenter === Auth.getProfile().data.username ? (
                  <CloseButton variant='dark' id={comment._id} onClick={commentDeleter} />
                ) : null
                }
                <Row>
                  {comment.commenter} commented{' '}

                </Row>
                <Row>
                  <p className="mt-2">{comment.commentText}</p>
                </Row>
                <Row>
                  <div style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </div>
                </Row>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
