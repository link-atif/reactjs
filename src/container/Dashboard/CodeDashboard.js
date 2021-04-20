import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Tooltip,
  Tabs,
  Tab,
  Paper,
  Typography,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import searchImg from "../../assets/images/search.svg";
import arrowUp from "../../assets/images/new-design/dash-arrow-up.svg";
import arrowDown from "../../assets/images/new-design/dash-arrow-down.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChartBack from "../../assets/images/new-design/Back.svg";
import CPTOVerIcon from "../../assets/images/SVGIcons/CPT-Overview";
import CPTBubbleIcon from "../../assets/images/SVGIcons/CPTBubbleIcon";
import CPTHeatIcon from "../../assets/images/SVGIcons/CPTHeatIcon";
import CPTDonutIcon from "../../assets/images/SVGIcons/CPTDonutIcon";

import RefreshIcon from "../../assets/images/new-design/refresh.svg";
import backIcon from "../../assets/images/new-design/left-arrow.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import Highcharts from "highcharts";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Tabclaimsicon from "../../assets/images/tabs-icons/claims.svg";
import TabcptcodeiconGr from "../../assets/images/tabs-icons/cpt-code-gr.svg";
import TabInsightsicon from "../../assets/images/tabs-icons/insights.svg";
import TabInsightsiconGr from "../../assets/images/tabs-icons/insights-gr.svg";
import DashboardIcongry from "../../assets/images/tabs-icons/dash-tab-gry.svg";
import HighchartsReact from "highcharts-react-official";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { RootContext } from "../../context/RootContext";
import Loading from "./../../components/common/ExpandableTable/Loading";
import claims from "../../actions/claims";
import Messages from "./../../components/Messages";
import DonutPayerDropDown from "./DonutPayerDropDown";
import HeatMapDashboard from "./HeatMapDashboard";
import SearchBox from "../../components/common/SearchBox";
import CPTTreeMap from "./CPTChart/index";
import BubbleChart from "./CPTChart/BubbleChart";
import RejectedBarChart from "./RejectedBarChar";
import JcodeLineChart from "./JcodeLineChart";
import PieChart from "./PieChart";

