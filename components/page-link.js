import Link from "next/link";

export const PageLink = (props) => {
  return <Link {...props} className={`page-nav ${props.className}`} />;
};
