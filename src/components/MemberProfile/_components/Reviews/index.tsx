import Image from 'next/image';

interface ReviewItemProps {
  title: string;
  details: string;
  img: string;
  name: string;
  date: string;
  rating: string;
  like: string;
  replyButton: string;
}

const CustomerReview3: React.FC = () => {
  return (
    <section className="">
      <div className="container mx-auto px-4 py-6 sm:px-7.5">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-5/12">
            <div className="mb-10 overflow-hidden rounded-sm border border-stroke bg-white px-8 py-8 shadow-default dark:border-strokedark dark:bg-boxdark lg:mb-0 xl:px-11">
              <h3 className="mb-5 text-xl font-semibold text-black dark:text-white sm:text-2xl">
                Customer reviews
              </h3>

              <div className="inline-flex flex-wrap items-center justify-center gap-4 rounded-sm border border-stroke bg-white px-6 py-2.5 dark:border-strokedark dark:bg-boxdark">
                <div className="mr-3 flex items-center gap-1">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <span className="text-sm font-medium text-black dark:text-white">
                  4.7 out of 5
                </span>
              </div>

              <p className="mt-3 mb-8 text-sm font-medium text-body-color dark:text-bodydark">
                40 customer ratings
              </p>

              <div className="space-y-4">
                {[
                  { star: '5 star', width: 'w-[84%]', percentage: '84%' },
                  { star: '4 star', width: 'w-[50%]', percentage: '9%' },
                  { star: '3 star', width: 'w-[40%]', percentage: '4%' },
                  { star: '2 star', width: 'w-[20%]', percentage: '2%' },
                  { star: '1 star', width: 'w-[10%]', percentage: '1%' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-black dark:text-white">
                      {item.star}
                    </span>
                    <div className="relative mx-3 h-2 w-full rounded-full bg-stroke dark:bg-strokedark">
                      <div
                        className={`absolute left-0 top-0 h-full rounded-full bg-[#FFA645] ${item.width}`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-black dark:text-white">
                      {item.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-7/12">
            <ReviewItem
              img="/images/review-01.png"
              name="Jhon Smith"
              date="12, Dec 2024"
              rating="4 of 5"
              like="25"
              title="Quality was not good but it can be better."
              details="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ac risus a risus elementum vehicula. Class aptent taciti sociosqu ad litora torquent consectetur adipiscing elit. Maecenas ac risus a risus elementum"
              replyButton="Reply"
            />
            {/* Add more ReviewItem components as needed */}

            <div className="mb-9 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="px-6 py-8 sm:py-9 md:px-8 xl:px-9">
                <h4 className="mb-5 text-xl font-semibold text-black dark:text-white">
                  Write a Review
                </h4>
                <p className="mb-3 text-sm font-medium text-body-color dark:text-bodydark">
                  Click on star to review
                </p>

                <div className="mb-8 flex items-center gap-1">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <form>
                  <div className="-mx-3 flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2">
                      <InputGroup type="text" placeholder="First Name" />
                    </div>
                    <div className="w-full px-3 sm:w-1/2">
                      <InputGroup type="text" placeholder="Last Name" />
                    </div>
                    <div className="w-full px-3">
                      <InputGroup
                        type="text"
                        placeholder="Type review headline"
                      />
                    </div>
                    <div className="w-full px-3">
                      <TextAreaGroup rows={6} placeholder="Write your Review" />
                    </div>
                    <div className="w-full px-3">
                      <button className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-sm font-medium text-white hover:bg-opacity-90">
                        Submit Review
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewItem: React.FC<ReviewItemProps> = ({
  title,
  details,
  img,
  name,
  date,
  rating,
  like,
  replyButton,
}) => {
  return (
    <div className="mb-9 overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-6 py-8 sm:py-9 md:px-8 xl:px-9">
        <h4 className="mb-4 text-lg font-semibold text-black dark:text-white">
          {title}
        </h4>
        <p className="text-sm text-body-color dark:text-bodydark">{details}</p>
      </div>

      <div className="border-t border-stroke px-6 py-5 dark:border-strokedark md:flex md:items-center md:justify-between">
        <div className="mb-4 flex items-center md:mb-0">
          <div className="mr-4 h-10 w-10 overflow-hidden rounded-full">
            <Image
              src={img}
              alt={name}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-black dark:text-white">
              {name}
            </h3>
            <p className="text-xs text-body-color dark:text-bodydark">{date}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="flex items-center text-body-color hover:text-primary dark:text-bodydark">
            <Star />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </button>
          <button className="flex items-center text-body-color hover:text-primary dark:text-bodydark">
            <ThumbsUp />
            <span className="ml-1 text-sm font-medium">{like}</span>
          </button>
          <button className="text-sm font-medium text-body-color hover:text-primary dark:text-bodydark">
            {replyButton}
          </button>
        </div>
      </div>
    </div>
  );
};

const Star: React.FC = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.6562 7.46875L12.9999 6.59375L10.4375 1.21875C10.25 0.84375 9.74995 0.84375 9.56245 1.21875L6.99995 6.625L1.37495 7.46875C0.9687 7.53125 0.81245 8.0625 1.12495 8.34375L5.2187 12.5625L4.24995 18.4687C4.18745 18.875 4.5937 19.2188 4.9687 18.9688L10.0624 16.1875L15.1249 18.9688C15.4687 19.1563 15.9062 18.8437 15.8124 18.4687L14.8437 12.5625L18.9374 8.34375C19.1874 8.0625 19.0624 7.53125 18.6562 7.46875Z"
        fill="#FFA645"
      />
    </svg>
  );
};

const ThumbsUp: React.FC = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0625 7.1875C17.5 6.71875 16.8125 6.46875 16.0937 6.46875H13.125V4.53125C13.125 3.1875 12.7187 2.1875 11.875 1.59375C11.3437 1.21875 10.7187 1.03125 9.96875 1.03125C9.28125 1.03125 8.78125 1.1875 8.78125 1.1875C8.3125 1.3125 8 1.78125 8 2.25V5.21875C8 6.40625 7.03125 7.09375 6.34375 7.4375C6.25 7.1875 6 7 5.6875 7H2.5C1.59375 7 0.875 7.75 0.875 8.625V17.4062C0.875 18.3125 1.625 19.0312 2.5 19.0312H5.6875C5.96875 19.0312 6.21875 18.8438 6.34375 18.625C6.6875 18.75 7.0625 18.8438 7.4375 18.8438H14.6875C16.6562 18.8438 17.9687 17.75 18.1875 15.9375L19.125 10.125C19.2812 9 18.875 7.90625 18.0625 7.1875ZM5 17.5938H2.5C2.375 17.5938 2.25 17.5 2.25 17.3438V8.59375C2.25 8.46875 2.34375 8.34375 2.5 8.34375H5V17.5938ZM17.7187 9.84375L16.7812 15.6875C16.5937 17.0938 15.5312 17.375 14.6875 17.375H7.4375C7.0625 17.375 6.71875 17.25 6.40625 17V8.9375C7.65625 8.46875 9.40625 7.28125 9.40625 5.21875V2.46875C9.53125 2.4375 9.75 2.40625 9.96875 2.40625C10.4062 2.40625 10.75 2.5 11.0312 2.71875C11.4687 3.0625 11.7187 3.65625 11.7187 4.53125V6.59375C11.7187 7.3125 12.2812 7.875 13 7.875H16.0937C16.4687 7.875 16.8437 8.03125 17.1562 8.28125C17.5938 8.65625 17.8125 9.25 17.7187 9.84375Z"
        fill="currentColor"
      />
    </svg>
  );
};

interface InputGroupProps {
  type: string;
  placeholder: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ type, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-sm border border-stroke bg-white px-5 py-3 text-sm text-body-color outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:focus:border-primary"
      />
    </div>
  );
};

interface TextAreaGroupProps {
  rows: number;
  placeholder: string;
}

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({ rows, placeholder }) => {
  return (
    <div className="mb-4">
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-sm border border-stroke bg-white px-5 py-3 text-sm text-body-color outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark dark:focus:border-primary"
      ></textarea>
    </div>
  );
};

export default CustomerReview3;