import DenaidImg from "../../assets/images/NewMiniCard/Denaid-img.svg";
import AdminIcon from "../../assets/images/OrionIocn/Admin.svg";
import PreMedIcon from "../../assets/images/OrionIocn/Premed.svg";
import AncillaryIcon from "../../assets/images/OrionIocn/Ancillary.svg";
import JcodeIcon from "../../assets/images/OrionIocn/Jcode.svg";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/variwide")(Highcharts);
require("highcharts/modules/sunburst")(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});
var sunburstdata = [
  {
    id: "0.0",
    parent: "",
    name: "The World",
  },
  {
    id: "1.3",
    parent: "0.0",
    name: "Asia",
    color: "#1dd1a1",
  },
  {
    id: "1.1",
    parent: "0.0",
    name: "Africa",
  },
  {
    id: "1.2",
    parent: "0.0",
    name: "America",
  },
  {
    id: "1.4",
    parent: "0.0",
    name: "Europe",
  },
  {
    id: "1.5",
    parent: "0.0",
    name: "Oceanic",
  },

  /* Africa */
  {
    id: "2.1",
    parent: "1.1",
    name: "Eastern Africa",
  },

  {
    id: "3.1",
    parent: "2.1",
    name: "Ethiopia",
    value: 104957438,
  },
  {
    id: "3.2",
    parent: "2.1",
    name: "Tanzania",
    value: 57310019,
  },
  {
    id: "3.3",
    parent: "2.1",
    name: "Kenya",
    value: 49699862,
  },
  {
    id: "3.4",
    parent: "2.1",
    name: "Uganda",
    value: 42862958,
  },
  {
    id: "3.5",
    parent: "2.1",
    name: "Mozambique",
    value: 29668834,
  },
  {
    id: "3.6",
    parent: "2.1",
    name: "Madagascar",
    value: 25570895,
  },
  {
    id: "3.7",
    parent: "2.1",
    name: "Malawi",
    value: 18622104,
  },
  {
    id: "3.8",
    parent: "2.1",
    name: "Zambia",
    value: 17094130,
  },
  {
    id: "3.9",
    parent: "2.1",
    name: "Zimbabwe",
    value: 16529904,
  },
  {
    id: "3.10",
    parent: "2.1",
    name: "Somalia",
    value: 14742523,
  },
  {
    id: "3.11",
    parent: "2.1",
    name: "South Sudan",
    value: 12575714,
  },
  {
    id: "3.12",
    parent: "2.1",
    name: "Rwanda",
    value: 12208407,
  },
  {
    id: "3.13",
    parent: "2.1",
    name: "Burundi",
    value: 10864245,
  },
  {
    id: "3.14",
    parent: "2.1",
    name: "Eritrea",
    value: 5068831,
  },
  {
    id: "3.15",
    parent: "2.1",
    name: "Mauritius",
    value: 1265138,
  },
  {
    id: "3.16",
    parent: "2.1",
    name: "Djibouti",
    value: 956985,
  },
  {
    id: "3.17",
    parent: "2.1",
    name: "Réunion",
    value: 876562,
  },
  {
    id: "3.18",
    parent: "2.1",
    name: "Comoros",
    value: 813912,
  },
  {
    id: "3.19",
    parent: "2.1",
    name: "Mayotte",
    value: 253045,
  },
  {
    id: "3.20",
    parent: "2.1",
    name: "Seychelles",
    value: 94737,
  },

  {
    id: "2.5",
    parent: "1.1",
    name: "Western Africa",
  },

  {
    id: "3.42",
    parent: "2.5",
    name: "Nigeria",
    value: 190886311,
  },
  {
    id: "3.43",
    parent: "2.5",
    name: "Ghana",
    value: 28833629,
  },
  {
    id: "3.44",
    parent: "2.5",
    name: "Côte Ivoire",
    value: 24294750,
  },
  {
    id: "3.45",
    parent: "2.5",
    name: "Niger",
    value: 21477348,
  },
  {
    id: "3.46",
    parent: "2.5",
    name: "Burkina Faso",
    value: 19193382,
  },
  {
    id: "3.47",
    parent: "2.5",
    name: "Mali",
    value: 18541980,
  },
  {
    id: "3.48",
    parent: "2.5",
    name: "Senegal",
    value: 15850567,
  },
  {
    id: "3.49",
    parent: "2.5",
    name: "Guinea",
    value: 12717176,
  },
  {
    id: "3.50",
    parent: "2.5",
    name: "Benin",
    value: 11175692,
  },
  {
    id: "3.51",
    parent: "2.5",
    name: "Togo",
    value: 7797694,
  },
  {
    id: "3.52",
    parent: "2.5",
    name: "Sierra Leone",
    value: 7557212,
  },
  {
    id: "3.53",
    parent: "2.5",
    name: "Liberia",
    value: 4731906,
  },
  {
    id: "3.54",
    parent: "2.5",
    name: "Mauritania",
    value: 4420184,
  },
  {
    id: "3.55",
    parent: "2.5",
    name: "The Gambia",
    value: 2100568,
  },
  {
    id: "3.56",
    parent: "2.5",
    name: "Guinea-Bissau",
    value: 1861283,
  },
  {
    id: "3.57",
    parent: "2.5",
    name: "Cabo Verde",
    value: 546388,
  },
  {
    id: "3.58",
    parent: "2.5",
    name: "Saint Helena, Ascension and Tristan da Cunha",
    value: 4049,
  },

  {
    id: "2.3",
    parent: "1.1",
    name: "North Africa",
  },

  {
    id: "3.30",
    parent: "2.3",
    name: "Egypt",
    value: 97553151,
  },
  {
    id: "3.31",
    parent: "2.3",
    name: "Algeria",
    value: 41318142,
  },
  {
    id: "3.32",
    parent: "2.3",
    name: "Sudan",
    value: 40533330,
  },
  {
    id: "3.33",
    parent: "2.3",
    name: "Morocco",
    value: 35739580,
  },
  {
    id: "3.34",
    parent: "2.3",
    name: "Tunisia",
    value: 11532127,
  },
  {
    id: "3.35",
    parent: "2.3",
    name: "Libya",
    value: 6374616,
  },
  {
    id: "3.36",
    parent: "2.3",
    name: "Western Sahara",
    value: 552628,
  },

  {
    id: "2.2",
    parent: "1.1",
    name: "Central Africa",
  },

  {
    id: "3.21",
    parent: "2.2",
    name: "Democratic Republic of the Congo",
    value: 81339988,
  },
  {
    id: "3.22",
    parent: "2.2",
    name: "Angola",
    value: 29784193,
  },
  {
    id: "3.23",
    parent: "2.2",
    name: "Cameroon",
    value: 24053727,
  },
  {
    id: "3.24",
    parent: "2.2",
    name: "Chad",
    value: 14899994,
  },
  {
    id: "3.25",
    parent: "2.2",
    name: "Congo",
    value: 5260750,
  },
  {
    id: "3.26",
    parent: "2.2",
    name: "Central African Republic",
    value: 4659080,
  },
  {
    id: "3.27",
    parent: "2.2",
    name: "Gabon",
    value: 2025137,
  },
  {
    id: "3.28",
    parent: "2.2",
    name: "Equatorial Guinea",
    value: 1267689,
  },
  {
    id: "3.29",
    parent: "2.2",
    name: "Sao Tome and Principe",
    value: 204327,
  },

  {
    id: "2.4",
    parent: "1.1",
    name: "South America",
  },

  {
    id: "3.37",
    parent: "2.4",
    name: "South Africa",
    value: 56717156,
  },
  {
    id: "3.38",
    parent: "2.4",
    name: "Namibia",
    value: 2533794,
  },
  {
    id: "3.39",
    parent: "2.4",
    name: "Botswana",
    value: 2291661,
  },
  {
    id: "3.40",
    parent: "2.4",
    name: "Lesotho",
    value: 2233339,
  },
  {
    id: "3.41",
    parent: "2.4",
    name: "Swaziland",
    value: 1367254,
  },

  /***********/

  /* America */
  {
    id: "2.9",
    parent: "1.2",
    name: "South America",
  },

  {
    id: "3.98",
    parent: "2.9",
    name: "Brazil",
    value: 209288278,
  },
  {
    id: "3.99",
    parent: "2.9",
    name: "Colombia",
    value: 49065615,
  },
  {
    id: "3.100",
    parent: "2.9",
    name: "Argentina",
    value: 44271041,
  },
  {
    id: "3.101",
    parent: "2.9",
    name: "Peru",
    value: 32165485,
  },
  {
    id: "3.102",
    parent: "2.9",
    name: "Venezuela",
    value: 31977065,
  },
  {
    id: "3.103",
    parent: "2.9",
    name: "Chile",
    value: 18054726,
  },
  {
    id: "3.104",
    parent: "2.9",
    name: "Ecuador",
    value: 16624858,
  },
  {
    id: "3.105",
    parent: "2.9",
    name: "Bolivia",
    value: 11051600,
  },
  {
    id: "3.106",
    parent: "2.9",
    name: "Paraguay",
    value: 6811297,
  },
  {
    id: "3.107",
    parent: "2.9",
    name: "Uruguay",
    value: 3456750,
  },
  {
    id: "3.108",
    parent: "2.9",
    name: "Guyana",
    value: 777859,
  },
  {
    id: "3.109",
    parent: "2.9",
    name: "Suriname",
    value: 563402,
  },
  {
    id: "3.110",
    parent: "2.9",
    name: "French Guiana",
    value: 282731,
  },
  {
    id: "3.111",
    parent: "2.9",
    name: "Falkland Islands",
    value: 2910,
  },

  {
    id: "2.8",
    parent: "1.2",
    name: "Northern America",
  },

  {
    id: "3.93",
    parent: "2.8",
    name: "United States",
    value: 324459463,
  },
  {
    id: "3.94",
    parent: "2.8",
    name: "Canada",
    value: 36624199,
  },
  {
    id: "3.95",
    parent: "2.8",
    name: "Bermuda",
    value: 61349,
  },
  {
    id: "3.96",
    parent: "2.8",
    name: "Greenland",
    value: 56480,
  },
  {
    id: "3.97",
    parent: "2.8",
    name: "Saint Pierre and Miquelon",
    value: 6320,
  },

  {
    id: "2.7",
    parent: "1.2",
    name: "Central America",
  },

  {
    id: "3.85",
    parent: "2.7",
    name: "Mexico",
    value: 129163276,
  },
  {
    id: "3.86",
    parent: "2.7",
    name: "Guatemala",
    value: 16913503,
  },
  {
    id: "3.87",
    parent: "2.7",
    name: "Honduras",
    value: 9265067,
  },
  {
    id: "3.88",
    parent: "2.7",
    name: "El Salvador",
    value: 6377853,
  },
  {
    id: "3.89",
    parent: "2.7",
    name: "Nicaragua",
    value: 6217581,
  },
  {
    id: "3.90",
    parent: "2.7",
    name: "Costa Rica",
    value: 4905769,
  },
  {
    id: "3.91",
    parent: "2.7",
    name: "Panama",
    value: 4098587,
  },
  {
    id: "3.92",
    parent: "2.7",
    name: "Belize",
    value: 374681,
  },

  {
    id: "2.6",
    parent: "1.2",
    name: "Caribbean",
  },

  {
    id: "3.59",
    parent: "2.6",
    name: "Cuba",
    value: 11484636,
  },
  {
    id: "3.60",
    parent: "2.6",
    name: "Haiti",
    value: 10981229,
  },
  {
    id: "3.61",
    parent: "2.6",
    name: "Dominican Republic",
    value: 10766998,
  },
  {
    id: "3.62",
    parent: "2.6",
    name: "Puerto Rico",
    value: 3663131,
  },
  {
    id: "3.63",
    parent: "2.6",
    name: "Jamaica",
    value: 2890299,
  },
  {
    id: "3.64",
    parent: "2.6",
    name: "Trinidad and Tobago",
    value: 1369125,
  },
  {
    id: "3.65",
    parent: "2.6",
    name: "Guadeloupe",
    value: 449568,
  },
  {
    id: "3.66",
    parent: "2.6",
    name: "Bahamas",
    value: 395361,
  },
  {
    id: "3.67",
    parent: "2.6",
    name: "Martinique",
    value: 384896,
  },
  {
    id: "3.68",
    parent: "2.6",
    name: "Barbados",
    value: 285719,
  },
  {
    id: "3.69",
    parent: "2.6",
    name: "Saint Lucia",
    value: 178844,
  },
  {
    id: "3.70",
    parent: "2.6",
    name: "Curaçao",
    value: 160539,
  },
  {
    id: "3.71",
    parent: "2.6",
    name: "Saint Vincent and the Grenadines",
    value: 109897,
  },
  {
    id: "3.72",
    parent: "2.6",
    name: "Grenada",
    value: 107825,
  },
  {
    id: "3.73",
    parent: "2.6",
    name: "Aruba",
    value: 105264,
  },
  {
    id: "3.74",
    parent: "2.6",
    name: "United States Virgin Islands",
    value: 104901,
  },
  {
    id: "3.75",
    parent: "2.6",
    name: "Antigua and Barbuda",
    value: 102012,
  },
  {
    id: "3.76",
    parent: "2.6",
    name: "Dominica",
    value: 73925,
  },
  {
    id: "3.77",
    parent: "2.6",
    name: "Cayman Islands",
    value: 61559,
  },
  {
    id: "3.78",
    parent: "2.6",
    name: "Saint Kitts and Nevis",
    value: 55345,
  },
  {
    id: "3.79",
    parent: "2.6",
    name: "Sint Maarten",
    value: 40120,
  },
  {
    id: "3.80",
    parent: "2.6",
    name: "Turks and Caicos Islands",
    value: 35446,
  },
  {
    id: "3.81",
    parent: "2.6",
    name: "British Virgin Islands",
    value: 31196,
  },
  {
    id: "3.82",
    parent: "2.6",
    name: "Caribbean Netherlands",
    value: 25398,
  },
  {
    id: "3.83",
    parent: "2.6",
    name: "Anguilla",
    value: 14909,
  },
  {
    id: "3.84",
    parent: "2.6",
    name: "Montserrat",
    value: 5177,
  },
  /***********/

  /* Asia */
  {
    id: "2.13",
    parent: "1.3",
    name: "Southern Asia",
    color: "#ffb2f5",
  },

  {
    id: "3.136",
    parent: "2.13",
    name: "India",
    value: 1339180127,
  },
  {
    id: "3.137",
    parent: "2.13",
    name: "Pakistan",
    value: 197015955,
  },
  {
    id: "3.138",
    parent: "2.13",
    name: "Bangladesh",
    value: 164669751,
  },
  {
    id: "3.139",
    parent: "2.13",
    name: "Iran",
    value: 81162788,
  },
  {
    id: "3.140",
    parent: "2.13",
    name: "Afghanistan",
    value: 35530081,
  },
  {
    id: "3.141",
    parent: "2.13",
    name: "Nepal",
    value: 29304998,
  },
  {
    id: "3.142",
    parent: "2.13",
    name: "Sri Lanka",
    value: 20876917,
  },
  {
    id: "3.143",
    parent: "2.13",
    name: "Bhutan",
    value: 807610,
  },
  {
    id: "3.144",
    parent: "2.13",
    name: "Maldives",
    value: 436330,
  },

  {
    id: "2.11",
    parent: "1.3",
    name: "Eastern Asia",
  },

  {
    id: "3.117",
    parent: "2.11",
    name: "China",
    value: 1409517397,
  },
  {
    id: "3.118",
    parent: "2.11",
    name: "Japan",
    value: 127484450,
  },
  {
    id: "3.119",
    parent: "2.11",
    name: "South Korea",
    value: 50982212,
  },
  {
    id: "3.120",
    parent: "2.11",
    name: "North Korea",
    value: 25490965,
  },
  {
    id: "3.121",
    parent: "2.11",
    name: "Taiwan",
    value: 23626456,
  },
  {
    id: "3.122",
    parent: "2.11",
    name: "Hong Kong",
    value: 7364883,
  },
  {
    id: "3.123",
    parent: "2.11",
    name: "Mongolia",
    value: 3075647,
  },
  {
    id: "3.124",
    parent: "2.11",
    name: "Macau",
    value: 622567,
  },

  {
    id: "2.12",
    parent: "1.3",
    name: "South-Eastern Asia",
  },

  {
    id: "3.125",
    parent: "2.12",
    name: "Indonesia",
    value: 263991379,
  },
  {
    id: "3.126",
    parent: "2.12",
    name: "Philippines",
    value: 104918090,
  },
  {
    id: "3.127",
    parent: "2.12",
    name: "Vietnam",
    value: 95540800,
  },
  {
    id: "3.128",
    parent: "2.12",
    name: "Thailand",
    value: 69037513,
  },
  {
    id: "3.129",
    parent: "2.12",
    name: "Myanmar",
    value: 53370609,
  },
  {
    id: "3.130",
    parent: "2.12",
    name: "Malaysia",
    value: 31624264,
  },
  {
    id: "3.131",
    parent: "2.12",
    name: "Cambodia",
    value: 16005373,
  },
  {
    id: "3.132",
    parent: "2.12",
    name: "Laos",
    value: 6858160,
  },
  {
    id: "3.133",
    parent: "2.12",
    name: "Singapore",
    value: 5708844,
  },
  {
    id: "3.134",
    parent: "2.12",
    name: "Timor-Leste",
    value: 1296311,
  },
  {
    id: "3.135",
    parent: "2.12",
    name: "Brunei",
    value: 428697,
    // 'color': ''
  },

  {
    id: "2.14",
    parent: "1.3",
    name: "Western Asia",
  },

  {
    id: "3.145",
    parent: "2.14",
    name: "Turkey",
    value: 80745020,
  },
  {
    id: "3.146",
    parent: "2.14",
    name: "Iraq",
    value: 38274618,
  },
  {
    id: "3.147",
    parent: "2.14",
    name: "Saudi Arabia",
    value: 32938213,
  },
  {
    id: "3.148",
    parent: "2.14",
    name: "Yemen",
    value: 28250420,
  },
  {
    id: "3.149",
    parent: "2.14",
    name: "Syria",
    value: 18269868,
  },
  {
    id: "3.150",
    parent: "2.14",
    name: "Azerbaijan",
    value: 9827589,
  },
  {
    id: "3.151",
    parent: "2.14",
    name: "Jordan",
    value: 9702353,
  },
  {
    id: "3.152",
    parent: "2.14",
    name: "United Arab Emirates",
    value: 9400145,
  },
  {
    id: "3.153",
    parent: "2.14",
    name: "Israel",
    value: 8321570,
  },
  {
    id: "3.154",
    parent: "2.14",
    name: "Lebanon",
    value: 6082357,
  },
  {
    id: "3.155",
    parent: "2.14",
    name: "Palestine",
    value: 4920724,
  },
  {
    id: "3.156",
    parent: "2.14",
    name: "Oman",
    value: 4636262,
  },
  {
    id: "3.157",
    parent: "2.14",
    name: "Kuwait",
    value: 4136528,
  },
  {
    id: "3.158",
    parent: "2.14",
    name: "Georgia",
    value: 3912061,
  },
  {
    id: "3.159",
    parent: "2.14",
    name: "Armenia",
    value: 2930450,
  },
  {
    id: "3.160",
    parent: "2.14",
    name: "Qatar",
    value: 2639211,
  },
  {
    id: "3.161",
    parent: "2.14",
    name: "Bahrain",
    value: 1492584,
  },

  {
    id: "2.10",
    parent: "1.3",
    name: "Central Asia",
  },

  {
    id: "3.112",
    parent: "2.10",
    name: "Uzbekistan",
    value: 31910641,
  },
  {
    id: "3.113",
    parent: "2.10",
    name: "Kazakhstan",
    value: 18204499,
  },
  {
    id: "3.114",
    parent: "2.10",
    name: "Tajikistan",
    value: 8921343,
  },
  {
    id: "3.115",
    parent: "2.10",
    name: "Kyrgyzstan",
    value: 6045117,
  },
  {
    id: "3.116",
    parent: "2.10",
    name: "Turkmenistan",
    value: 5758075,
  },
  /***********/

  /* Europe */
  {
    id: "2.15",
    parent: "1.4",
    name: "Eastern Europe",
  },

  {
    id: "3.162",
    parent: "2.15",
    name: "Russia",
    value: 143989754,
  },
  {
    id: "3.163",
    parent: "2.15",
    name: "Ukraine",
    value: 44222947,
  },
  {
    id: "3.164",
    parent: "2.15",
    name: "Poland",
    value: 38170712,
  },
  {
    id: "3.165",
    parent: "2.15",
    name: "Romania",
    value: 19679306,
  },
  {
    id: "3.166",
    parent: "2.15",
    name: "Czechia",
    value: 10618303,
  },
  {
    id: "3.167",
    parent: "2.15",
    name: "Hungary",
    value: 9721559,
  },
  {
    id: "3.168",
    parent: "2.15",
    name: "Belarus",
    value: 9468338,
  },
  {
    id: "3.169",
    parent: "2.15",
    name: "Bulgaria",
    value: 7084571,
  },
  {
    id: "3.170",
    parent: "2.15",
    name: "Slovakia",
    value: 5447662,
  },
  {
    id: "3.171",
    parent: "2.15",
    name: "Moldova",
    value: 4051212,
  },
  {
    id: "3.172",
    parent: "2.15",
    name: "Cyprus",
    value: 1179551,
  },

  {
    id: "2.16",
    parent: "1.4",
    name: "Northern Europe",
  },

  {
    id: "3.173",
    parent: "2.16",
    name: "United Kingdom",
    value: 66181585,
  },
  {
    id: "3.174",
    parent: "2.16",
    name: "Sweden",
    value: 9910701,
  },
  {
    id: "3.175",
    parent: "2.16",
    name: "Denmark",
    value: 5733551,
  },
  {
    id: "3.176",
    parent: "2.16",
    name: "Finland",
    value: 5523231,
  },
  {
    id: "3.177",
    parent: "2.16",
    name: "Norway",
    value: 5305383,
  },
  {
    id: "3.178",
    parent: "2.16",
    name: "Ireland",
    value: 4761657,
  },
  {
    id: "3.179",
    parent: "2.16",
    name: "Lithuania",
    value: 2890297,
  },
  {
    id: "3.180",
    parent: "2.16",
    name: "Latvia",
    value: 1949670,
  },
  {
    id: "3.181",
    parent: "2.16",
    name: "Estonia",
    value: 1309632,
  },
  {
    id: "3.182",
    parent: "2.16",
    name: "Iceland",
    value: 335025,
  },
  {
    id: "3.183",
    parent: "2.16",
    name: "Guernsey and  Jersey",
    value: 165314,
  },
  {
    id: "3.184",
    parent: "2.16",
    name: "Isle of Man",
    value: 84287,
  },
  {
    id: "3.185",
    parent: "2.16",
    name: "Faroe Islands",
    value: 49290,
  },

  {
    id: "2.17",
    parent: "1.4",
    name: "Southern Europe",
  },

  {
    id: "3.186",
    parent: "2.17",
    name: "Italy",
    value: 59359900,
  },
  {
    id: "3.187",
    parent: "2.17",
    name: "Spain",
    value: 46354321,
  },
  {
    id: "3.188",
    parent: "2.17",
    name: "Greece",
    value: 11159773,
  },
  {
    id: "3.189",
    parent: "2.17",
    name: "Portugal",
    value: 10329506,
  },
  {
    id: "3.190",
    parent: "2.17",
    name: "Serbia",
    value: 8790574,
  },
  {
    id: "3.191",
    parent: "2.17",
    name: "Croatia",
    value: 4189353,
  },
  {
    id: "3.192",
    parent: "2.17",
    name: "Bosnia and Herzegovina",
    value: 3507017,
  },
  {
    id: "3.193",
    parent: "2.17",
    name: "Albania",
    value: 2930187,
  },
  {
    id: "3.194",
    parent: "2.17",
    name: "Republic of Macedonia",
    value: 2083160,
  },
  {
    id: "3.195",
    parent: "2.17",
    name: "Slovenia",
    value: 2079976,
  },
  {
    id: "3.196",
    parent: "2.17",
    name: "Montenegro",
    value: 628960,
  },
  {
    id: "3.197",
    parent: "2.17",
    name: "Malta",
    value: 430835,
  },
  {
    id: "3.198",
    parent: "2.17",
    name: "Andorra",
    value: 76965,
  },
  {
    id: "3.199",
    parent: "2.17",
    name: "Gibraltar",
    value: 34571,
  },
  {
    id: "3.200",
    parent: "2.17",
    name: "San Marino",
    value: 33400,
  },
  {
    id: "3.201",
    parent: "2.17",
    name: "Vatican City",
    value: 792,
  },

  {
    id: "2.18",
    parent: "1.4",
    name: "Western Europe",
  },

  {
    id: "3.202",
    parent: "2.18",
    name: "Germany",
    value: 82114224,
  },
  {
    id: "3.203",
    parent: "2.18",
    name: "France",
    value: 64979548,
  },
  {
    id: "3.204",
    parent: "2.18",
    name: "Netherlands",
    value: 17035938,
  },
  {
    id: "3.205",
    parent: "2.18",
    name: "Belgium",
    value: 11429336,
  },
  {
    id: "3.206",
    parent: "2.18",
    name: "Austria",
    value: 8735453,
  },
  {
    id: "3.207",
    parent: "2.18",
    name: "Switzerland",
    value: 8476005,
  },
  {
    id: "3.208",
    parent: "2.18",
    name: "Luxembourg",
    value: 583455,
  },
  {
    id: "3.209",
    parent: "2.18",
    name: "Monaco",
    value: 38695,
  },
  {
    id: "3.210",
    parent: "2.18",
    name: "Liechtenstein",
    value: 37922,
  },
  /***********/

  /* Oceania */
  {
    id: "2.19",
    parent: "1.5",
    name: "Australia and New Zealand",
    color: "#ffb2f5",
  },

  {
    id: "3.211",
    parent: "2.19",
    name: "Australia",
    value: 24450561,
  },
  {
    id: "3.212",
    parent: "2.19",
    name: "New Zealand",
    value: 4705818,
  },

  {
    id: "2.20",
    parent: "1.5",
    name: "Melanesia",
  },

  {
    id: "3.213",
    parent: "2.20",
    name: "Papua New Guinea",
  },
  {
    id: "3.214",
    parent: "2.20",
    name: "Fiji",
    value: 905502,
  },
  {
    id: "3.215",
    parent: "2.20",
    name: "Solomon Islands",
    value: 611343,
  },
  {
    id: "3.216",
    parent: "2.20",
    name: "New Caledonia",
    value: 276255,
  },
  {
    id: "3.217",
    parent: "2.20",
    name: "Vanuatu",
    value: 276244,
  },

  {
    id: "2.21",
    parent: "1.5",
    name: "Micronesia",
  },

  {
    id: "3.218",
    parent: "2.21",
    name: "Guam",
    value: 164229,
  },
  {
    id: "3.219",
    parent: "2.21",
    name: "Kiribati",
    value: 116398,
  },
  {
    id: "3.220",
    parent: "2.21",
    name: "Federated States of Micronesia",
    value: 105544,
  },
  {
    id: "3.221",
    parent: "2.21",
    name: "Northern Mariana Islands",
    value: 55144,
  },
  {
    id: "3.222",
    parent: "2.21",
    name: "Marshall Islands",
    value: 53127,
  },
  {
    id: "3.223",
    parent: "2.21",
    name: "Palau",
    value: 21729,
  },
  {
    id: "3.224",
    parent: "2.21",
    name: "Nauru",
    value: 11359,
  },

  {
    id: "2.22",
    parent: "1.5",
    name: "Polynesia",
  },

  {
    id: "3.225",
    parent: "2.22",
    name: "French Polynesia",
    value: 283007,
  },
  {
    id: "3.226",
    parent: "2.22",
    name: "Samoa",
    value: 196440,
  },
  {
    id: "3.227",
    parent: "2.22",
    name: "Tonga",
    value: 108020,
  },
  {
    id: "3.228",
    parent: "2.22",
    name: "American Samoa",
    value: 55641,
  },
  {
    id: "3.229",
    parent: "2.22",
    name: "Cook Islands",
    value: 17380,
  },
  {
    id: "3.230",
    parent: "2.22",
    name: "Wallis and Futuna",
    value: 11773,
  },
  {
    id: "3.231",
    parent: "2.22",
    name: "Tuvalu",
    value: 11192,
  },
  {
    id: "3.232",
    parent: "2.22",
    name: "Niue",
    value: 1618,
  },
  {
    id: "3.233",
    parent: "2.22",
    name: "Tokelau",
    value: 1300,
  },
];

