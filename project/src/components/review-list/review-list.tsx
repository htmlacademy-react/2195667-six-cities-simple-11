import { Comments } from '../../types/comments';
import ReviewItem from '../review-item/review-item';

type Props = {
  comments: Comments;
}

function ReviewList(props: Props): JSX.Element {
  const { comments } = props;
  let sorted: Comments = [];

  if (comments.length > 1) {
    sorted = [...comments]
      .sort(
        (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
      )
      .slice(0, 10);
  } else {
    sorted = comments;
  }

  return (
    <ul className="reviews__list">
      {sorted.map((comment) => (
        <ReviewItem comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

export default ReviewList;
