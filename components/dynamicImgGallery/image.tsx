import Image from "next/image";

export default function GalleryImage({
  src,
  alt = "Image",
}: {
  src: string;
  alt?: string;
}) {
  return <Image src={src} alt={alt} />;
}
