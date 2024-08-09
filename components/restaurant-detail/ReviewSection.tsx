import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import ResRatingReadOnly from "../ResRatingReadOnly";
import ResRating from "../ResRating";

export default function ReviewSection() {
  return (
    <Box>
      {/* Review section */}
      <Box display="flex" flexDirection="column" gap={5} mb={5}>
        <ReviewRow
          avatarImg="Hello.png"
          userName="John Cena"
          content="I was pleasantly surprised by this book. The plot was engaging, and the characters were complex and relatable. I would highly recommend it to anyone who enjoys well-written fiction."
          ratings={3.5}
        />
        <ReviewRow
          avatarImg="Hello.png"
          userName="John Cena"
          content="I was pleasantly surprised by this book. The plot was engaging, and the characters were complex and relatable. I would highly recommend it to anyone who enjoys well-written fiction."
          ratings={3.5}
        />
        <ReviewRow
          avatarImg="Hello.png"
          userName="John Cena"
          content="I was pleasantly surprised by this book. The plot was engaging, and the characters were complex and relatable. I would highly recommend it to anyone who enjoys well-written fiction."
          ratings={3.5}
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
}: {
  avatarImg: string;
  userName: string;
  content: string;
  ratings: number;
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
            <Typography variant="h6" component="h2">
              {userName}
            </Typography>
            <ResRatingReadOnly value={ratings} showLabel={false} />
          </Box>

          <Typography color="gray">{content}</Typography>
        </Box>
      </Box>
    </>
  );
}