// tabs content

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

//end tabs content

// model
// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    height: "700px",
    overflowY: "scroll",
    backgroundColor: "#f8fafa",
    // border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// model

const CodeDashboard = () => {
  let history = useHistory();
  // COMMON VARIABLES
  const [activeTopHeader, setActiveTopHeader] = useState(0);

  const { setMessage, permission } = useContext(RootContext);
  const [adminChartTitle, setAdminChartTitle] = useState("Admin");

  // ADMIN BILLED DATA CONSTATNS
  const [billedCategories, setBilledCategories] = useState([]);
  const [billedFirstPoints, setBilledFirstPoints] = useState([]);
  const [billedLastPoints, setBilledLastPoints] = useState([]);
  const [fiveYearBilledCategories, setFiveYearBilledCategories] = useState([]);
  const [fiveYearBilledFirstPoints, setFiveYearBilledFirstPoints] = useState(
    []
  );
  const [fiveYearBilledLastPoints, setFiveYearBilledLastPoints] = useState([]);
  const [yearBilledCategories, setYearBilledCategories] = useState([]);
  const [yearBilledFirstPoints, setYearBilledFirstPoints] = useState([]);
  const [yearBilledLastPoints, setYearBilledLastPoints] = useState([]);
  const [monthBilledCategories, setMonthBilledCategories] = useState([]);
  const [monthBilledFirstPoints, setMonthBilledFirstPoints] = useState([]);
  const [monthBilledLastPoints, setMonthBilledLastPoints] = useState([]);
  const [billMonth, setBillMonth] = useState("");
  const [billYear, setBillYear] = useState("");

  // JCODE BILLED DATA CONSTATNS
  const [jcodeCategories, setJcodeCategories] = useState([]);
  const [jcodeFirstPoints, setJcodeFirstPoints] = useState([]);
  const [jcodeLastPoints, setJcodeLastPoints] = useState([]);
  const [fiveYearJcodeCategories, setFiveYearJcodeCategories] = useState([]);
  const [fiveYearJcodeFirstPoints, setFiveYearJcodeFirstPoints] = useState([]);
  const [fiveYearJcodeLastPoints, setFiveYearJcodeLastPoints] = useState([]);
  const [yearJcodeCategories, setYearJcodeCategories] = useState([]);
  const [yearJcodeFirstPoints, setYearJcodeFirstPoints] = useState([]);
  const [yearJcodeLastPoints, setYearJcodeLastPoints] = useState([]);
  const [monthJcodeCategories, setMonthJcodeCategories] = useState([]);
  const [monthJcodeFirstPoints, setMonthJcodeFirstPoints] = useState([]);
  const [monthJcodeLastPoints, setMonthJcodeLastPoints] = useState([]);
  const [jcodeMonth, setJcodeMonth] = useState("");
  const [jcodeYear, setJcodeYear] = useState("");
  const [jcodeStatus, setJcodeStatus] = useState(0);
  const [jcodeLoadingClass, setJcodeLoadingClass] = useState("");
  const [jcodeChartTitle, setJcodeChartTitle] = useState("JCode");
  const [rejectedJcode, setRejectedJcode] = useState([]);

  // JCODE ANCILLARY DATA CONSTATNS
  const [ancillaryCategories, setAncillaryCategories] = useState([]);
  const [ancillaryFirstPoints, setAncillaryFirstPoints] = useState([]);
  const [ancillaryLastPoints, setAncillaryLastPoints] = useState([]);
  const [
    fiveYearAncillaryCategories,
    setFiveYearAncillaryCategories,
  ] = useState([]);
  const [
    fiveYearAncillaryFirstPoints,
    setFiveYearAncillaryFirstPoints,
  ] = useState([]);
  const [
    fiveYearAncillaryLastPoints,
    setFiveYearAncillaryLastPoints,
  ] = useState([]);
  const [yearAncillaryCategories, setYearAncillaryCategories] = useState([]);
  const [yearAncillaryFirstPoints, setYearAncillaryFirstPoints] = useState([]);
  const [yearAncillaryLastPoints, setYearAncillaryLastPoints] = useState([]);
  const [monthAncillaryCategories, setMonthAncillaryCategories] = useState([]);
  const [monthAncillaryFirstPoints, setMonthAncillaryFirstPoints] = useState(
    []
  );
  const [monthAncillaryLastPoints, setMonthAncillaryLastPoints] = useState([]);
  const [ancillaryMonth, setAncillaryMonth] = useState("");
  const [ancillaryYear, setAncillaryYear] = useState("");
  const [ancillaryStatus, setAncillaryStatus] = useState(0);
  const [ancillaryLoadingClass, setAncillaryLoadingClass] = useState("");
  const [ancillaryChartTitle, setAncillaryChartTitle] = useState("Ancillary");

  // PREMED DATA CONSTATNS
  const [premedCategories, setPremedCategories] = useState([]);
  const [premedFirstPoints, setPremedFirstPoints] = useState([]);
  const [premedLastPoints, setPremedLastPoints] = useState([]);
  const [fiveYearPremedCategories, setFiveYearPremedCategories] = useState([]);
  const [fiveYearPremedFirstPoints, setFiveYearPremedFirstPoints] = useState(
    []
  );
  const [fiveYearPremedLastPoints, setFiveYearPremedLastPoints] = useState([]);
  const [yearPremedCategories, setYearPremedCategories] = useState([]);
  const [yearPremedFirstPoints, setYearPremedFirstPoints] = useState([]);
  const [yearPremedLastPoints, setYearPremedLastPoints] = useState([]);
  const [monthPremedCategories, setMonthPremedCategories] = useState([]);
  const [monthPremedFirstPoints, setMonthPremedFirstPoints] = useState([]);
  const [monthPremedLastPoints, setMonthPremedLastPoints] = useState([]);
  const [premedMonth, setPremedMonth] = useState("");
  const [premedYear, setPremedYear] = useState("");
  const [premedStatus, setPremedStatus] = useState(0);
  const [premedLoadingClass, setPremedLoadingClass] = useState("");
  const [premedChartTitle, setPremedChartTitle] = useState("Pre-Med");

  // DONUT CHART DATA CONSTANTS
  const [donutChartLoadingClass, setDonutChartLoadingClass] = useState("");
  const [donutData, setDonutData] = useState([]);
  const [donutButtons, setDonutButtons] = useState([]);
  const [donutAlert, setDonutAlert] = useState(false);
  const [donutStatus, setDonutStatus] = useState(0);
  const [donutDefaultData, setDonutDefaultData] = useState([]);
  const [donutColors, setDonutColors] = useState([]);
  const defualtDonutColors = [
    "#196dc7",
    "#67d091",
    "#14d6cd",
    "#e83e7d",
    "#563690",
  ];

  // SUM DATA CONSTATNS
  const [adminLoadingClass, setAdminLoadingClass] = useState("");
  const [billedState, setBilledState] = useState(0);
  const [payers, setPayers] = useState([]);
  const [tabs, setTabs] = useState(["Admin", "Jcode", "Ancillary", "Pre-med"]);
  const [activeTab, setActiveTab] = useState(0);
  const [adminChartState, setAdminChartState] = useState(false);
  const [jcodeChartState, setJcodeChartState] = useState(false);
  const [ancillaryChartState, setAncillaryChartState] = useState(false);
  const [premedChartState, setPremedChartState] = useState(false);

  // DENIED CODES
  const [codeLoadingClass, setCodeLoadingClass] = useState("");
  const [codeNames, setCodeNames] = useState([]);
  const [codeAmount, setCodeAmount] = useState([]);

  // DATE FILTERS
  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-03-31");

  // model
  const classes = useStyles();
  // const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // treemap data

  const [treeData, setTreeData] = useState();

  useEffect(() => {
    let time = 1000;
    setTimeout(() => {
      //   // SET ADMIN BILLED VS PAID
      setAdminLoadingClass("data-loading");
      claims
        .getDashboardAdminCodeLastFiveYear()
        .then(({ data: response }) => {
          setAdminLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setBilledCategories(yearWiseCategories);
            setBilledFirstPoints(yearWiseDefualtFirstPoints);
            setBilledLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearBilledCategories(yearWiseCategories);
            setFiveYearBilledFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearBilledLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setAdminLoadingClass("");
          console.log("error is ", error);
        });
    }, [time]);
  }, [adminChartState]);
  // FILTER DONUT CHARTS DATA
  useEffect(() => {
    setDonutAlert(false);
    let time = 1000;
    setTimeout(() => {
      // DONUT CHART DATA CONFIGURATION
      var donutbtns = "";
      if (donutButtons.length > 0) {
        donutbtns = donutButtons;
      } else {
        donutbtns = payers;
      }
      let donutbtnstring = donutbtns.toString();
      setDonutChartLoadingClass("data-loading");
      claims
        .getDashboardCodesAmountByYear("2019", donutbtnstring)
        .then(({ data: response }) => {
          setDonutChartLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let newdata = [];
            let treemapData = [];
            resdata.forEach((item) => {
              let amountval = Math.round(item.paidAmount);
              // newdata.push({ name: item.codeType, y: amountval });
              const colorValue = `hsl(${amountval}, 70%, 50%)`;
              newdata.push({
                id: item.codeType,
                label: item.codeType,
                value: amountval,
                color: colorValue,
              });
              treemapData.push({
                name: item.codeType,
                amount: amountval,
                color: "hsl(105, 70%, 50%)",
              });
            });
            // setTreeData({
            //   name: "CPT CODE",
            //   color: "hsl(105, 70%, 50%)",
            //   children: treemapData,
            // });
            setDonutColors(defualtDonutColors);
            setDonutDefaultData(newdata);
            setDonutData(newdata);
          }
        })
        .catch((error) => {
          setDonutChartLoadingClass("");
          console.log("error is ", error);
        });
    }, [time]);
  }, [donutButtons]);
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    if (permission.includes("e005c454-f8a8-4329-a32a-2527142995a7")) {
      history.push("/dr-services");
    }
    // GET CODES DATA
    setTimeout(() => {
      setCodeLoadingClass("data-loading");
      claims
        .getRejectedCodes(10, 0, 10, startDate, endDate)
        .then(({ data: response }) => {
          setCodeLoadingClass("");
          const { data } = response;
          if (
            typeof data.output !== "undefined" &&
            data.output !== "" &&
            data.output !== null
          ) {
            // let codenames = [];
            let codeAmounts = [];
            data.output.forEach((item) => {
              codeAmounts.push({
                JCODE: item.JCODE,
                value: Math.round(item.ChargeAmount / 1000),
              });
            });
            // setCodeNames(codenames);
            // setCodeAmount(codeAmounts);
            const reverseData = codeAmounts.reverse();
            setRejectedJcode(reverseData);
          }
        })
        .catch((error) => {
          setCodeLoadingClass("");
          console.log("error is ", error);
        });
    }, [2000]);
    // GET PAYERS LIST DATA
    setTimeout(() => {
      claims
        .getPayerList()
        .then(({ data: response }) => {
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let payerlist = [];
            resdata.forEach((item) => {
              payerlist.push(item.payer);
            });
            setPayers(payerlist);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }, [7000]);
  }, []);
  useEffect(() => {
    if (activeTab === 1) {
      // SET JCode BILLED VS PAID
      setJcodeLoadingClass("data-loading");
      claims
        .getDashboardJCodeLastFiveYear()
        .then(({ data: response }) => {
          setJcodeLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setJcodeCategories(yearWiseCategories);
            setJcodeFirstPoints(yearWiseDefualtFirstPoints);
            setJcodeLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearJcodeCategories(yearWiseCategories);
            setFiveYearJcodeFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearJcodeLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setJcodeLoadingClass("");
          console.log("error is ", error);
        });
    }
  }, [jcodeChartState]);

  useEffect(() => {
    if (activeTab === 2) {
      // SET Ancillary BILLED VS PAID
      setAncillaryLoadingClass("data-loading");
      claims
        .getDashboardAncillaryLastFiveYear()
        .then(({ data: response }) => {
          setAncillaryLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setAncillaryCategories(yearWiseCategories);
            setAncillaryFirstPoints(yearWiseDefualtFirstPoints);
            setAncillaryLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearAncillaryCategories(yearWiseCategories);
            setFiveYearAncillaryFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearAncillaryLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setAncillaryLoadingClass("");
          console.log("error is ", error);
        });
    }
  }, [ancillaryChartState]);

  useEffect(() => {
    if (activeTab == 3) {
      // SET Premed BILLED VS PAID
      setPremedLoadingClass("data-loading");
      claims
        .getDashboardPreMedLastFiveYear()
        .then(({ data: response }) => {
          setPremedLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setPremedCategories(yearWiseCategories);
            setPremedFirstPoints(yearWiseDefualtFirstPoints);
            setPremedLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearPremedCategories(yearWiseCategories);
            setFiveYearPremedFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearPremedLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setPremedLoadingClass("");
          console.log("error is ", error);
        });
    }
  }, [premedChartState]);

  // GET CODES DETAIL
  const getCodeDetails = (code) => {
    setCodeLoadingClass("data-loading");
    claims
      .getJCodeRejectedDetailByJCode(code, startDate, endDate)
      .then(({ data: response }) => {
        setCodeLoadingClass("");
        const resdata = response.data;
        if (
          typeof resdata !== "undefined" &&
          resdata !== "" &&
          resdata !== null
        ) {
          let codenames = [];
          let codeAmounts = [];
          resdata.forEach((item) => {
            codenames.push(item.PayerName);
            codeAmounts.push(Math.round(item.ChargeAmount));
          });
          setCodeNames(codenames);
          setCodeAmount(codeAmounts);
        }
      })
      .catch((error) => {
        setCodeLoadingClass("");
        console.log("error is ", error);
      });
  };

  // UPDATE ADMIN AMOUNTS
  const updateAdminChart = async (e) => {
    let cat = e.point.category;
    setAdminLoadingClass("data-loading");
    console.log("billed state ", billedState);
    if (billedState === 0) {
      if (billedCategories.length > 0 && cat === billYear) {
        setAdminLoadingClass("");
        setBilledCategories(fiveYearBilledCategories);
        setBilledFirstPoints(fiveYearBilledFirstPoints);
        setBilledLastPoints(fiveYearBilledLastPoints);
        setBilledState(1);
        setActiveTopHeader(1);
        setAdminChartTitle(`Admin(${cat})`);
      } else {
        claims
          .getDashboardAdminCodeByYear(cat)
          .then(({ data: response }) => {
            setAdminLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setBilledCategories(newCategoies);
              setBilledFirstPoints(newFirstPoints);
              setBilledLastPoints(newLastPoints);
              setYearBilledCategories(newCategoies);
              setYearBilledFirstPoints(newFirstPoints);
              setYearBilledLastPoints(newLastPoints);
              setAdminChartTitle(`Admin(${cat})`);
              setBillYear(cat);
              setBilledState(1);
              setActiveTopHeader(1);
            }
          })
          .catch((error) => {
            setAdminLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthBilledCategories.length > 0 && cat === billMonth) {
        setAdminLoadingClass("");
        setBilledCategories(monthBilledCategories);
        setBilledFirstPoints(monthBilledFirstPoints);
        setBilledLastPoints(monthBilledLastPoints);
        setAdminChartTitle(`Admin(${billYear} - ${cat})`);
        setBilledState(2);
        setActiveTopHeader(2);
      } else {
        claims
          .getDashboardAdminCodeByMonth(cat, billYear)
          .then(({ data: response }) => {
            setAdminLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setBilledCategories(newCategoies);
              setBilledFirstPoints(newFirstPoints);
              setBilledLastPoints(newLastPoints);
              setMonthBilledCategories(newCategoies);
              setMonthBilledFirstPoints(newFirstPoints);
              setMonthBilledLastPoints(newLastPoints);
              setAdminChartTitle(`Admin(${billYear} - ${cat})`);
              setBillMonth(cat);
              setBilledState(2);
              setActiveTopHeader(2);
            }
          })
          .catch((error) => {
            setAdminLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };

  // REVERT ADMIN CHARTS DATA
  const revertAdminChart = async () => {
    setAdminLoadingClass("data-loading");
    if (billedState === 1) {
      setAdminLoadingClass("");
      setBilledCategories(fiveYearBilledCategories);
      setBilledFirstPoints(fiveYearBilledFirstPoints);
      setBilledLastPoints(fiveYearBilledLastPoints);
      setAdminChartTitle(`Admin`);
      setBilledState(0);
    } else {
      setAdminLoadingClass("");
      setBilledCategories(yearBilledCategories);
      setBilledFirstPoints(yearBilledFirstPoints);
      setBilledLastPoints(yearBilledLastPoints);
      setAdminChartTitle(`Admin (${billYear})`);
      setBilledState(1);
    }
  };
  console.log("activ top header ", activeTopHeader);
  // Refresh Admin Chart
  const refreshAdminChart = () => {
    setAdminLoadingClass("data-loading");
    if (billedState === 0) {
      claims
        .getDashboardAdminCodeLastFiveYear()
        .then(({ data: response }) => {
          setAdminLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setBilledCategories(yearWiseCategories);
            setBilledFirstPoints(yearWiseDefualtFirstPoints);
            setBilledLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearBilledCategories(yearWiseCategories);
            setFiveYearBilledFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearBilledLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setAdminLoadingClass("");
          console.log("error is ", error);
        });
    } else if (billedState === 1) {
      claims
        .getDashboardAdminCodeByYear(billYear)
        .then(({ data: response }) => {
          setAdminLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.monthName);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setBilledCategories(newCategoies);
            setBilledFirstPoints(newFirstPoints);
            setBilledLastPoints(newLastPoints);
            setYearBilledCategories(newCategoies);
            setYearBilledFirstPoints(newFirstPoints);
            setYearBilledLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setAdminLoadingClass("");
          console.log("error is ", error);
        });
    } else {
      claims
        .getDashboardAdminCodeByMonth(billMonth, billYear)
        .then(({ data: response }) => {
          setAdminLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.day);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setBilledCategories(newCategoies);
            setBilledFirstPoints(newFirstPoints);
            setBilledLastPoints(newLastPoints);
            setMonthBilledCategories(newCategoies);
            setMonthBilledFirstPoints(newFirstPoints);
            setMonthBilledLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setAdminLoadingClass("");
          console.log("error is ", error);
        });
    }
  };
  // Refresh Jcode Chart
  const refreshJcodeChart = () => {
    setJcodeLoadingClass("data-loading");
    if (jcodeStatus === 0) {
      claims
        .getDashboardJCodeLastFiveYear()
        .then(({ data: response }) => {
          setJcodeLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setJcodeCategories(yearWiseCategories);
            setJcodeFirstPoints(yearWiseDefualtFirstPoints);
            setJcodeLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearJcodeCategories(yearWiseCategories);
            setFiveYearJcodeFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearJcodeLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setJcodeLoadingClass("");
          console.log("error is ", error);
        });
    } else if (jcodeStatus === 1) {
      claims
        .getDashboardJCodeByYear(jcodeYear)
        .then(({ data: response }) => {
          setJcodeLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.monthName);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setJcodeCategories(newCategoies);
            setJcodeFirstPoints(newFirstPoints);
            setJcodeLastPoints(newLastPoints);
            setYearJcodeCategories(newCategoies);
            setYearJcodeFirstPoints(newFirstPoints);
            setYearJcodeLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setJcodeLoadingClass("");
          console.log("error is ", error);
        });
    } else {
      claims
        .getDashboardJCodeByMonth(jcodeMonth, jcodeYear)
        .then(({ data: response }) => {
          setJcodeLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.day);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setJcodeCategories(newCategoies);
            setJcodeFirstPoints(newFirstPoints);
            setJcodeLastPoints(newLastPoints);
            setMonthJcodeCategories(newCategoies);
            setMonthJcodeFirstPoints(newFirstPoints);
            setMonthJcodeLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setJcodeLoadingClass("");
          console.log("error is ", error);
        });
    }
  };

  // Refresh Ancillary Chart
  const refreshAncillaryChart = () => {
    setAncillaryLoadingClass("data-loading");
    if (ancillaryStatus === 0) {
      claims
        .getDashboardAncillaryLastFiveYear()
        .then(({ data: response }) => {
          setAncillaryLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setAncillaryCategories(yearWiseCategories);
            setAncillaryFirstPoints(yearWiseDefualtFirstPoints);
            setAncillaryLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearAncillaryCategories(yearWiseCategories);
            setFiveYearAncillaryFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearAncillaryLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setAncillaryLoadingClass("");
          console.log("error is ", error);
        });
    } else if (ancillaryStatus === 1) {
      claims
        .getDashboardAncillaryByYear(ancillaryYear)
        .then(({ data: response }) => {
          setAncillaryLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.monthName);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setAncillaryCategories(newCategoies);
            setAncillaryFirstPoints(newFirstPoints);
            setAncillaryLastPoints(newLastPoints);
            setYearAncillaryCategories(newCategoies);
            setYearAncillaryFirstPoints(newFirstPoints);
            setYearAncillaryLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setAncillaryLoadingClass("");
          console.log("error is ", error);
        });
    } else {
      claims
        .getDashboardAncillaryByMonth(ancillaryMonth, ancillaryYear)
        .then(({ data: response }) => {
          setAncillaryLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.day);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setAncillaryCategories(newCategoies);
            setAncillaryFirstPoints(newFirstPoints);
            setAncillaryLastPoints(newLastPoints);
            setMonthAncillaryCategories(newCategoies);
            setMonthAncillaryFirstPoints(newFirstPoints);
            setMonthAncillaryLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setAncillaryLoadingClass("");
          console.log("error is ", error);
        });
    }
  };

  // Refresh Premed Chart
  const refreshPremedChart = () => {
    setPremedLoadingClass("data-loading");
    if (premedStatus === 0) {
      claims
        .getDashboardPreMedLastFiveYear()
        .then(({ data: response }) => {
          setPremedLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(Math.round(item.billedAmount));
              yearWiseDefualtLastPoints.push(Math.round(item.paidAmount));
            });
            setPremedCategories(yearWiseCategories);
            setPremedFirstPoints(yearWiseDefualtFirstPoints);
            setPremedLastPoints(yearWiseDefualtLastPoints);
            // setBilledLastPoints([]);
            setFiveYearPremedCategories(yearWiseCategories);
            setFiveYearPremedFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearPremedLastPoints(yearWiseDefualtLastPoints);
            // setFiveYearBilledLastPoints([]);
          }
        })
        .catch((error) => {
          setPremedLoadingClass("");
          console.log("error is ", error);
        });
    } else if (premedStatus === 1) {
      claims
        .getDashboardPreMedByYear(premedYear)
        .then(({ data: response }) => {
          setPremedLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.monthName);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setPremedCategories(newCategoies);
            setPremedFirstPoints(newFirstPoints);
            setPremedLastPoints(newLastPoints);
            setYearPremedCategories(newCategoies);
            setYearPremedFirstPoints(newFirstPoints);
            setYearPremedLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setPremedLoadingClass("");
          console.log("error is ", error);
        });
    } else {
      claims
        .getDashboardPreMedByMonth(premedMonth, premedYear)
        .then(({ data: response }) => {
          setPremedLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.day);
              newFirstPoints.push(Math.round(item.billedAmount));
              newLastPoints.push(Math.round(item.paidAmount));
            });
            setPremedCategories(newCategoies);
            setPremedFirstPoints(newFirstPoints);
            setPremedLastPoints(newLastPoints);
            setMonthPremedCategories(newCategoies);
            setMonthPremedFirstPoints(newFirstPoints);
            setMonthPremedLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setPremedLoadingClass("");
          console.log("error is ", error);
        });
    }
  };

  // JCODE UPDATE && REVERT FUNCTIONS
  const updateJcode = (e) => {
    let cat = e.point.category;
    setJcodeLoadingClass("data-loading");
    if (jcodeStatus === 0) {
      if (fiveYearJcodeCategories.length > 0 && cat === jcodeYear) {
        setJcodeLoadingClass("");
        setJcodeCategories(fiveYearJcodeCategories);
        setJcodeFirstPoints(fiveYearJcodeFirstPoints);
        setJcodeLastPoints(fiveYearJcodeLastPoints);
        setJcodeStatus(1);
        setJcodeChartTitle(`JCode (${cat})`);
      } else {
        claims
          .getDashboardJCodeByYear(cat)
          .then(({ data: response }) => {
            setJcodeLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setJcodeCategories(newCategoies);
              setJcodeFirstPoints(newFirstPoints);
              setJcodeLastPoints(newLastPoints);
              setYearJcodeCategories(newCategoies);
              setYearJcodeFirstPoints(newFirstPoints);
              setYearJcodeLastPoints(newLastPoints);
              setJcodeChartTitle(`JCode (${cat})`);
              setJcodeYear(cat);
              setJcodeStatus(1);
            }
          })
          .catch((error) => {
            setJcodeLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthJcodeCategories.length > 0 && cat === billMonth) {
        setJcodeLoadingClass("");
        setJcodeCategories(monthJcodeCategories);
        setJcodeFirstPoints(monthJcodeFirstPoints);
        setJcodeLastPoints(monthJcodeLastPoints);
        setJcodeChartTitle(`JCode (${jcodeYear} - ${cat})`);
        setJcodeStatus(2);
      } else {
        claims
          .getDashboardJCodeByMonth(cat, jcodeYear)
          .then(({ data: response }) => {
            setJcodeLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setJcodeCategories(newCategoies);
              setJcodeFirstPoints(newFirstPoints);
              setJcodeLastPoints(newLastPoints);
              setMonthJcodeCategories(newCategoies);
              setMonthJcodeFirstPoints(newFirstPoints);
              setMonthJcodeLastPoints(newLastPoints);
              setJcodeChartTitle(`JCode (${jcodeYear} - ${cat})`);
              setJcodeMonth(cat);
              setJcodeStatus(2);
            }
          })
          .catch((error) => {
            setJcodeLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };
  const revertJcode = () => {
    setJcodeLoadingClass("data-loading");
    if (jcodeStatus === 1) {
      setJcodeLoadingClass("");
      setJcodeCategories(fiveYearJcodeCategories);
      setJcodeFirstPoints(fiveYearJcodeFirstPoints);
      setJcodeLastPoints(fiveYearJcodeLastPoints);
      setJcodeChartTitle(`JCode`);
      setJcodeStatus(0);
    } else {
      setJcodeLoadingClass("");
      setJcodeCategories(yearJcodeCategories);
      setJcodeFirstPoints(yearJcodeFirstPoints);
      setJcodeLastPoints(yearJcodeLastPoints);
      setJcodeChartTitle(`JCode (${jcodeYear})`);
      setJcodeStatus(1);
    }
  };

  // ANCILLARY UPDATE && REVERT FUNCTIONS
  const updateAncillary = (e) => {
    let cat = e.point.category;
    setAncillaryLoadingClass("data-loading");
    if (ancillaryStatus === 0) {
      if (yearAncillaryCategories.length > 0 && cat === ancillaryYear) {
        setAncillaryLoadingClass("");
        setAncillaryCategories(fiveYearAncillaryCategories);
        setAncillaryFirstPoints(fiveYearAncillaryFirstPoints);
        setAncillaryLastPoints(fiveYearAncillaryLastPoints);
        setAncillaryStatus(1);
        setAncillaryChartTitle(`Ancillary (${cat})`);
      } else {
        claims
          .getDashboardAncillaryByYear(cat)
          .then(({ data: response }) => {
            setAncillaryLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setAncillaryCategories(newCategoies);
              setAncillaryFirstPoints(newFirstPoints);
              setAncillaryLastPoints(newLastPoints);
              setYearAncillaryCategories(newCategoies);
              setYearAncillaryFirstPoints(newFirstPoints);
              setYearAncillaryLastPoints(newLastPoints);
              setAncillaryChartTitle(`Ancillary (${cat})`);
              setAncillaryYear(cat);
              setAncillaryStatus(1);
            }
          })
          .catch((error) => {
            setAncillaryLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthAncillaryCategories.length > 0 && cat === billMonth) {
        setAncillaryLoadingClass("");
        setAncillaryCategories(monthAncillaryCategories);
        setAncillaryFirstPoints(monthAncillaryFirstPoints);
        setAncillaryLastPoints(monthAncillaryLastPoints);
        setAncillaryChartTitle(`Ancillary (${ancillaryYear} - ${cat})`);
        setAncillaryStatus(2);
      } else {
        claims
          .getDashboardAncillaryByMonth(cat, ancillaryYear)
          .then(({ data: response }) => {
            setAncillaryLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setAncillaryCategories(newCategoies);
              setAncillaryFirstPoints(newFirstPoints);
              setAncillaryLastPoints(newLastPoints);
              setMonthAncillaryCategories(newCategoies);
              setMonthAncillaryFirstPoints(newFirstPoints);
              setMonthAncillaryLastPoints(newLastPoints);
              setAncillaryChartTitle(`Ancillary (${ancillaryYear} - ${cat})`);
              setAncillaryMonth(cat);
              setAncillaryStatus(2);
            }
          })
          .catch((error) => {
            setAncillaryLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };
  const revertAncillary = () => {
    setAncillaryLoadingClass("data-loading");
    if (ancillaryStatus === 1) {
      setAncillaryLoadingClass("");
      setAncillaryCategories(fiveYearAncillaryCategories);
      setAncillaryFirstPoints(fiveYearAncillaryFirstPoints);
      setAncillaryLastPoints(fiveYearAncillaryLastPoints);
      setAncillaryChartTitle(`Ancillary`);
      setAncillaryStatus(0);
    } else {
      setAncillaryLoadingClass("");
      setAncillaryCategories(yearAncillaryCategories);
      setAncillaryFirstPoints(yearAncillaryFirstPoints);
      setAncillaryLastPoints(yearAncillaryLastPoints);
      setAncillaryChartTitle(`Ancillary (${ancillaryYear})`);
      setAncillaryStatus(1);
    }
  };

  // PRE-MED UPDATE && REVERT FUNCTIONS
  const updatePremed = (e) => {
    let cat = e.point.category;
    setPremedLoadingClass("data-loading");
    if (premedStatus === 0) {
      if (yearPremedCategories.length > 0 && cat === ancillaryYear) {
        setPremedLoadingClass("");
        setPremedCategories(fiveYearPremedCategories);
        setPremedFirstPoints(fiveYearPremedFirstPoints);
        setPremedLastPoints(fiveYearPremedLastPoints);
        setPremedStatus(1);
        setPremedChartTitle(`Pre-Med (${cat})`);
      } else {
        claims
          .getDashboardPreMedByYear(cat)
          .then(({ data: response }) => {
            setPremedLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setPremedCategories(newCategoies);
              setPremedFirstPoints(newFirstPoints);
              setPremedLastPoints(newLastPoints);
              setYearPremedCategories(newCategoies);
              setYearPremedFirstPoints(newFirstPoints);
              setYearPremedLastPoints(newLastPoints);
              setPremedChartTitle(`Pre-Med (${cat})`);
              setPremedYear(cat);
              setPremedStatus(1);
            }
          })
          .catch((error) => {
            setPremedLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthPremedCategories.length > 0 && cat === billMonth) {
        setPremedLoadingClass("");
        setPremedCategories(monthPremedCategories);
        setPremedFirstPoints(monthPremedFirstPoints);
        setPremedLastPoints(monthPremedLastPoints);
        setPremedChartTitle(`Pre-Med (${premedYear} - ${cat})`);
        setPremedStatus(2);
      } else {
        claims
          .getDashboardPreMedByMonth(cat, premedYear)
          .then(({ data: response }) => {
            setPremedLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(Math.round(item.billedAmount));
                newLastPoints.push(Math.round(item.paidAmount));
              });
              setPremedCategories(newCategoies);
              setPremedFirstPoints(newFirstPoints);
              setPremedLastPoints(newLastPoints);
              setMonthPremedCategories(newCategoies);
              setMonthPremedFirstPoints(newFirstPoints);
              setMonthPremedLastPoints(newLastPoints);
              setPremedChartTitle(`Pre-Med (${premedYear} - ${cat})`);
              setPremedMonth(cat);
              setPremedStatus(2);
            }
          })
          .catch((error) => {
            setPremedLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };
  const revertPremed = () => {
    setPremedLoadingClass("data-loading");
    if (premedStatus === 1) {
      setPremedLoadingClass("");
      setPremedCategories(fiveYearPremedCategories);
      setPremedFirstPoints(fiveYearPremedFirstPoints);
      setPremedLastPoints(fiveYearPremedLastPoints);
      setPremedChartTitle(`Pre-Med`);
      setPremedStatus(0);
    } else {
      setPremedLoadingClass("");
      setPremedCategories(yearPremedCategories);
      setPremedFirstPoints(yearPremedFirstPoints);
      setPremedLastPoints(yearPremedLastPoints);
      setPremedChartTitle(`Pre-Med (${premedYear})`);
      setPremedStatus(1);
    }
  };

  // DONUT CHART UPDATE AND REVERT FUNCTIONS
  const updatedonutChart = (cat) => {
    if (donutStatus !== 1) {
      var category = cat.split(" ")[0];
      setDonutChartLoadingClass("data-loading");
      claims
        .getDashboardCodesAmountByType("2020", category)
        .then(({ data: response }) => {
          setDonutChartLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let newdata = [];
            let colors = [];
            resdata.forEach((item) => {
              let amountval = Math.round(item.paidAmount);
              // newdata.push({ name: item.code, y: amountval });
              const colorValue = `hsl(${amountval}, 70%, 50%)`;
              newdata.push({
                id: item.code,
                label: item.code,
                value: amountval,
                color: colorValue,
              });
              colors.push(
                "#" +
                ((Math.random() * 0xffffff) << 0)
                  .toString(16)
                  .padStart(6, "0")
              );
            });
            setDonutColors(colors);
            setDonutData(newdata);
            setDonutStatus(1);
          }
        })
        .catch((error) => {
          setDonutChartLoadingClass("");
          console.log("error is ", error);
        });
    }
  };

  const revertDonutChart = () => {
    setDonutColors(defualtDonutColors);
    setDonutData(donutDefaultData);
    setDonutStatus(0);
  };

  // CHARTS CONFIGURATION
  const billedbarChart = {
    chart: {
      type: "area",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 30,
      spacingRight: 30,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      // text: adminChartTitle,
      text: "",
      align: "left",
    },
    xAxis: {
      categories: billedCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      gridLineColor: "#f7f7f7",
      text: "Billed Vs Paid",
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    dataLabels: {
      enabled: true,
      useHTML: true,
      rotation: -90,
      color: "#FFFFFF",
      align: "right",
      format: "{point.y}", // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: "11px",
      },
    },
    series: [
      {
        name: "Billed",
        data: billedFirstPoints,
        lineColor: "#e2e2e2",
        color: "#e2e2e2",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(189, 189, 189, 0.4)"],
            [0, "rgba(189, 189, 189, 0.2)"],
            [1, "rgba(189, 189, 189, 0.0)"],
          ],
        },
        dataLabels: {
          color: "#bdbdbd",
        },
      },
      {
        name: "Paid",
        data: billedLastPoints,
        lineColor: "#c8f5ec",
        color: "#c8f5ec",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(10, 226, 179, 0.4)"],
            [0, "rgba(10, 226, 179, 0.2)"],
            [1, "rgba(10, 226, 179, 0.0)"],
          ],
        },
      },
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            click: (e) => {
              if (billedState !== 2) {
                updateAdminChart(e);
              }
            },
          },
        },
      },
      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
      area: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
        enableMouseTracking: true,
      },
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
    },
    exporting: {
      buttons: [
        billedState !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertAdminChart();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  const jcodeChart = {
    chart: {
      type: "area",
      spacingBottom: 20,
      spacingTop: 20,
      spacingLeft: 20,
      spacingRight: 20,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      // text: jcodeChartTitle,
      text: "",
      align: "left",
    },
    subtitle: {
      text: "",
    },
    legend: {
      enabled: true,
    },
    xAxis: {
      categories: jcodeCategories,
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineColor: "#f7f7f7",
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (jcodeStatus !== 2) {
              updateJcode(e);
            }
          },
        },
      },
      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
      area: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
        enableMouseTracking: true,
      },
    },

    series: [
      {
        name: "Billed",
        data: jcodeFirstPoints,
        lineColor: "#e2e2e2",
        color: "#e2e2e2",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(189, 189, 189, 0.4)"],
            [0, "rgba(189, 189, 189, 0.2)"],
            [1, "rgba(189, 189, 189, 0.0)"],
          ],
        },
        dataLabels: {
          color: "#bdbdbd",
        },
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Paid",
        data: jcodeLastPoints,
        lineColor: "#cad0e8",
        color: "#cad0e8",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(202, 208, 232, 0.9)"],
            [0, "rgba(202, 208, 232, 0.8)"],
            [1, "rgba(202, 208, 232, 0.0)"],
          ],
        },
        showInLegend: true,
      },
    ],
    exporting: {
      buttons: [
        jcodeStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertJcode();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // ANCILLARY CHART CONFIGUREATION
  const ancillaryChart = {
    chart: {
      type: "area",
      spacingBottom: 20,
      spacingTop: 20,
      spacingLeft: 20,
      spacingRight: 20,
      borderRadius: 10,
    },
    title: {
      // text: ancillaryChartTitle,
      text: "",
    },

    xAxis: {
      categories: ancillaryCategories,
    },
    yAxis: {
      min: 0,
      labels: {
        format: "${value}",
      },
      gridLineColor: "#f7f7f7",
      // lineWidth: 1,
      // opposite: false,
      title: {
        text: "",
      },
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (ancillaryStatus !== 2) {
              updateAncillary(e);
            }
          },
        },
      },
      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
      area: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: "Billed",
        data: ancillaryFirstPoints,
        lineColor: "#FA600E",
        lineColor: "#e2e2e2",
        color: "#e2e2e2",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(189, 189, 189, 0.4)"],
            [0, "rgba(189, 189, 189, 0.2)"],
            [1, "rgba(189, 189, 189, 0.0)"],
          ],
        },
        dataLabels: {
          color: "#bdbdbd",
        },
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Paid",
        data: ancillaryLastPoints,
        lineColor: "#f9f0c8",
        color: "#f9f0c8",
        showInLegend: true,
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(249, 240, 200, 0.9)"],
            [0, "rgba(249, 240, 200, 0.8)"],
            [1, "rgba(249, 240, 200, 0.0)"],
          ],
        },
      },
    ],
    exporting: {
      buttons: [
        ancillaryStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertAncillary();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // PREMED CHART CONFIGURATION
  const premedChart = {
    chart: {
      type: "area",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 30,
      spacingRight: 30,
      borderRadius: 10,
    },
    title: {
      // text: premedChartTitle,
      text: "",
    },

    xAxis: {
      categories: premedCategories,
    },
    yAxis: {
      min: 0,
      labels: {
        format: "${value}",
      },
      // lineWidth: 1,
      // opposite: true,
      title: {
        text: "",
      },
      gridLineColor: "#f7f7f7",
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
      area: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
        enableMouseTracking: true,
      },
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (premedStatus !== 2) {
              updatePremed(e);
            }
          },
        },
      },
    },
    series: [
      {
        name: "Billed",
        data: premedFirstPoints,
        lineColor: "#e2e2e2",
        color: "#e2e2e2",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(189, 189, 189, 0.4)"],
            [0, "rgba(189, 189, 189, 0.2)"],
            [1, "rgba(189, 189, 189, 0.0)"],
          ],
        },
        dataLabels: {
          color: "#bdbdbd",
        },
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Paid",
        data: premedLastPoints,
        lineColor: "#f5d8df",
        color: "#f5d8df",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(245, 216, 223, 0.9)"],
            [0, "rgba(245, 216, 223, 0.5)"],
            [1, "rgba(245, 216, 223, 0.0)"],
          ],
        },
        showInLegend: true,
      },
    ],
    exporting: {
      buttons: [
        premedStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertPremed();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // DONUT CHARTS
  const cpu = {
    chart: {
      renderTo: "container",
      type: "pie",
    },
    title: {
      text: "CPT Code",
      verticalAlign: "top",
      floating: true,
    },
    subtitle: {
      text: "84% <br /> used",
      verticalAlign: "middle",
      // y: -10,
      floating: true,
    },
    yAxis: {
      title: {
        text: "Total percent market share",
      },
      gridLineColor: "#f7f7f7",
    },
    plotOptions: {
      pie: {
        shadow: true,
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "<b>{point.name}</b>: ${y}",
          formatter: function () {
            return `<b>${this.point.name}: </b> $` + numberFormat(this.point.y);
          },
        },
      },
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (donutStatus !== 1) {
              updatedonutChart(e.point.name);
            }
          },
        },
      },
      showInLegend: true,
    },
    tooltip: {
      formatter: function () {
        return "<br>" + this.point.name + "</>: $" + this.y;
      },
      useHTML: true,
    },
    series: [
      {
        name: "Browsers",
        colors: donutColors,
        data: donutData,
        size: "75%",
        innerSize: "75%",
        showInLegend: true,
        dataLabels: {
          enabled: true,
          useHTML: true,
        },
      },
    ],
  };

  // REJECTED CODES
  const rejectedCodesChart = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Title Top 10 Rejected Codes",
    },
    xAxis: {
      categories: codeNames,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
      gridLineColor: "#f7f7f7",
    },
    legend: {
      reversed: false,
      enabled: false,
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    plotOptions: {
      series: {
        stacking: "normal",
        cursor: "pointer",
        events: {
          click: function (e) {
            getCodeDetails(e.point.category);
          },
        },
      },
      bar: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          color: "#222",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
      },
    },
    series: [
      {
        name: "Code",
        // data: [2.5, 2.7, 2.2, 1.1, 1],
        data: codeAmount,
        color: "#ff6b6b",
      },
    ],
  };

  // SUNBURST CHART CONFIGURATION
  const sunburstchart = {
    chart: {
      height: "65%",
    },

    title: {
      text: "World population 2017",
    },
    subtitle: {
      text:
        'Source <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>',
    },
    series: [
      {
        type: "sunburst",
        data: sunburstdata,
        allowDrillToNode: true,
        cursor: "pointer",
        dataLabels: {
          format: "{point.name}",
          filter: {
            property: "innerArcLength",
            operator: ">",
            value: 16,
          },
          rotationMode: "circular",
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: "outerArcLength",
                operator: ">",
                value: 64,
              },
            },
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: -0.5,
            },
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: 0.5,
            },
          },
        ],
      },
    ],
    tooltip: {
      headerFormat: "",
      pointFormat:
        "The population of <b>{point.name}</b> is <b>{point.value}</b>",
    },
  };

  const handleActiveTab = (index) => {
    setActiveTab(index);
    if (index === 0) {
      setAdminChartState(!adminChartState);
    } else if (index === 1) {
      setJcodeChartState(!jcodeChartState);
    } else if (index === 2) {
      setAncillaryChartState(!ancillaryChartState);
    } else {
      setPremedChartState(!premedChartState);
    }
    setActiveTopHeader(0);
  };

  const handleActiveTabRefresh = () => {
    if (activeTab === 0) {
      refreshAdminChart();
    } else if (activeTab === 1) {
      refreshJcodeChart();
    } else if (activeTab === 2) {
      refreshAncillaryChart();
    } else {
      refreshPremedChart();
    }
  };

  const handleDonutSelection = (e) => {
    const btns = [...donutButtons];
    let index = btns.filter((item) => item === e);
    if (index.length === 0) {
      btns.push(e);
    } else {
      btns.pop(e);
    }
    setDonutButtons(btns);
  };

  const numberFormat = (number) => {
    var SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
    // what tier? (determines SI prefix)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a prefix
    if (tier == 0) return number;

    // get postfix and determine scale
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add postfix as suffix
    var formatted = scaled.toFixed(1) + "";

    // remove '.0' case
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2);

    return formatted + postfix;
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <header className="dashboard-header header-new new-ui-bx-search">
        <div className="header-search-main">
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" href="/">
                Insights
                      </Link>
              <Typography color="textPrimary">CPT Codes</Typography>
            </Breadcrumbs>
          </Box>
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <div className="dashboard-main tp-pd-0"

      >
        {/* new box */}

        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={12}>
                  {/* <h2 className="page-heading mb-0">Dashboard</h2> */}
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new bred-top-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Typography color="textPrimary">CPT Codes</Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>
                <Grid item xs={8}>
                  <div className="pre-adj-tabs-all">
                    <ul>
                      <li>
                        <NavLink to="/">
                          <img src={DashboardIcongry} alt="icon" />
                          <label>Dashboard</label>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/rca">
                          <img src={TabInsightsicon} alt="icon" />
                          <label>Smart Insights</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/biosimilar">
                          <img src={TabInsightsicon} alt="icon" />
                          <label>Biosimilars</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/codes" className="pre-active">
                          <img src={TabcptcodeiconGr} alt="icon" />
                          <label>CPT Codes</label>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <button
                    className="pull-right dr-success-btn"
                    type="button"
                    onClick={handleOpen}
                  >
                    CPT Charts
                  </button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={2} direction="row" alignItems="stretch">
          <Grid item xs={12} md={3}>
            <div className="DR-mini-card cr-main-bx DR-mini-crd-green">
              <div className="DR-mini-crd-inner">
                <h2 className="mb-0 box-title-835">Admin</h2>
                <p className="box-text-code">
                  <span>Loss:</span> $148.86{" "}
                </p>
                <p className="box-text-code">
                  <span>Billed:</span> $117.6{" "}
                </p>
              </div>
              <div className="DR-mini-img-green">
                <img className="mini-crd-img" src={AdminIcon} alt="Icon" />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="DR-mini-card cr-main-bx DR-mini-crd-purpel">
              <div className="DR-mini-crd-inner">
                <h2 className="mb-0 box-title-835">Jcode</h2>
                <p className="box-text-code">
                  <span>Loss:</span> $148.86{" "}
                </p>
                <p className="box-text-code">
                  <span>Billed:</span> $117.6{" "}
                </p>
              </div>
              <div className="DR-mini-img-purpel">
                <img className="mini-crd-img" src={JcodeIcon} alt="Icon" />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="DR-mini-card cr-main-bx DR-mini-crd-yellow">
              <div className="DR-mini-crd-inner">
                <h2 className="mb-0 box-title-835">Ancillary</h2>
                <p className="box-text-code">
                  <span>Loss:</span> $148.86{" "}
                </p>
                <p className="box-text-code">
                  <span>Billed:</span> $117.6{" "}
                </p>
              </div>
              <div className="DR-mini-img-yellow">
                <img className="mini-crd-img" src={AncillaryIcon} alt="Icon" />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="DR-mini-card cr-main-bx DR-mini-crd-red">
              <div className="DR-mini-crd-inner">
                <h2 className="mb-0 box-title-835">Pre-Meds</h2>
                <p className="box-text-code">
                  <span>Loss:</span> $148.86{" "}
                </p>
                <p className="box-text-code">
                  <span>Billed:</span> $117.6{" "}
                </p>
              </div>
              <div className="DR-mini-img-red">
                <img className="mini-crd-img" src={PreMedIcon} alt="Icon" />
              </div>
            </div>
          </Grid>
        </Grid>

        {/* <Grid container spacing={2} direction="row" alignItems="stretch">
          <Grid item xs={12} md={3}>
            <div className="progress-box-main-code m-0">
              <div className="progress-box cliam-box-code m-0">
                <div className="claim-box-inner pull-right">
                  <span className="claim-box-icon ic-1"></span>
                </div>
                <div className="claim-box-inner">
                  <h2 className="mb-0 box-title-835">Admin</h2>
                  <p className="box-text-code">
                    <span>Loss:</span> $148.86{" "}
                  </p>
                  <p className="box-text-code">
                    <span>Billed:</span> $117.6{" "}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="progress-box-main-code m-0">
              <div className="progress-box cliam-box-code m-0">
                <div className="claim-box-inner pull-right">
                  <span className="claim-box-icon ic-2"></span>
                </div>
                <div className="claim-box-inner">
                  <h2 className="mb-0 box-title-835">Jcode</h2>
                  <p className="box-text-code">
                    <span>Loss:</span> $148.86{" "}
                  </p>
                  <p className="box-text-code">
                    <span>Billed:</span> $117.6{" "}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="progress-box-main-code m-0">
              <div className="progress-box cliam-box-code m-0">
                <div className="claim-box-inner pull-right">
                  <span className="claim-box-icon ic-3"></span>
                </div>
                <div className="claim-box-inner">
                  <h2 className="mb-0 box-title-835">Ancillary</h2>
                  <p className="box-text-code">
                    <span>Loss:</span> $148.86{" "}
                  </p>
                  <p className="box-text-code">
                    <span>Billed:</span> $117.6{" "}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className="progress-box-main-code m-0">
              <div className="progress-box cliam-box-code m-0">
                <div className="claim-box-inner pull-right">
                  <span className="claim-box-icon ic-4"></span>
                </div>
                <div className="claim-box-inner">
                  <h2 className="mb-0 box-title-835">Pre-Meds</h2>
                  <p className="box-text-code">
                    <span>Loss:</span> $148.86{" "}
                  </p>
                  <p className="box-text-code">
                    <span>Billed:</span> $117.6{" "}
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        </Grid> */}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.paper}>
            <div className="pre-adj-tabs-all mt-0  mb-0">
              <Tabs
                className="new-chart-tabs cpt-model-tab"
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab
                  // label="Overview"
                  className="mr-2"
                  icon={<CPTOVerIcon />}
                  {...a11yProps(0)}
                />
                <Tab
                  // label="Heatmap"
                  icon={<CPTHeatIcon />}
                  {...a11yProps(1)}
                />
                <Tab
                  // label="CPT Code"
                  icon={<CPTDonutIcon />}
                  {...a11yProps(2)}
                />
                <Tab
                  // label="Bubble"
                  icon={<CPTBubbleIcon />}
                  {...a11yProps(3)}
                />
              </Tabs>

              <TabPanel className="p-0" value={value} index={0}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="stretch"
                >
                  <Grid item sm={12}>
                    <Box className="line-chart-outer-crd mt-3">
                      <div className="dash-btn-main">
                        <div className="chart-title-main pb-0">
                          <Grid container>
                            <Grid item sm={7}>
                              <Tabs
                                className="new-chart-tabs"
                                value={activeTab}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={(e, index) => handleActiveTab(index)}
                                aria-label="disabled tabs example"
                              >
                                {tabs.map((tab) => {
                                  return <Tab label={tab} key={tab} />;
                                })}
                              </Tabs>
                            </Grid>

                            <Grid item sm={5}>
                              <button
                                className="chart-refresh-btn shadow-ui-new pull-right ml-2"
                                onClick={() => handleActiveTabRefresh()}
                              >
                                <img src={RefreshIcon} alt="Icon" />
                              </button>
                              <ButtonGroup
                                className="pull-right shadow-ui-new"
                                variant="contained"
                              >
                                {console.log("activ inside ", activeTopHeader)}
                                <Button
                                  className={
                                    parseInt(activeTopHeader) === 0 ||
                                      activeTopHeader === ""
                                      ? "chart-ac-btn"
                                      : "chart-dis-btn"
                                  }
                                >
                                  Year
                                </Button>
                                <Button
                                  className={
                                    parseInt(activeTopHeader) === 1
                                      ? "chart-ac-btn"
                                      : "chart-dis-btn"
                                  }
                                >
                                  Month
                                </Button>
                                <Button
                                  className={
                                    parseInt(activeTopHeader) === 2
                                      ? "chart-ac-btn"
                                      : "chart-dis-btn"
                                  }
                                >
                                  Day
                                </Button>
                              </ButtonGroup>
                            </Grid>
                          </Grid>
                        </div>
                      </div>

                      {/* <Paper square> */}

                      {/* </Paper> */}

                      <Grid container>
                        {/* ADMIN CHART */}
                        {activeTab === 0 ? (
                          <Grid item xs={12} sm={12} md={12}>
                            {adminLoadingClass !== "" ? (
                              <div
                                className=""
                                style={{ position: "relative" }}
                              >
                                <div className={adminLoadingClass}>
                                  <div className="cliam-ui-table-2">
                                    <Loading></Loading>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={billedbarChart}
                              />
                            )}
                          </Grid>
                        ) : null}

                        {/* JCODE CHART  */}

                        {activeTab === 1 ? (
                          <Grid item xs={12} sm={12} md={12}>
                            {jcodeLoadingClass !== "" ? (
                              <div
                                className=""
                                style={{ position: "relative" }}
                              >
                                <div className={jcodeLoadingClass}>
                                  <div className="cliam-ui-table-2">
                                    <Loading></Loading>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={jcodeChart}
                              />
                            )}
                          </Grid>
                        ) : null}

                        {/* ANCILLARY  CHART */}
                        {activeTab === 2 ? (
                          <Grid item xs={12} sm={12} md={12}>
                            {ancillaryLoadingClass !== "" ? (
                              <div
                                className="mt-3"
                                style={{ position: "relative" }}
                              >
                                <div className={ancillaryLoadingClass}>
                                  <div className="cliam-ui-table-2">
                                    <Loading></Loading>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={ancillaryChart}
                              />
                            )}
                          </Grid>
                        ) : null}

                        {/* PRE-MED CHART */}

                        {activeTab === 3 ? (
                          <Grid item xs={12} sm={12} md={12}>
                            {premedLoadingClass !== "" ? (
                              <div
                                className="mt-3"
                                style={{ position: "relative" }}
                              >
                                <div className={premedLoadingClass}>
                                  <div className="cliam-ui-table-2">
                                    <Loading></Loading>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={premedChart}
                              />
                            )}
                          </Grid>
                        ) : null}
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
                {/* <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} className="mt-3">
                    <Box className="line-chart-outer-crd line-f-hi pb-4">
                      <div className="dash-btn-main">
                        <div className="chart-title-main">
                          <Grid container>
                            <Grid item sm={12}>
                              <h3 className="chart-title">Denials by CPT code</h3>
                            </Grid>
                          </Grid>
                        </div>
                      </div>

                      <Grid container>
                        <Grid item md={12} className="mt-2">
                          {codeLoadingClass !== "" ? (
                            <div className="mt-3" style={{ position: "relative" }}>
                              <div className={codeLoadingClass}>
                                <div className="cliam-ui-table-2">
                                  <Loading></Loading>
                                </div>
                              </div>
                            </div>
                          ) : (

                            <RejectedBarChart data={rejectedJcode} />
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} className="mt-3">
                    <Box className="line-chart-outer-crd line-f-hi pb-4">
                      <div className="dash-btn-main">
                        <div className="chart-title-main">
                          <Grid container>
                            <Grid item sm={12}>
                              <h3 className="chart-title">TBD</h3>
                            </Grid>
                          </Grid>
                        </div>
                      </div>

                      <Grid container>
                        <Grid item md={12} className="mt-2">
                          <JcodeLineChart />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid> */}
                {/* </Grid> */}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box className="line-chart-outer-crd pb-4  mt-3">
                      <div className="dash-btn-main">
                        <div className="chart-title-main">
                          <Grid container>
                            <Grid item sm={12}>
                              <h3 className="chart-title">Tree Chart</h3>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <CPTTreeMap treeData={treeData}></CPTTreeMap>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                {/* <Grid container>
              <Grid item xs={12} sm={12}>
                <Box className="line-chart-outer-crd pt-3 pb-4 mt-3">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={12}>
                          <h3 className="chart-title">Sunburst Chart</h3>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <React.Fragment>
                    <Grid container>
                      <Grid item md={12}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={sunburstchart}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                </Box>
              </Grid>
            </Grid> */}
                <Grid container>
                  <Grid item sm={12}>
                    <Box className="line-chart-outer-crd line-f-hi mt-3">
                      <div className="dash-btn-main">
                        <div className="chart-title-main">
                          <Grid container>
                            <Grid item sm={7}>
                              <h3 className="chart-title">CPT Code</h3>
                            </Grid>

                            <Grid item sm={5}>
                              {donutStatus !== 0 ? (
                                <button
                                  className="chart-refresh-btn pull-right ml-2"
                                  onClick={() => revertDonutChart()}
                                >
                                  <img src={ChartBack} alt="Icon" />
                                </button>
                              ) : null}

                              {donutStatus === 5 ? (
                                <button
                                  className="chart-refresh-btn pull-right ml-2"
                                  onClick={() => revertDonutChart()}
                                >
                                  <img src={RefreshIcon} alt="Icon" />
                                </button>
                              ) : null}
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      {donutAlert === true ? (
                        <Grid container>
                          <Grid item md={12}>
                            <Messages />
                          </Grid>
                        </Grid>
                      ) : null}
                      <Grid container spacing={3}>
                        <Grid item sm={12}>
                          <DonutPayerDropDown
                            allPayers={payers}
                            selected={donutButtons}
                            SelectAll={(e) => setDonutButtons([])}
                            handleChange={(e) => handleDonutSelection(e)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <React.Fragment>
                            <Grid container spacing={2}>
                              <Grid item md={12} className="mt-2">
                                {donutChartLoadingClass !== "" ? (
                                  <div
                                    className="mt-3"
                                    style={{ position: "relative" }}
                                  >
                                    <div className={donutChartLoadingClass}>
                                      <div className="cliam-ui-table-2">
                                        <Loading></Loading>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // <HighchartsReact
                                  //   highcharts={Highcharts}
                                  //   options={cpu}
                                  // />
                                  <PieChart
                                    chartData={donutData}
                                    onCodeSelection={(e) =>
                                      updatedonutChart(e.id)
                                    }
                                  />
                                )}
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Grid container>
                  <Grid item xs={12}>
                    <Box className="line-chart-outer-crd pb-4  mt-3">
                      <div className="dash-btn-main">
                        <div className="chart-title-main">
                          <Grid container>
                            <Grid item sm={12}>
                              <h3 className="chart-title">Bubble</h3>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                      <BubbleChart></BubbleChart>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
            </div>
          </div>
        </Modal>

        <div className="pre-adj-tabs-all mt-0  mb-0">
          <Tabs
            className="new-chart-tabs"
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              label="Overview"
              className="mr-2"
              icon={<img className="mb-0" src={TabInsightsiconGr} alt="icon" />}
              {...a11yProps(0)}
            />
            <Tab
              label="Heatmap"
              icon={<img className="mb-0" src={TabInsightsiconGr} alt="icon" />}
              {...a11yProps(1)}
            />
            <Tab
              label="CPT Code"
              icon={<img className="mb-0" src={TabInsightsiconGr} alt="icon" />}
              {...a11yProps(2)}
            />
            <Tab
              label="Bubble"
              icon={<img className="mb-0" src={TabInsightsiconGr} alt="icon" />}
              {...a11yProps(3)}
            />
          </Tabs>

          <TabPanel className="p-0" value={value} index={0}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
            >
              <Grid item sm={12}>
                <Box className="line-chart-outer-crd mt-3">
                  <div className="dash-btn-main">
                    <div className="chart-title-main pb-0">
                      <Grid container>
                        <Grid item sm={7}>
                          <Tabs
                            className="new-chart-tabs"
                            value={activeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={(e, index) => handleActiveTab(index)}
                            aria-label="disabled tabs example"
                          >
                            {tabs.map((tab) => {
                              return <Tab label={tab} key={tab} />;
                            })}
                          </Tabs>
                        </Grid>

                        <Grid item sm={5}>
                          <button
                            className="chart-refresh-btn shadow-ui-new pull-right ml-2"
                            onClick={() => handleActiveTabRefresh()}
                          >
                            <img src={RefreshIcon} alt="Icon" />
                          </button>
                          <ButtonGroup
                            className="pull-right shadow-ui-new"
                            variant="contained"
                          >
                            <Button
                              className={
                                activeTopHeader == 5
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              Year
                            </Button>
                            <Button
                              className={
                                parseInt(activeTopHeader) === 1
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              Month
                            </Button>
                            <Button
                              className={
                                parseInt(activeTopHeader) === 2
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              Day
                            </Button>
                          </ButtonGroup>
                        </Grid>
                      </Grid>
                    </div>
                  </div>

                  {/* <Paper square> */}

                  {/* </Paper> */}

                  <Grid container>
                    {/* ADMIN CHART */}
                    {activeTab === 0 ? (
                      <Grid item xs={12} sm={12} md={12}>
                        {adminLoadingClass !== "" ? (
                          <div className="" style={{ position: "relative" }}>
                            <div className={adminLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={billedbarChart}
                          />
                        )}
                      </Grid>
                    ) : null}

                    {/* JCODE CHART  */}

                    {activeTab === 1 ? (
                      <Grid item xs={12} sm={12} md={12}>
                        {jcodeLoadingClass !== "" ? (
                          <div className="" style={{ position: "relative" }}>
                            <div className={jcodeLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={jcodeChart}
                          />
                        )}
                      </Grid>
                    ) : null}

                    {/* ANCILLARY  CHART */}
                    {activeTab === 2 ? (
                      <Grid item xs={12} sm={12} md={12}>
                        {ancillaryLoadingClass !== "" ? (
                          <div
                            className="mt-3"
                            style={{ position: "relative" }}
                          >
                            <div className={ancillaryLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={ancillaryChart}
                          />
                        )}
                      </Grid>
                    ) : null}

                    {/* PRE-MED CHART */}

                    {activeTab === 3 ? (
                      <Grid item xs={12} sm={12} md={12}>
                        {premedLoadingClass !== "" ? (
                          <div
                            className="mt-3"
                            style={{ position: "relative" }}
                          >
                            <div className={premedLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <HighchartsReact
                            highcharts={Highcharts}
                            options={premedChart}
                          />
                        )}
                      </Grid>
                    ) : null}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className="mt-3">
                <Box className="line-chart-outer-crd line-f-hi pb-4">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={12}>
                          <h3 className="chart-title">Denials by CPT code</h3>
                        </Grid>
                      </Grid>
                    </div>
                  </div>

                  <Grid container>
                    <Grid item md={12} className="mt-2">
                      {codeLoadingClass !== "" ? (
                        <div className="mt-3" style={{ position: "relative" }}>
                          <div className={codeLoadingClass}>
                            <div className="cliam-ui-table-2">
                              <Loading></Loading>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // <HighchartsReact
                        //   highcharts={Highcharts}
                        //   options={rejectedCodesChart}
                        // />
                        <RejectedBarChart data={rejectedJcode} />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} className="mt-3">
                <Box className="line-chart-outer-crd line-f-hi pb-4">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={12}>
                          <h3 className="chart-title">TBD</h3>
                        </Grid>
                      </Grid>
                    </div>
                  </div>

                  <Grid container>
                    <Grid item md={12} className="mt-2">
                      <JcodeLineChart />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container>
              <Grid item xs={12}>
                <Box className="line-chart-outer-crd pb-4  mt-3">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={12}>
                          <h3 className="chart-title">Tree Chart</h3>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <CPTTreeMap treeData={treeData}></CPTTreeMap>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <Grid container>
              <Grid item xs={12} sm={12}>
                <Box className="line-chart-outer-crd pt-3 pb-4 mt-3">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={12}>
                          <h3 className="chart-title">Sunburst Chart</h3>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <React.Fragment>
                    <Grid container>
                      <Grid item md={12}>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={sunburstchart}
                        />
                      </Grid>
                    </Grid>
                  </React.Fragment>
                </Box>
              </Grid>
            </Grid> */}
            <Grid container>
              <Grid item sm={12}>
                <Box className="line-chart-outer-crd line-f-hi mt-3">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={7}>
                          <h3 className="chart-title">CPT Code</h3>
                        </Grid>

                        <Grid item sm={5}>
                          {donutStatus !== 0 ? (
                            <button
                              className="chart-refresh-btn pull-right ml-2"
                              onClick={() => revertDonutChart()}
                            >
                              <img src={ChartBack} alt="Icon" />
                            </button>
                          ) : null}

                          {donutStatus === 5 ? (
                            <button
                              className="chart-refresh-btn pull-right ml-2"
                              onClick={() => revertDonutChart()}
                            >
                              <img src={RefreshIcon} alt="Icon" />
                            </button>
                          ) : null}
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  {donutAlert === true ? (
                    <Grid container>
                      <Grid item md={12}>
                        <Messages />
                      </Grid>
                    </Grid>
                  ) : null}
                  <Grid container spacing={3}>
                    <Grid item sm={12}>
                      <DonutPayerDropDown
                        allPayers={payers}
                        selected={donutButtons}
                        SelectAll={(e) => setDonutButtons([])}
                        handleChange={(e) => handleDonutSelection(e)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <React.Fragment>
                        <Grid container spacing={2}>
                          <Grid item md={12} className="mt-2">
                            {donutChartLoadingClass !== "" ? (
                              <div
                                className="mt-3"
                                style={{ position: "relative" }}
                              >
                                <div className={donutChartLoadingClass}>
                                  <div className="cliam-ui-table-2">
                                    <Loading></Loading>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              // <HighchartsReact
                              //   highcharts={Highcharts}
                              //   options={cpu}
                              // />
                              <PieChart
                                chartData={donutData}
                                onCodeSelection={(e) => updatedonutChart(e.id)}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid container>
              <Grid item xs={12}>
                <Box className="line-chart-outer-crd pb-4  mt-3">
                  <div className="dash-btn-main">
                    <div className="chart-title-main">
                      <Grid container>
                        <Grid item sm={12}>
                          <h3 className="chart-title">Bubble</h3>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                  <BubbleChart></BubbleChart>
                </Box>
              </Grid>
            </Grid>
          </TabPanel>
        </div>

        <FooterCopyright />
      </div>
    </>
  );
};

export default CodeDashboard;
