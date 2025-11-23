import { FaUserTie, FaMedal, FaClock, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <div
      id="about"
      className="bg-white py-12 px-4 sm:px-6 lg:px-8 text-haskurit-gray"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-haskurit-gray mb-4">אודות</h2>
        <p className="text-lg mb-10">
          אנחנו מתמחים בהשכרת כלי עבודה מקצועיים עבור קבלנים, בעלי מלאכה ואנשים פרטיים.
          המטרה שלנו היא לספק לכם את הכלים הטובים ביותר במחירים הוגנים ושירות מעולה.
        </p>

        <div className="flex justify-center gap-6 py-6 lg:hidden">
          <div className="text-center">
            <FaUserTie className="mx-auto text-haskurit-yellow text-5xl mb-3" />
            <p className="text-sm font-bold">ניסיון</p>
          </div>
          <div className="text-center">
            <FaMedal className="mx-auto text-haskurit-yellow text-5xl mb-3" />
            <p className="text-sm font-bold">איכות</p>
          </div>
          <div className="text-center">
            <FaClock className="mx-auto text-haskurit-yellow text-5xl mb-3" />
            <p className="text-sm font-bold">מהירות</p>
          </div>
          <div className="text-center">
            <FaShieldAlt className="mx-auto text-haskurit-yellow text-5xl mb-3" />
            <p className="text-sm font-bold">ביטוח</p>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-haskurit-white rounded-xl shadow-md p-6 text-center">
            <FaUserTie className="mx-auto text-haskurit-yellow text-4xl mb-3" />
            <h3 className="text-lg font-semibold">ניסיון של שנים</h3>
            <p className="text-sm mt-2">אנו משרתים לקוחות במשך שנים רבות עם שירות מקצועי ואמין</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaMedal className="mx-auto text-haskurit-yellow text-4xl mb-3" />
            <h3 className="text-lg font-semibold">כלים איכותיים</h3>
            <p className="text-sm mt-2">מגוון רחב של כלי עבודה מהמותגים המובילים בשוק</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaClock className="mx-auto text-haskurit-yellow text-4xl mb-3" />
            <h3 className="text-lg font-semibold">שירות מהיר</h3>
            <p className="text-sm mt-2">זמינות מיידית ומסירה מהירה באזור בית שמש, ביתר והסביבה</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaShieldAlt className="mx-auto text-haskurit-yellow text-4xl mb-3" />
            <h3 className="text-lg font-semibold">ביטוח מלא</h3>
            <p className="text-sm mt-2">כל הכלים מבוטחים בכדי שתוכלו לעבוד בראש שקט</p>
          </div>
        </div>

        <div className="hidden lg:block bg-gray-50 p-6 rounded-xl shadow-inner">
          <h3 className="text-2xl font-bold text-haskurit-dark mb-4">למה לבחור בנו?</h3>
          <p className="text-md leading-relaxed">
            בהשכורית, אנחנו מבינים שכל פרויקט הוא ייחודי בפני עצמו. לכן אנו מציעים פתרונות מותאמים אישית, החל מכלים בסיסיים ועד ציוד מתקדם ומיוחד.
            הצוות שלנו זמין לייעוץ מקצועי ולהכוונה בבחירת הכלים המתאימים ביותר לפרויקט שלכם.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;