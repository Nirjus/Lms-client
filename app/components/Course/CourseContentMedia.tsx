import { style } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatarPng from "../../assets/images/4532503.png";
import { toast } from "react-toastify";
import {
  useAddAnswerMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCoursesDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiFastForward, BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";

type Props = {
  data: any;
  id: string;
  user: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  user,
  activeVideo,
  setActiveVideo,
  refetch,
}: Props) => {
  const [addNewQuestion, { isSuccess, error, isLoading: questionLoading }] =
    useAddNewQuestionMutation();
  const [
    addAnswer,
    { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading },
  ] = useAddAnswerMutation();
  const [
    addReviewInCourse,
    { isSuccess: reviewSuccess, isLoading: reviewLoading, error: reviewError },
  ] = useAddReviewInCourseMutation();
  const { data: courseData, refetch: courseRefetch } =
    useGetCoursesDetailsQuery(id, {
      refetchOnMountOrArgChange: true,
    });
  const [
    addReplyInReview,
    { isSuccess: replySuccess, error: replyError, isLoading: replyLoading },
  ] = useAddReplyInReviewMutation();
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const course = courseData?.course;

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestionSubmit = () => {
    if (question.length === 0) {
      toast.error("Question can not be empty!");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successFully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, refetch, error]);
  useEffect(() => {
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [answerSuccess, answerError, refetch]);
  useEffect(() => {
    if (reviewSuccess) {
      setReview("");
      courseRefetch();
      toast.success("Review added successfully");
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [reviewSuccess, reviewError, courseRefetch]);

  useEffect(() => {
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = replyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [replySuccess, replyError, courseRefetch]);
  const handleAnswerSubmit = () => {
    addAnswer({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can not be empty");
    } else {
      addReviewInCourse({
        review,
        rating,
        courseId: id,
      });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyLoading) {
      if (reply === "") {
        toast.error("Reply can not be empty");
      } else {
        addReplyInReview({
          comment: reply,
          courseId: id,
          reviewId: reviewId,
        });
      }
    }
  };

  return (
    <div className=" w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${style.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop !opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className=" mr-2" /> Prev Lesson
        </div>
        <div
          className={`${style.button} !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop !opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className=" mr-2" />
        </div>
      </div>
      <h1 className=" pt-2 text-[25px] font-[600] text-black dark:text-white">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((item, index) => (
          <h5
            key={index}
            className={`800px:text-[20px]  cursor-pointer ${
              activeBar === index
                ? " text-red-500"
                : " text-black dark:text-white"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {item}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className=" text-[18px] text-black dark:text-white whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div key={index} className=" mb-5">
              <h2 className=" 800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title + " :"}
              </h2>
              <a
                className=" inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
                target="_blank"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user?.avatar ? user?.avatar?.url : avatarPng}
              width={50}
              height={50}
              className=" rounded-full w-[50px] h-[50px] object-cover"
              alt="avatar"
            />
            <textarea
              name=""
              id=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your question.."
              className={
                " outline-none bg-transparent ml-3 border border-[#9c99997f] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              }
            ></textarea>
          </div>
          <div className=" w-full flex justify-end">
            <div
              className={`${style.button} !w-[120px] !h-[40px] ${
                questionLoading && " !cursor-no-drop"
              }`}
              onClick={questionLoading ? () => {} : handleQuestionSubmit}
            >
              Submit
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#85838380]"></div>
          <div className="">
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerLoading={answerLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={user?.avatar ? user?.avatar?.url : avatarPng}
                    width={50}
                    height={50}
                    className=" rounded-full w-[50px] h-[50px] object-cover"
                    alt="avatar"
                  />
                  <div className="w-full">
                    <h5 className=" pl-3 text-[20px] font-[500] text-black dark:text-white">
                      Give a Rating <span className=" text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      id=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      cols={30}
                      rows={5}
                      placeholder="Write your review.."
                      className={
                        " outline-none bg-transparent 800px:ml-3 border border-[#8b898988] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${style.button} !w-[120px] !h-[40px] ${
                      reviewLoading && "cursor-no-drop"
                    }`}
                    onClick={reviewLoading ? () => {} : handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#8786868b]"></div>
            <div className="w-full">
              {(course?.reviews && [...course?.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full my-5" key={index}>
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item?.user?.avatar
                              ? item?.user?.avatar?.url
                              : avatarPng
                          }
                          width={50}
                          height={50}
                          className=" rounded-full w-[50px] h-[50px] object-cover"
                          alt="avatar"
                        />
                      </div>
                      <div className="pl-3">
                        <h1 className=" text-[18px]">{item?.user?.name}</h1>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className=" text-[#373636dd] dark:text-[#d6d3d397]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                    {user.role == "admin" && (
                      <span
                        className={` !ml-10 cursor-pointer flex gap-2 text-[15px] items-center`}
                        onClick={() => {
                          setIsReviewReply(!isReviewReply), setReviewId(item._id);
                        }}
                      >
                        Add Reply{" "}
                        <BiMessage
                          size={20}
                          className=" cursor-pointer text-black dark:text-white"
                        />
                      </span>
                    )}
                    {isReviewReply && (
                      <div className=" w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter your reply.."
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                          className={`${style.input} !bg-transparent !border-b border-[0px] ml-[3%] !rounded-none w-[90%]`}
                        />
                        <button
                          type="submit"
                          className={` text-white bg-slate-500 p-1 px-3 rounded-r-full absolute right-0 bottom-0  ${
                            reply === "" || replyLoading
                              ? "active:bg-slate-500 cursor-not-allowed"
                              : "active:bg-slate-700"
                          }`}
                          onClick={handleReviewReplySubmit}
                          disabled={reply === "" || replyLoading}
                        >
                          <BiFastForward size={25} />
                        </button>
                      </div>
                    )}
                    {
                      item.commentReplies.map((i:any, index:number) => (
                        <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div>
                          <Image
                            src={
                              i?.user?.avatar
                                ? i?.user?.avatar?.url
                                : avatarPng
                            }
                            width={50}
                            height={50}
                            className=" rounded-full w-[50px] h-[50px] object-cover"
                            alt="avatar"
                          />
                        </div>
                        <div className="pl-3">
                         <div className="flex items-center gap-1">
                         <h1 className=" text-[18px]">{i?.user?.name}</h1>
                          {i?.user.role === "admin" && (
                      <VscVerifiedFilled
                        size={20}
                        className=" text-[#4d83e6]"
                      />
                    )}
                         </div>
                  
                          <p>{i.comment}</p>
                          <small className=" text-[#373636dd] dark:text-[#d6d3d397]">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                      ))
                    }
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            item={item}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerLoading={answerLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item?.user?.avatar ? item?.user?.avatar?.url : avatarPng}
              width={50}
              height={50}
              className=" rounded-full w-[50px] h-[50px] object-cover"
              alt="avatar"
            />
          </div>
          <div className="pl-3">
            <h5 className=" text-[20px] dark:text-white text-black">
              {item?.user?.name}
            </h5>
            <p>{item?.question}</p>
            <small className=" text-[#6f6f6f] dark:text-[#cecacab8]">
              {format(item?.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className=" 800px:pl-16 text-[#5a5a5a] dark:text-[#a8a8a8] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item?._id);
            }}
          >
            {!replyActive
              ? item?.questionReplies.length === 0
                ? "Add Reply"
                : "All Replies "
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className=" cursor-pointer text-black dark:text-white"
          />
          <span className=" pl-1 mt-[-4px] cursor-pointer text-black dark:text-white">
            {item?.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((reply: any, Replyindex: any) => (
              <div
                className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
                key={Replyindex}
              >
                <div>
                  <Image
                    src={
                      reply?.user?.avatar ? reply?.user?.avatar?.url : avatarPng
                    }
                    width={50}
                    height={50}
                    className=" rounded-full w-[50px] h-[50px] object-cover"
                    alt="avatar"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center gap-2">
                    <h5 className=" text-[20px] dark:text-white text-black">
                      {reply?.user?.name}
                    </h5>{" "}
                    {reply?.user.role === "admin" && (
                      <VscVerifiedFilled
                        size={20}
                        className=" text-[#4d83e6]"
                      />
                    )}
                  </div>
                  <p className="dark:text-white text-black">{reply?.answer}</p>
                  <small className="text-[#6f6f6f] dark:text-[#cecacab8]">
                    {format(reply?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  placeholder=" Enter Your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className=" black 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#4a4a4ac8] dark:border-[#e2e2e2be] p-[5px] w-[95%]"
                />
                <button
                  type="submit"
                  className={` text-white bg-slate-500 p-1 px-3 rounded-r-full absolute right-0 bottom-0  ${
                    answer === "" || answerLoading
                      ? "active:bg-slate-500 cursor-not-allowed"
                      : "active:bg-slate-700"
                  }`}
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerLoading}
                >
                  <BiFastForward size={25} />
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
