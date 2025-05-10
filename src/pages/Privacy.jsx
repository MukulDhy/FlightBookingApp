import React, { useEffect } from "react";
import { Link } from "react-router";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="p-6">
        <div className="mx-20 bg-white p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Privacy Policy
          </h1>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Data Privacy and Security
          </h2>
          <h3 className="text-xl font-medium mt-4">Personal Data</h3>
          <p className="text-gray-700">
            We are committed to protecting your personal data in accordance with
            applicable privacy laws. Any personal data collected from you will
            be used solely for the purpose of processing your booking and
            providing customer support. We employ reasonable physical,
            technical, and administrative safeguards to protect your
            information.
          </p>

          <h3 className="text-xl font-medium mt-4">Data Security Incident</h3>
          <p className="text-gray-700">
            In the event of a security incident involving your personal data, we
            will notify you promptly, as required by applicable laws, and will
            take appropriate action to mitigate any potential harm.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Limitation of Liability
          </h2>
          <p className="text-gray-700">
            To the maximum extent permitted by law, Travelove and its affiliates
            shall not be liable for any indirect, incidental, special, or
            consequential damages arising from the use of our services,
            including but not limited to loss of profits, travel disruptions, or
            any other form of financial loss.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            Dispute Resolution
          </h2>
          <h3 className="text-xl font-medium mt-4">Governing Law</h3>
          <p className="text-gray-700">
            This Agreement will be governed by and construed in accordance with
            the laws of the State of Wyoming, USA.
          </p>

          <h3 className="text-xl font-medium mt-4">Arbitration</h3>
          <p className="text-gray-700">
            Any disputes or claims arising out of or relating to this Agreement,
            including but not limited to those related to the booking process,
            payments, or services provided, shall be resolved through binding
            arbitration in Sheridan, Wyoming, in accordance with the rules of
            the American Arbitration Association.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-2">Miscellaneous</h2>
          <h3 className="text-xl font-medium mt-4">Amendments to Terms</h3>
          <p className="text-gray-700">
            We reserve the right to modify or update these Terms and Conditions
            at any time. All changes will be posted on this page, and the
            "Effective Date" will be updated accordingly. By continuing to use
            the Travelove platform after changes are made, you agree to be bound
            by the updated Terms and Conditions.
          </p>

          <h3 className="text-xl font-medium mt-4">Contact Information</h3>
          <p className="text-gray-700">
            For any questions regarding these Terms and Conditions, or if you
            wish to contact us about your booking or personal data, please reach
            out to us at:
          </p>
          <p className="text-gray-700 font-medium mt-2">
            Travelove LLC <br />
            30 N Gould St #36918 <br />
            Sheridan, WY 82801 <br />
            Phone: (833) 931-6548 <br />
            Email: customerservice@Travelove.com
          </p>

          <h2 className="text-3xl font-medium mt-4">Privacy Policy</h2>
          <p className="text-gray-700">
            For further information on how we protect your privacy and handle
            your data, please review our Privacy Policy. By using the Travelove
            website, you agree to comply with these Terms and Conditions. If you
            do not agree with these Terms, please refrain from using our website
            or services.
          </p>

          <div>
            <h4 className="text-2xl font-medium mt-4">SMS Policy</h4>
            <p className="text-gray-700 mt-2">
              If you consent to receive SMS from Travelove, you agree to receive
              Flight Detail, Flight Confirmation, Flight Deal SMS from us. Reply
              STOP 🚫to opt-out. <br></br>
              Reply HELP for 🆘 support. <br></br>
              Message & data rates may apply. <br></br>
              Messaging frequency may vary.(
              <Link
                className="text-blue-600 underline"
                to={"https://cnmilaw.org/pdf/cmc_section/T5/9102.pdf"}
                target="_blank"
              >
                9102
              </Link>
              ) see our privacy policy and terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
