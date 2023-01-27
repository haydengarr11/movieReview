import {MdQueryStats} from "react-icons/md";
import {FaWpforms} from "react-icons/fa";
import {ImProfile} from "react-icons/im";
import {IoBarChartSharp} from "react-icons/io5";
import {IoCreateOutline} from "react-icons/io5";
import {CgPlayListSearch} from "react-icons/cg";
import React from "react";
export const links = [
  {
    id: 1,
    text: "Stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "All Movies",
    path: "all-movies",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "Add Movie",
    path: "add-movie",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "All Shows",
    path: "all-shows",
    icon: <CgPlayListSearch />,
  },
  {
    id: 5,
    text: "Add Show",
    path: "add-show",
    icon: <IoCreateOutline />,
  },
  {
    id: 6,
    text: "Profile",
    path: "profile",
    icon: <ImProfile />,
  },
];
