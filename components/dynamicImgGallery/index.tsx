import getImages from "./import";
import Image from "./image"

// THIS SHOULD BE DYNAMICALLY DISPLAYED
export default function DynamicGallery({ images }: { images: [string, string] }) {
  return (
    <div>
      {images.map(((image, index) => <Image key={index} alt="" src={image[1]} />))}
    </div>
  );
}
