import React from 'react';
import { BsChevronDown } from "react-icons/bs";
import reactLogo from '../images/react1.webp'
import { RiComputerLine } from "react-icons/ri";
import { RiMastercardLine } from "react-icons/ri";
import { BsCalendarEventFill } from "react-icons/bs";
import { IoDocumentSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-dark h-screen w-64 fixed top-0 left-0 overflow-y-auto">
      <div className="p-4">
        <img src={reactLogo} className="h-24 w-auto" alt="React logo" />
      </div>

      <ul className="p-2">

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <RiComputerLine className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Dashboard
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>
        {/* Add other sidebar items here */}

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <RiMastercardLine className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Master
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <BsCalendarEventFill className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Events
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>
        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <IoDocumentSharp className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Procurement
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaShoppingCart className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Order
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <IoDocumentsSharp className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              ASN
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaUserCircle className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Accounts
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaUpload className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Doc Upload
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaArrowUp className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Stock
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaStar className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Quality
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>



        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <RiComputerLine className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Dashboard
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>
        {/* Add other sidebar items here */}

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <RiMastercardLine className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Master
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <BsCalendarEventFill className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Events
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>
        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <IoDocumentSharp className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Procurement
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaShoppingCart className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Order
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <IoDocumentsSharp className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              ASN
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaUserCircle className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Accounts
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaUpload className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Doc Upload
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaArrowUp className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Stock
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>

        <li className="py-2 px-4 hover:bg-gray-300 relative">
          <a href="#" className="block flex items-center justify-between">
            <div className="flex items-center"> {/* Added flex container for icon and text */}
              <FaStar className="mr-2" /> {/* Added margin-right to create space between icon and text */}
              Quality
            </div>
            <BsChevronDown className="ml-2" />
          </a>
          {/* Dropdown menu */}
          <ul className="absolute left-full top-0 mt-2 bg-gray-800 text-white rounded-lg shadow-md hidden">
            {/* Dropdown items */}
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 1</a>
            </li>
            <li className="py-1 px-3 hover:bg-gray-700">
              <a href="#">Dropdown Item 2</a>
            </li>
            {/* Add more dropdown items as needed */}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
