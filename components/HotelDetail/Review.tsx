"use client";

import {
  Box,
  CircularProgress,
  Dialog,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import RatingReadOnly from "../ui/RatingReadOnly";
import ReviewsCarousel from "./ReviewsCarousel";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { reviewGetWithHotelId, reviewPost } from "@/api/review";
import { hotelFindById } from "@/api/hotel";
import { toast } from "react-toastify";
import { currentUser } from "@/api/user";
import { LoadingButton } from "@mui/lab";

type Review = {
  id: number;
  title: string;
  content: string;
  rating: number;
  date: string;
};

export default function Review() {
  const [openReview, setOpenReview] = useState<boolean>(false);

  const [user, setUser] = useState();

  const params = useParams<{ hotelID: string }>();

  const [overallRating, setOverallRating] = useState<{
    rate: number | null;
    reviewCount: number | null;
  }>({
    rate: null,
    reviewCount: null,
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number | null>(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const boxRef = useRef<HTMLDivElement>(null);

  // Handle scroll to the bottom
  const handleScroll = () => {
    const element = boxRef.current;
    if (!element) return;

    const isBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;

    if (isBottom && !isLoadingReview && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !rating || !content) {
      setError("Hãy điền đủ thông tin!");
      return;
    }

    setError("");
    setIsLoadingPost(true);
  };

  const fetchCurrentUser = async () => {
    const userData = await currentUser();

    setUser(userData.user);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (isLoadingPost) {
      const postReview = async () => {
        // Post comment
        const data = await reviewPost({
          title,
          rating: rating ?? 0,
          content,
          hotelId: params.hotelID,
        });

        if (data && data.doc) {
          toast.success("Đăng đánh giá thành công");

          setOverallRating((prev) => {
            const prevRate = prev.rate ?? 0;
            const prevCount = prev.reviewCount ?? 0;

            if (prevCount === 0) {
              return {
                rate: Number(data.doc.score),
                reviewCount: 1,
              };
            }

            return {
              rate: (prevRate + Number(data.doc.score)) / 2,
              reviewCount: prevCount + 1,
            };
          });

          setReviews((prev) => [
            {
              id: data.doc.id,
              title: data.doc.subject,
              content: data.doc.content,
              rating: data.doc.score,
              date: data.doc.createdAt,
            },
            ...prev,
          ]);
        } else {
          toast.error("Đăng đánh giá thất bại");
        }

        setIsLoadingPost(false);
      };

      postReview();
    }
  }, [isLoadingPost]);

  // Get more reviews if current page changes
  useEffect(() => {
    if (!isLoadingReview && currentPage > 1) {
      setIsLoadingReview(true);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLoadingReview) {
      const fetchReviewWithHotelIdNextPage = async () => {
        const data = await reviewGetWithHotelId(params.hotelID, currentPage);

        if (data && data.docs && data.docs.length >= 1) {
          setReviews((prev) => [
            ...prev,
            ...data.docs.map((review: any) => ({
              id: review.id,
              title: review.subject,
              content: review.content,
              rating: review.score,
              date: review.createdAt,
            })),
          ]);
        }

        setIsLoadingReview(false);
      };

      fetchReviewWithHotelIdNextPage();
    }
  }, [isLoadingReview]);

  // Get review first page
  useEffect(() => {
    if (isLoading) {
      const fetchReviewWithHotelId = async () => {
        const data = await reviewGetWithHotelId(params.hotelID, 1);

        const hotelData = await hotelFindById(params.hotelID);

        // set overall rating
        if (hotelData) {
          setOverallRating({
            rate: hotelData.reviews.score,
            reviewCount: hotelData.reviews.review_count,
          });
        }

        if (data && data.docs && data.docs.length >= 1) {
          setTotalPages(data.totalPages);

          setReviews(
            data.docs.map((review: any) => ({
              id: review.id,
              title: review.subject,
              content: review.content,
              rating: review.score,
              date: review.createdAt,
            }))
          );
        }

        setIsLoading(false);
      };

      fetchReviewWithHotelId();
    }
  }, [isLoading]);

  return (
    <Box>
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Đánh giá khách hàng
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" gap={1}>
            <RatingReadOnly value={overallRating.rate || 0} size="medium" />
            <Typography variant="body2" color="text.secondary">
              {overallRating.rate}/5 (dựa trên {overallRating.reviewCount} đánh
              giá)
            </Typography>
          </Box>

          <Typography variant="h6" fontWeight="600" gutterBottom mt={3}>
            Đánh giá gần đây
          </Typography>

          <ReviewsCarousel
            reviews={reviews}
            setOpenReview={setOpenReview}
            setCurrentPage={setCurrentPage}
          />

          {/* Show review detail */}
          <Dialog open={openReview} onClose={() => setOpenReview(false)}>
            <Box
              p={3}
              display="flex"
              flexDirection="column"
              height={803}
              gap={2}
            >
              <Typography variant="h6" gutterBottom textAlign="center">
                Đánh giá khách hàng
              </Typography>
              <Divider />
              <RatingReadOnly size="large" value={overallRating.rate || 0} />
              <Divider />
              <Box
                ref={boxRef}
                sx={{ overflowY: "scroll" }}
                onScroll={handleScroll}
              >
                <Typography variant="h6">Đánh giá gần đây</Typography>

                {reviews.map((element) => (
                  <Box key={element.id + "review_detail"} mt={3}>
                    <Box mb={1} display="flex" alignItems="center">
                      <RatingReadOnly value={element.rating} size="medium" />
                      <Typography ml={2} variant="body2" color="text.secondary">
                        {new Date(element.date).toLocaleString()}
                      </Typography>
                    </Box>

                    <Typography fontWeight={500} gutterBottom>
                      {element.title}
                    </Typography>
                    <Typography>{element.content}</Typography>
                    <Divider sx={{ mt: 3 }} />
                  </Box>
                ))}

                {isLoadingReview && (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress />
                  </Box>
                )}
              </Box>
            </Box>
          </Dialog>
          {/* End show review detail */}
        </>
      )}

      <Divider sx={{ my: 3 }} />

      {user && (
        <>
          {/* Review section */}
          <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
            <Typography
              variant="h4"
              align="center"
              fontWeight={600}
              sx={{
                textTransform: "uppercase",
                letterSpacing: 1.2,
                color: "text.primary",
              }}
              gutterBottom
            >
              Đánh giá của bạn
            </Typography>

            {/* Display error if any */}
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}

            {/* Review Submission Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Rating
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                precision={0.5}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                label="Tiêu đề"
                multiline
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Viết đánh giá"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <LoadingButton
                loading={isLoadingPost}
                loadingPosition="start"
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  mt: 2,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  boxShadow: 3,
                  ":hover": {
                    boxShadow: 4,
                    backgroundColor: "#c9302c",
                  },
                  transition: "background-color 0.3s, box-shadow 0.3s",
                }}
              >
                Đăng review của bạn
              </LoadingButton>
            </Box>
          </Box>
          {/* End review section */}
        </>
      )}
    </Box>
  );
}
