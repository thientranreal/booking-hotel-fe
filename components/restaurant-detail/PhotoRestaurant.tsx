import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";

export default function PhotoRestaurant() {
  return (
    <ImageList sx={{ height: 700 }} cols={2} rowHeight={350}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ position: "relative" }}>
          <Image
            src={item.img}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: "/images/photo-res.webp",
    title: "Breakfast",
  },
  {
    img: "/images/photo-res.webp",
    title: "Burger",
  },
  {
    img: "/images/photo-res.webp",
    title: "Camera",
  },
  {
    img: "/images/photo-res.webp",
    title: "Coffee",
  },
  {
    img: "/images/photo-res.webp",
    title: "Hats",
  },
  {
    img: "/images/photo-res.webp",
    title: "Honey",
  },
  {
    img: "/images/photo-res.webp",
    title: "Basketball",
  },
  {
    img: "/images/photo-res.webp",
    title: "Fern",
  },
];
