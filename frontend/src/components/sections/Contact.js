import { FaWhatsapp, FaPhone } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="bg-haskurit-gray text-haskurit-white py-6 px-4">
            <div className="ms-auto me-0 pr-2">
                <div className="text-right space-y-3">
                    <h2 className="text-2xl font-bold">השכורית</h2>
                    <p>
                        <strong>כתובת:</strong> רמה ג' בית שמש
                    </p>
                    <p>
                        <strong>שעות פעילות:</strong> א'-ה' 17:00–08:00
                    </p>
                    <p>
                        <strong>טלפון:</strong> 052-7694198
                    </p>
                    <div className="flex justify-start gap-4 pt-2 text-3xl">
                        <a
                            href="tel:+972527694198"
                            aria-label="התקשר עכשיו"
                            className="hover:text-blue-400 transition"
                        >
                            <FaPhone />
                        </a>
                        <a
                            href="https://wa.me/972527694198?text=שלום, אני מעוניין/ת בהשכרת כלי עבודה"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="שלח WhatsApp"
                            className="hover:text-green-500 transition"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
