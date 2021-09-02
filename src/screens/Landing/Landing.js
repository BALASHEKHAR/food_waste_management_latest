import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

const Landing = () => {
  return (
    <>
      <img
        className="bg_img"
        src="https://voa-production.s3.amazonaws.com/dragonfly-uploads/2020/11/23/18/06/41/9074568a-9324-4b22-8047-d79ab0bdde22/Iamhungry_Mobile.jpg"
        alt="bg-img"
      />
      <section
        data-aos="zoom-out-down"
        className="text-gray-700 body-font border-t border-gray-200"
      >
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="https://voa-production.s3.amazonaws.com/dragonfly-uploads/2020/11/23/18/06/41/9074568a-9324-4b22-8047-d79ab0bdde22/Iamhungry_Mobile.jpg"
            />
          </div>
          <div className="flex flex-col flex-wrap lg:mt-20  lg:py-6 -mb-10 lg:w-1/2 lg:pl-12  text-center">
            <div className="flex flex-col mb-10 items-center ">
              <div className="flex-grow">
                <div className="home-container-details">
                  <h1>Feed the Hungry</h1>
                  <h4>
                    <b>Share</b> more <b>Care </b>more. Waste less
                  </h4>
                  <Link to="/login">
                    <button className="home-donate-buttton">SignUp</button>
                  </Link>
                  <Link to="/donate">
                    <button className="home-donate-buttton">Donate</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-aos="fade-right"
        id="about"
        className="text-gray-700 body-font border-t  border-gray-200"
      >
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              About us
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="mb-8 leading-relaxed">
              Waste management is one of the main concerns with our environment
              which impacts the health of our society. A significant amount of
              waste disposed by people are organic material. Kitchen wastes like
              food scraps disposed by families and restaurants, are becoming in
              large amounts and the natural capacity of the environment cannot
              assimilate them.
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://www.cleanindiatech.com/blog/wp-content/uploads/2021/02/Untitled-c1.jpg"
            />
          </div>
        </div>
      </section>
      <section
        data-aos="fade-left"
        id="join us"
        className="text-gray-700 body-font border-t border-gray-200"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
              Fight Hunger
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Join us in making the difference
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    27,253,540
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Portions of food shared
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    4,776,024
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">Users</p>
                  <a className="mt-3 text-blue-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 className="text-gray-900 text-lg title-font font-medium">
                    4,177,992,110
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base">
                    Litres of water saved
                  </p>
                  <a className="mt-3 text-blue-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-aos="fade-right"
        id="how_to_use"
        className="text-gray-700 body-font border-t border-gray-200"
      >
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="https://wafarmers.org.au/wp-content/uploads/2019/04/a-world-without-agricultural-chemicals-would-be-hungry.jpg"
            />
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-blue-500 mb-5">
                <p className="text-2xl">1</p>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Fight hunger Boxes
                </h2>
                <p className="leading-relaxed text-base">
                  {" "}
                  We have installed hunger boxes near every hotels and food
                  streets .If your organisation has some food left over , Please
                  keep the food inside the Fight hunger boxes near to your
                  location
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-blue-500 mb-5">
                <p className="text-2xl">2</p>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Sign up and make a post
                </h2>
                <p className="leading-relaxed text-base">
                  Please go to our website and make a post of
                  foodItems,pictures,location,spoil time etc.
                </p>
              </div>
            </div>
            <div className="flex flex-col mb-10 lg:items-start items-center">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-blue-500 mb-5">
                <p className="text-2xl">3</p>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  We fought Hunger together
                </h2>
                <p className="leading-relaxed text-base">
                  Our local charity teams will collect the food and serve the
                  needed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-aos="zoom-out-down"
        id="our_team"
        className="text-gray-700 body-font border-t border-gray-200"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Our Team
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              This website is a Registered Non-Profitable and Non-Religious
              Social Service Oraganisation. We work 24/7 to serve poor and
              needy. Our passion remains in feeding the hungry. We offer help
              whole theartedly to the needy.
            </p>
          </div>
          <div className="flex flex-wrap -m-2 justify-evenly">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://media-exp1.licdn.com/dms/image/D5603AQF0GAM5IwawGw/profile-displayphoto-shrink_400_400/0/1630007884841?e=1635984000&v=beta&t=8oYRDXPxzfGSCkKkUWAtqG_w8KmogqyM3REPi5rY1-s"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Dhanush Thumanapally
                  </h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>

            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://media-exp1.licdn.com/dms/image/C4D03AQEjYFwUmZ14bA/profile-displayphoto-shrink_400_400/0/1622100177373?e=1635984000&v=beta&t=zf73-g0FGYHiH-Y7o0kfnoooFdLnzkBHenNN04xv_gs"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    Bala Shekar
                  </h2>
                  <p className="text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-aos="zoom-out-down"
        className="text-gray-700 body-font border-t border-gray-200"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-gray-400 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg">
              This website is a Registered Non-Profitable and Non-Religious
              Social Service Oraganisation. We work 24/7 to serve poor and
              needy. Our passion remains in feeding the hungry. We offer help
              whole theartedly to the needy.
            </p>
            <span className="inline-block h-1 w-10 rounded bg-blue-500 mt-8 mb-6"></span>
            <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
              Fight Hunger
            </h2>
            <p className="text-gray-500">Share more , Care more , Waste less</p>
          </div>
        </div>
      </section>
      <section
        data-aos="fade-up"
        className="text-gray-700 body-font border-t bg-blue-500 flex justify-items-center  align-middle "
      >
        {/* <div className="container px-5 py-24  flex justify-items-center  align-middle"> */}
        <div className=" bg-white -lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 ml-auto">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Feedback
          </h2>
          <input
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mb-4"
            placeholder="Email"
            type="email"
          />
          <textarea
            className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-blue-500 text-base px-4 py-2 mb-4 resize-none"
            placeholder="Message"
          ></textarea>
          <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
            Send
          </button>
        </div>
        {/* </div> */}
      </section>
      <footer className="text-gray-700 body-font">
        <div className="bg-gray-200">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2021 IIT ISM College Project —
              <a
                href="https://www.linkedin.com/in/dhanush-thumanapally-a7625418b/"
                className="text-gray-600 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Dhanush
              </a>
              <a
                href="https://www.linkedin.com/in/kamandla-balashekhar-a91058199/"
                className="text-gray-600 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @BalaShekar
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
