import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const ContactInfo = () => {
    return (
        <section className="w-full mx-auto bg-haskurit-gray p-6 rounded shadow-md text-haskurit-white">
            <h2 className="text-2xl font-bold mb-4">השכורית</h2>
            <p className="mb-2">
                <strong>טלפון:</strong>{' '}
                <a href="tel:+972527694198" className="text-blue-600 hover:underline">
                    +972-52-769-4198
                </a>
            </p>
            <p className="mb-2">
                <strong>אימייל:</strong>{' '}
                <a href="mailto:mss8535645@gmail.com " className="text-blue-600 hover:underline">
                    mss8535645@gmail.com
                </a>
            </p>
            <p className="mb-2">
                <strong>כתובת:</strong> רח' הדוגמא 12, בית שמש
            </p>
            <p className="mb-4">
                <strong>שעות פעילות:</strong> א'-ה' 09:00-18:00, ו' 09:00-13:00
            </p>

            <div className="flex space-x-4 text-2xl text-blue-600">
                <a
                    href="https://facebook.com/hashkorit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://instagram.com/hashkorit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://linkedin.com/company/hashkorit"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://wa.me/97212345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="hover:text-green-600"
                >
                    <FaWhatsapp />
                </a>
            </div>
        </section>
    );
};

export default ContactInfo;
