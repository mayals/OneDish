// MainMeal.jsx 

const MainMeal= () =>{
  return(

        <section className="bg-gray-100 mt-0" id="aboutus">
           <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 to-orange-100 mb-0 text-center pt-12">الوجبة الرئيسية</h2>
                <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 flex md:justify-around items-center gap-8">
                        <div className="flex justify-center items-center max-w-lg ltr:ml-3 rtl:mr-3">
                            
                            <p className="mt-4 text-2xl text-gray-600 leading-loose whitespace-normal text-center align-center">
                                
                                <span className="sm:text-5xl text-xl text-gray-300 dark:text-gray-800">❞</span>
                                <br></br>                                               
                                    سباغيتي اليوم هو طبق استثنائي يجمع بين المذاق الأصيل والنكهات الفريدة.
                                    يُحضّر من أجود أنواع المعكرونة مع صلصة الطماطم الطازجة والأعشاب الإيطالية العطرية.
                                    يُزين بطبقة سخية من جبنة البارميزان المبشورة لإضافة لمسة غنية ولذيذة.
                                    وجبة مثالية تجعلك تستمتع بكل قضمة وكأنك في قلب إيطاليا!
                                <br></br><br></br>
                                <span className="sm:text-5xl text-xl text-gray-300 dark:text-gray-800">❞</span>
                            </p>
                        </div>
                        <div className="mt-12 md:mt-0 flex justify-center items-center">
                            <img src="https://img.freepik.com/free-photo/pasta-with-cheese-cherry-tomatoes_661915-51.jpg" alt="Main Meal Image" className="object-cover rounded-lg shadow-md"/>
                        </div>
                    </div>
                </div>
        </section>
  )
}

export default MainMeal;