import PictureAsPdf from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from '@mui/icons-material/Description';
import DataObjectIcon from '@mui/icons-material/DataObject';
import SummarizeIcon from '@mui/icons-material/Summarize';

export const serializeGoogleImageUrl = (url: string) => url.split("=")[0];

export const FileTypeIcons = {
  "pdf": <PictureAsPdf />,
  "txt": <DescriptionIcon />,
  "json": <DataObjectIcon />,
  "default": <SummarizeIcon />
}
