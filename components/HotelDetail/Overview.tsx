import {
  Box,
  Button,
  Grid,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import RatingReadOnly from "../ui/RatingReadOnly";
import { useEffect, useState } from "react";
import { hotelFindById } from "@/api/hotel";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

interface Image {
  id: string;
  img: string;
  alt: string;
}
interface Policy {
  id: string;
  "policy name": string;
  description: string;
}

export default function Overview({
  setValue,
}: {
  setValue: (value: string) => void;
}) {
  const params = useParams<{ hotelID: string }>();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [review, setReview] = useState({
    score: 0,
    review_count: 0,
  });
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState<Policy[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const getHotelById = async () => {
        const data = await hotelFindById(params.hotelID);

        if (data.errors) {
          toast.error(data.errors[0].message);
        } else {
          setName(data.name);
          setAddress(data.address);
          setReview(data.reviews);
          setDescription(data.description);
          setImages(
            data.image.map((img: any) => ({
              id: img.id,
              img: process.env.NEXT_PUBLIC_PAYLOAD_API_URL + img.image.url,
              alt: img.image.alt,
            }))
          );
          setAmenities(data.amenities);
          setPolicies(data.policy);
        }

        setIsLoading(false);
      };

      getHotelById();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {name}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                color="text.secondary"
                mt={1}
              >
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {address}
                </Typography>
              </Box>

              <Box mt={2} display="flex" alignItems="center" gap={1}>
                <RatingReadOnly
                  value={review.score}
                  size="medium"
                  showLabel={false}
                />

                <Typography variant="body2" color="text.secondary">
                  ({review.review_count})
                </Typography>
              </Box>
            </Box>

            <Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setValue("2")}
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
                }}
              >
                Đặt phòng
              </Button>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {images.length > 0 && (
              <Grid item xs={12} md={8}>
                <Link href={images[0].img}>
                  <Image
                    src={images[0].img}
                    alt={images[0].alt}
                    width={600}
                    height={300}
                    style={{ borderRadius: 8, width: "100%" }}
                  />
                </Link>
              </Grid>
            )}

            <Grid item xs={12} md={4}>
              <Grid container spacing={1}>
                {images.map(
                  (element, index) =>
                    index !== 0 && (
                      <Grid item xs={6} key={element.id}>
                        <Link href={element.img}>
                          <Image
                            src={element.img}
                            alt={element.alt}
                            width={150}
                            height={100}
                            style={{ borderRadius: 8, width: "100%" }}
                          />
                        </Link>
                      </Grid>
                    )
                )}
              </Grid>
            </Grid>
          </Grid>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              lineHeight: 1.75,
              color: "text.secondary",
              textAlign: "justify",
            }}
          >
            {description}
          </Typography>

          <Typography variant="h6" fontWeight="600" mt={4}>
            Dịch vụ tiện ích
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={1.5} mt={2}>
            {amenities.map((element) => (
              <Chip
                key={element}
                label={element}
                sx={{ fontSize: "0.875rem", fontWeight: 500 }}
              />
            ))}
          </Box>

          <Typography variant="h6" fontWeight="600" mt={4}>
            Chính sách
          </Typography>

          <Box mt={2} display="flex" flexDirection="column" gap={2}>
            {policies.map((element) => (
              <Box key={element.id}>
                <Typography fontWeight="500">
                  {element["policy name"]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {element.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
