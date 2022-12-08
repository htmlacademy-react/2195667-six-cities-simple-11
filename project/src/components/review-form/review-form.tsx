import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postComment } from '../../store/action';

type Props = {
  offerId: number;
}

function ReviewForm(props: Props): JSX.Element {
  const { offerId } = props;
  const dispatch = useAppDispatch();
  const [isSending, setIsSending] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: ''
  });

  const dataChangeHandle = (
    evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleSendReview = (evt: MouseEvent<HTMLElement>) => {
    setIsSending(true);
    evt.preventDefault();
    const { rating, review } = reviewData;
    dispatch(postComment({ offerId, comment: review, rating }));
    setReviewData({
      rating: 0,
      review: ''
    });
    setIsSending(false);
  };

  return (
    <form className="reviews__form form">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((i) => (
          <Fragment key={i}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={i}
              id={`${i}-stars`}
              type="radio"
              onChange={dataChangeHandle}
              checked={i.toString() === reviewData.rating.toString()}
              disabled={isSending}
            />
            <label
              htmlFor={`${i}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.review}
        onChange={dataChangeHandle}
        disabled={isSending}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {MIN_COMMENT_LENGTH} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            isSending ||
            reviewData.rating < 1 ||
            reviewData.review.length < MIN_COMMENT_LENGTH ||
            reviewData.review.length > MAX_COMMENT_LENGTH
          }
          onClick={(evt) => {
            handleSendReview(evt);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
