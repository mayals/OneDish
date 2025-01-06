import twirtterSvg from "../../assets/social-twitter-svgrepo-com.svg"
import snapchatSvg from "../../assets/snapchat-color-svgrepo-com (1).svg"
import snapchatHoverSvg from "../../assets/snapchat-color-svgrepo-com.svg"




const ContactUs = () => {
    return (
        <section className="text-gray-600 body-font bg-yellow-100 mt-0 md:mt-3" dir="rtl">
              
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 to-orange-200 mb-0 text-center py-8 mt-2">
                نسعد بتواصلك معنا
            </h2>

            <div  className="container px-2 flex md:flex md:justify-between md:space-x-5 flex-col md:flex-row lg:max-w-5xl w-full px-5 py-12 md:py-24 mx-auto">
                
                {/*  text */}
                <div className="rounded-lg shadow-xl bg-white p-3">
                    <div className="">
                  
                        <p className="leading-relaxed text-xl text-gray-900 mt-12">
                            نحن هنا لخدمتك! إذا كانت لديك أي استفسارات أو تحتاج إلى المساعدة، فلا تتردد في التواصل معنا.
                            <br />
                            

                          <br></br>


                        يمكنك أيضًا مراسلتنا عبر البريد الإلكتروني على
                            <br></br>
                            <a href="mailto:contact@example.com" className="font-semibold border-b-4" dir="ltr">
                                contact@example.com
                            </a>
                        </p>
                    </div> 
                    <br></br><br></br>
                        <hr></hr>
              
                    <div className="pt-2"> 
                        <p className="leading-relaxed text-xl text-gray-900 mt-8 text-center mb-1">
                            تواصل معنا عبر وسائل التواصل الاجتماعي:
                        </p>
                        {/* social media icons */}
                        <div className="mb-3 flex justify-center gap-2">
                            
                            {/* twitter */}
                            <a className="text-gray-500 hover:text-[#1d9bf0]" target="_blank" href="https://twitter.com/example">
                                {/* <img src={twirtterSvg} className="h-6 w-6 bg-green-300"/> */}
                                <svg
                                    fill="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>

                            {/* instagram */}
                            <a className="text-gray-500 hover:text-[#ff5b3f]" target="_blank" href="https://www.instagram.com/example/">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                           
                            {/* Snapchat Icon with Hover */}
                            <a className="text-gray-500 group"  target="_blank" href="https://www.instagram.com/example/" >
                                <img
                                    src={snapchatSvg} // Default image
                                    className="h-6 w-6 group-hover:hidden"
                                    alt="Snapchat Icon"
                                />
                                <img
                                    src={snapchatHoverSvg} // Hover image
                                    className="h-6 w-6 hidden group-hover:block"
                                    alt="Snapchat Icon Hover"
                                />
                                </a>

                        </div>

                    </div>      
                </div>

                {/* CONTACT FORM */} 
                <div className="md:w-full w-full mt-10 md:mt-0 flex md:flex md:justify-center md:align-center">
                    <form  action="send-contact.php" method="post">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 py-4 text-lg text-gray-900">
                                    الاسم الكامل
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required=""
                                    className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="email" className="leading-7 py-4 text-lg text-gray-900">
                                    البريد الإلكتروني
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required=""
                                    className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 py-4 text-lg text-gray-900">
                                    رسالتك
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required=""
                                    className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                type="submit"
                                className="flex text-white bg-[#bb9a79] border-0 py-2 px-6 focus:outline-none focus:bg-black  hover:bg-[#6C563F] rounded text-xl font-bold shadow-lg mx-0 flex-col text-center g-recaptcha transition-all duration-300"
                            >
                                إرسال الرسالة ✉
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default ContactUs;



