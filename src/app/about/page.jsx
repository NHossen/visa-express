// components/AboutVisaExpress.jsx
import React from "react";
import Link from "next/link";

const AboutVisaExpress = () => {
  return (
    <section
      className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16"
      aria-labelledby="about-visa-express"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h2
            id="about-visa-express"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            About Visa Express Hub – Global Visa Assistance Experts
          </h2>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Visa Express Hub is a trusted visa consultancy platform helping
            travelers secure tourist visas, business visas, student visas,
            work permits, and travel documentation for destinations worldwide.
            Our mission is to simplify international travel by providing
            reliable visa guidance, document support, application tracking,
            flight reservations, hotel bookings, and end-to-end travel
            assistance.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Mission */}
          <article className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              At Visa Express Hub, we believe that visa applications should be
              simple, transparent, and stress-free. Whether you are traveling
              for tourism, business, education, family visits, or employment,
              our experienced team provides professional visa consultation and
              documentation support to maximize your chances of approval.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We assist travelers from multiple nationalities with visa
              requirements, embassy procedures, application preparation,
              supporting documents, travel itineraries, hotel reservations, and
              immigration guidance for leading destinations across Europe,
              Asia, North America, the Middle East, and Oceania.
            </p>
          </article>

          {/* Sponsor */}
          <article className="bg-blue-900 p-8 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">
              Proudly Sponsored by Eammu Holidays
            </h3>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-blue-900 text-xl">
                EH
              </div>

              <div>
                <h4 className="text-xl font-bold">Eammu Holidays</h4>
                <p className="text-blue-200">
                  International Travel, Tours & Visa Solutions
                </p>
              </div>
            </div>

            <p className="mt-6 text-blue-100 border-t border-blue-800 pt-4 leading-relaxed">
              As a specialized travel and visa support division of Eammu
              Holidays, Visa Express Hub benefits from an extensive global
              network of travel partners, destination experts, airlines,
              hotels, and visa consultants. This allows us to deliver efficient
              visa processing assistance and exceptional customer service.
            </p>
          </article>
        </div>

        {/* Services */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Comprehensive Visa & Travel Services
          </h3>

          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
            We provide complete visa assistance and travel support services for
            individuals, families, students, business professionals, and travel
            agencies worldwide.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Tourist & Visit Visa Processing",
              "Business Visa Assistance",
              "Student Visa Consultation",
              "Work Permit & Employment Visa Support",
              "Document Verification & Review",
              "Flight Reservations & Hotel Bookings",
              "Travel Insurance Guidance",
              "Visa Refusal Case Assistance",
              "Real-Time Application Tracking",
            ].map((service, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <span className="text-blue-600 font-bold mr-3">✓</span>
                <span className="text-gray-800 font-medium">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-16 bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose Visa Express Hub?
          </h3>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Visa Express Hub provides professional visa support for popular
              destinations including the United Kingdom, Schengen Europe,
              Canada, Australia, New Zealand, the United States, Singapore,
              Thailand, Japan, South Korea, and many other countries.
            </p>

            <p>
              Our experienced consultants stay updated with changing visa
              regulations, embassy requirements, and travel policies to help
              applicants prepare accurate and complete applications.
            </p>

            <p>
              From first-time travelers to frequent international visitors,
              Visa Express Hub delivers reliable visa guidance, transparent
              communication, and dedicated customer support throughout the
              application process.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Powered by our centralized visa and travel data infrastructure at{" "}
            <a
              href="https://api.eammu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              api.eammu.com
            </a>
          </p>

          <p className="mt-2">
            Learn more about our travel services at{" "}
            <Link
              href="/"
              className="text-blue-600 underline"
            >
              Eammu Holidays
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default AboutVisaExpress;