// const About = () => {
//   return (
//     <>
//       <div
//         id="about"
//         style={{
//           // backgroundImage: "url('/images/asfalt-dark.png')",
//           // backgroundImage: "url('/images/concrete-wall.png')",
//           backgroundRepeat: "repeat",
//           backgroundSize: "auto",
//           backgroundAttachment: "fixed",
//         }}

//         className="min-h-screen flex items-center justify-center px-6"
//       >
//         <section
//           className="bg-white text-haskurit-gray p-6 rounded-xl max-w-3xl text-center shadow-xl"
//         >
//           <h2 className="text-3xl font-semibold text-haskurit-yellow mb-6">אודות העסק</h2>
//           <p className="text-lg leading-relaxed text-right">
//             שמי מוטי ורטהיימר, ואני מפעיל שירות השכרת כלי עבודה מקצועיים לבית שמש והסביבה.
//             אצלנו תמצאו מגוון רחב של ציוד לכל עבודת בנייה, שיפוץ או התקנה — כולל קונגוים, פטישונים, מקדחות יהלום,
//             מכונות קרמיקה, מערבלי דבק, פיגומים, רתכות, מברגות ועוד.
//             <br /><br />
//             השירות מתאים גם לעבודות קצרות טווח וגם לפרויקטים ארוכים, עם אפשרות למשלוחים נוחים לכל אזור בית שמש והיישובים הסמוכים.
//             לקוחות חוזרים, קבלנים ובעלי מקצוע נהנים מהצעות משתלמות ודילים ייחודיים.
//             <br /><br />
//             נשמח לעזור לך למצוא את הכלי שאתה צריך — ואם יש כלי מסוים שחסר לך, אשמח לשמוע ולהיערך בהתאם.
//             השירות כולל תשלום באשראי או במזומן, וגישה ישירה לכל שאלה או בקשה.
//           </p>
//         </section>
//       </div>
//     </>
//   );
// };

// export default About;
import { FaUserTie, FaMedal, FaClock, FaShieldAlt } from "react-icons/fa";

const About = () => {
  return (
    <div
      id="about"
      className="bg-white py-12 px-4 sm:px-6 lg:px-8 text-haskurit-gray"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-haskurit-gray mb-4">אודות השכורית</h2>
        <p className="text-lg mb-10">
          אנחנו מתמחים בהשכרת כלי עבודה מקצועיים עבור קבלנים, בעלי מלאכה ואנשים פרטיים.
          המטרה שלנו היא לספק לכם את הכלים הטובים ביותר במחירים הוגנים ושירות מעולה.
        </p>

        {/* כרטיסים מעוצבים עם צל */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
            <p className="text-sm mt-2">זמינות מיידית ומסירה מהירה לכל רחבי הארץ</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaShieldAlt className="mx-auto text-haskurit-yellow text-4xl mb-3" />
            <h3 className="text-lg font-semibold">ביטוח מלא</h3>
            <p className="text-sm mt-2">כל הכלים מבוטחים בכדי שתוכלו לעבוד בראש שקט</p>
          </div>
        </div>


        {/* מקטע למה לבחור בנו */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
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
