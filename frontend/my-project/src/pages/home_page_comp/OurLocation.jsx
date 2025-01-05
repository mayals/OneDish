const OurLocation = ()=> {
  

    return (
        <section id='OurLocation' className=' md:mx-32 mx-2 pt-[5px] md:pt-[5px] items-center mt-0 md:mt-0  ltr:ml-3 rtl:mr-3'>
                
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 to-orange-200 mb-0 text-center py-8 mt-2">عنواننا</h2>
                

                {/* content */}
                <div className="md:grid md:grid-cols-2 grid grid-rows-2 mt-2 text-3x font-bold">
                    
                     {/* Map adress  */}
                    <div  className="border-4 border-[#bb9a78] w-fit h-fit bg-[#bb9a78]">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48776.477868922346!2d46.63218522462664!3d24.681063026917897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f033bb824b417%3A0xdc9745cc4a78b2d2!2sAl%20Olaya%2C%20Riyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sae!4v1736089512357!5m2!1sen!2sae" width="450" height="450" style={{border:"0",}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>                   
                    </div>

                    {/* adress text */}
                    <div className="ml-5 text-right rtl flex-row-reverse">
                                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                    <div className="sm:divide-y sm:divide-gray-200">
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                            ون دش
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                إسم المطعم
                                            </dd>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                الرياض -المملكة العربية السعودية
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            إسم المدينة
                                            </dd>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                            العليا
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                إسم الحي
                                            </dd>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                الشارع الأول
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                إسم الشارع
                                            </dd>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                13
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            رقم المبنى
                                            </dd>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                            3
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                رقم الطابق
                                            </dd>
                                        </div>
                                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                            <dt className="text-sm font-medium text-gray-500">
                                                1980
                                            </dt>
                                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                سنة التأسيس
                                            </dd>
                                        </div>
                                    </div>
                                </div>
                    </div> 

                </div>
        </section>
    );
}

export default OurLocation;