import { Comment } from '../../types/comments';
import { formatDate } from '../../utils/date';
import { countRatingStars } from '../../utils/rating';

type Props = {
  comment: Comment;
}

function ReviewItem(props: Props) {
  const { comment } = props;
  const user = comment.user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt={user.name}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: countRatingStars(comment.rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={comment.date}>
          {formatDate(comment.date)}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
