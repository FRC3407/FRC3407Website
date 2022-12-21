import { useRouter } from "next/router";
import style from "../../styles/AuthError.module.scss";

export default function Error() {
  const router = useRouter();
  const { error } = router.query;
  return (
    <div className={style.container}>
      <div className={style.box}>
        <p>Error: {error}</p>
      </div>
    </div>
  );
}
