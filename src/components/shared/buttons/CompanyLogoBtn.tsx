"use client";

import Link from "next/link";

interface ICompanyLogoBtnProps {
  className?: string;
}

export const CompanyLogoBtn = ({ className = "" }: ICompanyLogoBtnProps) => {
  return (
    <Link
      href="/"
      className={`md:tracking-wider bg-linear-to-r from-primary-light-2 to-primary-dark-2 bg-clip-text text-transparent font-bold! inline-block uppercase leading-none ${className}`}
    >
      Explora
    </Link>
  );
};
