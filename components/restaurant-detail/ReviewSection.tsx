import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import ResRatingReadOnly from "../ResRatingReadOnly";
import ResRating from "../ResRating";

export default function ReviewSection() {
  return (
    <Box>
      {/* Overall review */}
      <Box display="flex" flexDirection="column" gap={2} mb={5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            gutterBottom
            variant="h3"
            fontWeight={600}
            component="span"
          >
            4.0
          </Typography>

          <ResRatingReadOnly value={4} showLabel={false} />
          <Typography mt={1} component="span">
            trên tổng 23 reviews
          </Typography>
        </Box>

        <TotalReviewBar title="Excellent" value={50} color="#4CAF50" />
        <TotalReviewBar title="Good" value={50} color="#00C853" />
        <TotalReviewBar title="Average" value={70} color="#FFEB3B" />
        <TotalReviewBar title="Below Average" value={50} color="#FF9800" />
        <TotalReviewBar title="Poor" value={50} color="#F44336" />
      </Box>
      {/* End overall review */}

      <Divider />

      {/* Review section */}
      <Box display="flex" flexDirection="column" gap={5} my={5}>
        <ReviewRow
          avatarImg="Hello.png"
          userName="John Cena"
          content="I was pleasantly surprised by this book. The plot was engaging, and the characters were complex and relatable. I would highly recommend it to anyone who enjoys well-written fiction."
          ratings={3.5}
          timeAgo="1 day ago"
        />
        <ReviewRow
          avatarImg="Hello.png"
          userName="John Cena"
          content="I was pleasantly surprised by this book. The plot was engaging, and the characters were complex and relatable. I would highly recommend it to anyone who enjoys well-written fiction."
          ratings={3.5}
          timeAgo="1 month ago"
        />
        <ReviewRow
          avatarImg="Hello.png"
          userName="John Cena"
          content="I was pleasantly surprised by this book. The plot was engaging, and the characters were complex and relatable. I would highly recommend it to anyone who enjoys well-written fiction."
          ratings={3.5}
          timeAgo="1 year ago"
        />
      </Box>
      {/* End Review section */}

      {/* Write review section */}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          id="input-review"
          placeholder="Viết đánh giá của bạn..."
          rows={4}
          multiline
          fullWidth
        />

        <Box display="flex" gap={2}>
          <Typography component="span" fontWeight={600}>
            Đánh giá:
          </Typography>
          <ResRating />
        </Box>

        <Box>
          <Button variant="contained" sx={{ py: 1.5 }}>
            Gửi đánh giá
          </Button>
        </Box>
      </Box>
      {/* End Write review section */}
    </Box>
  );
}

function ReviewRow({
  avatarImg,
  userName,
  content,
  ratings,
  timeAgo,
}: {
  avatarImg: string;
  userName: string;
  content: string;
  ratings: number;
  timeAgo: string;
}) {
  return (
    <>
      <Box display="flex" gap={2}>
        <Avatar alt="User" src={avatarImg} />
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Box>
              <Typography variant="h6" component="h2">
                {userName}
              </Typography>
              <ResRatingReadOnly value={ratings} showLabel={false} />
            </Box>

            <Typography component="span">{timeAgo}</Typography>
          </Box>

          <Typography color="gray">{content}</Typography>
        </Box>
      </Box>
    </>
  );
}

function TotalReviewBar({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="8rem">
        <Typography component="span">{title}</Typography>
      </Box>
      <Box bgcolor="#dcdcdc" position="relative" height={8} flex={1}>
        <Box
          position="absolute"
          top={0}
          left={0}
          height={8}
          width={`${value}%`}
          bgcolor={color}
        ></Box>
      </Box>
    </Box>
  );
}
