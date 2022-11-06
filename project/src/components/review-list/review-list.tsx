import { Comments } from '../../types/comments';
import ReviewItem from '../review-item/review-item';

type Props = {
  comments: Comments;
}

function ReviewList(props: Props) {
  const { comments } = props;

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <ReviewItem comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

export default ReviewList;
