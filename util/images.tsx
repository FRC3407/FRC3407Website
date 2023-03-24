import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import DataObjectIcon from "@mui/icons-material/DataObject";
import SummarizeIcon from "@mui/icons-material/Summarize";
import Jimp from "jimp";

// const imageCache: Map<string, Jimp> = new Map();

export const serializeGoogleImageUrl = (url: string) => url.split("=")[0];

export const FileTypeIcons = {
  pdf: <PictureAsPdf fontSize={"inherit"} />,
  txt: <DescriptionIcon fontSize={"inherit"} />,
  json: <DataObjectIcon fontSize={"inherit"} />,
  default: <SummarizeIcon fontSize={"inherit"} />,
};

export function removeImageParams(imageUrl: string) {
  if (imageUrl.includes("googleusercontent"))
    return serializeGoogleImageUrl(imageUrl);
  return imageUrl;
}

export async function modifyImage(
  src: string,
  imageOptions: { [key: string]: string | undefined }
): Promise<Jimp | string> {
  // if (
  //   typeof imageCache.get(`${src}:${JSON.stringify(imageOptions)}`) !==
  //   "undefined"
  // )
  //   return imageCache.get(`${src}:${JSON.stringify(imageOptions)}`) as Jimp;

  const image = await Jimp.read(src);

  const {
    height,
    width,
    rotate,
    blur,
    pixelate,
    quality = "100",
    hue = "0",
    lighten = "0",
    xor,
    brighten = "0",
    darken = "0",
    saturate = "0",
    tint = "0",
    shade = "0",
    dither,
    scaleToFit,
    cover,
    contain,
  } = imageOptions;

  try {
    if (blur && !isNaN(parseInt(blur))) image.blur(parseInt(blur));
    if (width || height) {
      if (scaleToFit) {
        image.scaleToFit(
          parseInt(width ?? Jimp.AUTO.toString()),
          parseInt(height ?? Jimp.AUTO.toString())
        );
      } else if (cover) {
        if (!height || !width)
          return "The cover option requires both the height and width to specified";
        image.cover(
          parseInt(width ?? Jimp.AUTO.toString()),
          parseInt(height ?? Jimp.AUTO.toString())
        );
      } else if (contain) {
        if (!height || !width)
          return "The contain option requires both the height and width to specified";
        image.contain(
          parseInt(width ?? Jimp.AUTO.toString()),
          parseInt(height ?? Jimp.AUTO.toString())
        );
      } else {
        image.resize(
          parseInt(width ?? image.getWidth().toString()),
          parseInt(height ?? image.getHeight().toString())
        );
      }
    }
    if (pixelate && !isNaN(parseInt(pixelate)))
      image.pixelate(parseInt(pixelate));
    if (dither) image.dither565();
    if (parseInt(quality) < 100) image.quality(parseInt(quality));

    const colorMods: { apply: string; params: any[] }[] = [];

    if (parseInt(hue) > 0)
      colorMods.push({ apply: "hue" as any, params: [parseInt(hue)] });
    if (parseInt(lighten) > 0)
      colorMods.push({
        apply: "lighten" as any,
        params: [parseInt(lighten) % 100],
      });
    if (xor) colorMods.push({ apply: "xor" as any, params: [xor] });
    if (parseInt(brighten) > 0)
      colorMods.push({
        apply: "brighten" as any,
        params: [parseInt(brighten) % 100],
      });
    if (parseInt(darken) > 0)
      colorMods.push({
        apply: "darken" as any,
        params: [parseInt(darken) % 100],
      });
    if (parseInt(saturate) > 0)
      colorMods.push({
        apply: "saturate" as any,
        params: [parseInt(saturate) % 100],
      });
    if (parseInt(tint) > 0)
      colorMods.push({ apply: "tint" as any, params: [parseInt(tint)] });
    if (parseInt(shade) > 0)
      colorMods.push({ apply: "shade" as any, params: [parseInt(shade)] });

    if (colorMods.length > 0) image.color(colorMods as any);

    if (rotate && !isNaN(parseInt(rotate)))
      image.rotate(360 - (parseInt(rotate) % 360));

    // if (imageCache.size > 15) imageCache.delete(imageCache.keys().next().value);

    // imageCache.set(`${src}:${JSON.stringify(imageOptions)}`, image);

    return image;
  } catch (error: any) {
    return error.message;
  }
}
