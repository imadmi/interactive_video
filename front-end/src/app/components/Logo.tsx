import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import logo_sm from "../../../public/logo_sm.png";

export default function Logo() {
  return (
    <>
      <div className="text-base  font-sans">
        <Link href="/" className="hidden lg:block ">
          <Image
            src={logo}
            alt="Videoask by Typeform"
            priority={true}
            width={500}
            height={500}
            className="h-12 w-full "
          />
        </Link>
        <Link href="/" className="block lg:hidden">
          <Image
            src={logo_sm}
            alt="Videoask by Typeform"
            priority={true}
            width={500}
            height={500}
            className="h-12 w-auto "
          />
        </Link>
      </div>
    </>
  );
}
