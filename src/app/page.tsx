import { Button } from "@heroui/react";
import Image from "next/image";
import { CgSmileMouthOpen } from "react-icons/cg";

export default function Home() {
  return <div className="text-3xl">Hello
  <Button type="button"><CgSmileMouthOpen />Primary Button</Button>
  </div>;
}
