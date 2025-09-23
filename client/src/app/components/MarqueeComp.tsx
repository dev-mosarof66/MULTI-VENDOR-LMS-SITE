"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { Testimonial } from "./Testimonial";

type Props = {
 t : Testimonial
}

function MarqueeComp({ t }: Props) {
  return (
    <Marquee pauseOnHover gradient={false} speed={50}>
      <div>
        {t.text} — <span className="font-semibold">{t.name}</span>, {t.role}
      </div>
    </Marquee>
  );
}

export default MarqueeComp;
