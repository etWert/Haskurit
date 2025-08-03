const About = () => {
  return (
    <>
      <div
        id="about"
        style={{
          // backgroundImage: "url('/images/asfalt-dark.png')",
          backgroundImage: "url('/images/concrete-wall.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundAttachment: "fixed",
        }}

        className="min-h-screen flex items-center justify-center px-6 bg-haskurit-gray"
      >
        <section
          className="bg-white text-haskurit-gray p-6 rounded-xl max-w-3xl text-center shadow-xl"
        >
          <h2 className="text-3xl font-semibold text-haskurit-yellow mb-6">אודות העסק</h2>
          <p className="text-lg leading-relaxed text-right">
            שמי מוטי ורטהיימר, ואני מפעיל שירות השכרת כלי עבודה מקצועיים לבית שמש והסביבה.
            אצלנו תמצאו מגוון רחב של ציוד לכל עבודת בנייה, שיפוץ או התקנה — כולל קונגוים, פטישונים, מקדחות יהלום,
            מכונות קרמיקה, מערבלי דבק, פיגומים, רתכות, מברגות ועוד.
            <br /><br />
            השירות מתאים גם לעבודות קצרות טווח וגם לפרויקטים ארוכים, עם אפשרות למשלוחים נוחים לכל אזור בית שמש והיישובים הסמוכים.
            לקוחות חוזרים, קבלנים ובעלי מקצוע נהנים מהצעות משתלמות ודילים ייחודיים.
            <br /><br />
            נשמח לעזור לך למצוא את הכלי שאתה צריך — ואם יש כלי מסוים שחסר לך, אשמח לשמוע ולהיערך בהתאם.
            השירות כולל תשלום באשראי או במזומן, וגישה ישירה לכל שאלה או בקשה.
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
