/* MUFIN System */

import getMD from "./import";

export default function MarkUpFileInitalRenderer({
  data,
}: {
  data: Awaited<ReturnType<typeof getMD>>;
}) {
  return <div dangerouslySetInnerHTML={{ __html: data.html }} />;
}
