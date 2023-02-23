import Layout from "@components/layout";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next/types";
import path from "path";
import { recursiveReadFolder } from "util/resources";
import Image from "next/image";
import styles from "styles/pages/Pictures.module.scss";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function Pictures({
  images,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [open, setOpen] = useState<false | { [key: string]: any }>(false);
  const [sortBy, setSortBy] = useState<
    "yearDecending" | "yearAscending" | "alphabetical"
  >("yearDecending");
  images = images.filter(
    (val, index, array) => array.lastIndexOf(val) === index
  );

  const sortingFns = {
    yearDecending: (a: typeof images[0], b: typeof images[0]) =>
      b.year - a.year,
    yearAscending: (a: typeof images[0], b: typeof images[0]) =>
      a.year - b.year,
    alphabetical: (a: typeof images[0], b: typeof images[0]) =>
      a.name.localeCompare(b.name),
  };

  images = images.sort(sortingFns[sortBy]);

  function ModalContent() {
    if (!open) return null;
    return (
      <div>
        <Image
          src={open.path}
          alt={open.name}
          fill
          style={{
            objectFit: "contain",
          }}
        />
        <div className={styles.imageCaption}>
          <h1>{open.name}</h1>
          <h5>Taken during the {open.year} season</h5>
          <h5>{open.path}</h5>
        </div>
      </div>
    );
  }

  return (
    <Layout title="Team Pictures">
      <div className={styles.pageHeader}>
        <h1>Team Pictures</h1>
        <FormControl>
          <Select
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as any);
            }}
            variant={"outlined"}
            sx={{
              height: "70%",
            }}
          >
            <MenuItem value={"yearDecending"}>Sort By Newest Pictures</MenuItem>
            <MenuItem value={"yearAscending"}>Sort By Oldest Pictures</MenuItem>
            <MenuItem value={"alphabetical"}>Sort By Name</MenuItem>
          </Select>
        </FormControl>
      </div>
      <hr
        style={{
          width: "80%",
          marginTop: "20px",
        }}
      />
      <div className={styles.images}>
        {images.map((image) => (
          <div
            key={image.name}
            className={styles.image}
            onClick={() => setOpen(image)}
          >
            <Image
              src={image.path}
              height={300}
              width={300}
              alt={image.name}
              style={{
                objectFit: "cover",
              }}
            />
            <h4 className={styles.imageTitle}>
              {image.year} {image.name}
            </h4>
          </div>
        ))}
      </div>
      <Modal
        open={!!open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        className={styles.modal}
      >
        <Fade in={!!open}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80vw",
              height: "70vh",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className={styles.close}>
              <CloseIcon onClick={() => setOpen(false)} />
            </div>
            <ModalContent />
          </Box>
        </Fade>
      </Modal>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  images: { name: string; path: string; year: number }[];
}> = async () => {
  return {
    props: {
      images: (
        await recursiveReadFolder(
          path.join(process.cwd(), "public/static/images")
        )
      )
        .filter((file) => path.basename(file).startsWith("20"))
        .map((image) => {
          return {
            name: path
              .basename(image)
              .split(/[_.]/g)[1]
              .split("-")
              .filter((word) => isNaN(parseInt(word)))
              .join(" "),
            year: parseInt(path.basename(image).split("_")[0]),
            path: image
              .replace(path.join(process.cwd(), "public"), "")
              .replaceAll("\\", "/"),
          };
        }),
    },
  };
};
