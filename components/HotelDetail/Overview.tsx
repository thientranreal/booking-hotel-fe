import { Box, Button, Grid, Typography, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import RatingReadOnly from "../RatingReadOnly";
import { useEffect, useState } from "react";
import { hotelFindById } from "@/app/api/hotel";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

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
    rate: 0,
    review_count: 0,
  });
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    const getHotelById = async () => {
      const data = await hotelFindById(params.hotelID);

      console.log(data);

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
    };

    getHotelById();
  }, []);

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", mt: 1 }}
          >
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            {address}
          </Typography>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
            <RatingReadOnly
              value={review.rate}
              size="medium"
              showLabel={false}
            />

            <Typography
              color="text.secondary"
              ml={1}
            >{`(${review.review_count})`}</Typography>
          </Box>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setValue("2")}
          >
            Đặt phòng
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {images.length > 0 && (
          <Grid item xs={12} md={8}>
            <Image
              src={images[0].img}
              alt={images[0].alt}
              width={600}
              height={300}
              style={{ borderRadius: 8, width: "100%" }}
            />
          </Grid>
        )}

        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            {images.map(
              (element, index) =>
                index !== 0 && (
                  <Grid item xs={6} key={element.id}>
                    <Image
                      src={element.img}
                      alt={element.alt}
                      width={150}
                      height={100}
                      style={{ borderRadius: 8, width: "100%" }}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ mt: 2 }}>
        {description}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Dịch vụ tiện ích
      </Typography>

      <Box display="flex" mt={2} gap={3} flexWrap="wrap">
        {amenities.map((element) => (
          <Chip key={element} label={element} variant="outlined" />
        ))}
      </Box>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Chính sách
      </Typography>

      <Box mt={2} gap={3}>
        {policies.map((element) => (
          <Typography key={element.id} sx={{ mt: 2 }}>
            {`${element["policy name"]} ${element.description}`}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
