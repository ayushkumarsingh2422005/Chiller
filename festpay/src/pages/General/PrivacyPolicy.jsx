import React from 'react';
import { TopBar } from '../../components';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <TopBar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">PRIVACY POLICY</h1>
          <p className="text-gray-600 mb-8 text-center text-lg">
            Last updated January 05, 2025
          </p>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12 p-6 bg-gray-50 rounded-lg">
              <p className="mb-6 text-gray-700 leading-relaxed">
                This Privacy Notice for AP ASSOCIATES ('we', 'us', or 'our'), describes how and why we might
                access, collect, store, use, and/or share ('process') your personal information when you use our
                services ('Services'), including when you:
              </p>
              <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  Visit our website at <a href="https://www.festpay.in" className="text-blue-600 hover:text-blue-800 underline">https://www.festpay.in</a>, or any website of ours that links to this Privacy Notice
                </li>
                <li className="leading-relaxed">
                  Download and use our mobile application (FestPay), or any other application of ours that
                  links to this Privacy Notice
                </li>
                <li className="leading-relaxed">
                  Engage with us in other related ways, including any sales, marketing, or events
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-gray-700">
                  <span className="font-semibold">Questions or concerns?</span> Reading this Privacy Notice will help you understand your privacy
                  rights and choices. We are responsible for making decisions about how your personal
                  information is processed. If you do not agree with our policies and practices, please do not use
                  our Services. If you still have any questions or concerns, please contact us
                  at <a href="mailto:privacy@festpay.in" className="text-blue-600 hover:text-blue-800 underline">privacy@festpay.in</a>.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">SUMMARY OF KEY POINTS</h2>
              <p className="mb-6 text-gray-600 italic bg-gray-50 p-4 rounded-lg">
                This summary provides key points from our Privacy Notice, but you can find out more
                details about any of these topics by clicking the link following each key point or by using
                our table of contents below to find the section you are looking for.
              </p>
              
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">What personal information do we process?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the
                    choices you make, and the products and features you use. Learn more about personal
                    information you disclose to us.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Do we process any sensitive personal information?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example your racial or ethnic origins,
                    sexual orientation, and religious beliefs. We may process sensitive personal information when
                    necessary with your consent or as otherwise permitted by applicable law. Learn more
                    about sensitive information we process.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Do we collect any information from third parties?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more
                    about information collected from other sources.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How do we process your information?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply
                    with law. We may also process your information for other purposes with your consent. We
                    process your information only when we have a valid legal reason to do so. Learn more
                    about how we process your information.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">TABLE OF CONTENTS</h2>
              <ol className="list-decimal pl-8 space-y-2 text-gray-700">
                <li>
                  <a href="#collect" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    WHAT INFORMATION DO WE COLLECT?
                  </a>
                </li>
                <li>
                  <a href="#process" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    HOW DO WE PROCESS YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#share" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#third-party" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </a>
                </li>
                <li>
                  <a href="#social-logins" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                  </a>
                </li>
                <li>
                  <a href="#retention" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    HOW LONG DO WE KEEP YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </a>
                </li>
                <li>
                  <a href="#privacy-rights" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    WHAT ARE YOUR PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#dnt" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    CONTROLS FOR DO-NOT-TRACK FEATURES
                  </a>
                </li>
                <li>
                  <a href="#event-organizers" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    DATA SHARING WITH EVENT ORGANIZERS
                  </a>
                </li>
                <li>
                  <a href="#updates" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    DO WE MAKE UPDATES TO THIS NOTICE?
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                  </a>
                </li>
                <li>
                  <a href="#review" className="hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                  </a>
                </li>
              </ol>
            </section>

            <section id="collect" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">1. WHAT INFORMATION DO WE COLLECT?</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal information you disclose to us</h3>
                <p className="text-gray-700 leading-relaxed">
                  In Short: We collect personal information that you provide to us.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We collect personal information that you voluntarily provide to us when you register on the
                  Services, express an interest in obtaining information about us or our products and Services,
                  when you participate in activities on the Services, or otherwise when you contact us.
                </p>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Personal Information Provided by You</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products
                    and features you use. The personal information we collect may include the following:
                  </p>
                  <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                    <li className="leading-relaxed">names</li>
                    <li className="leading-relaxed">phone numbers</li>
                    <li className="leading-relaxed">email addresses</li>
                    <li className="leading-relaxed">mailing addresses</li>
                    <li className="leading-relaxed">usernames</li>
                    <li className="leading-relaxed">passwords</li>
                    <li className="leading-relaxed">contact preferences</li>
                    <li className="leading-relaxed">billing addresses</li>
                    <li className="leading-relaxed">debit/credit card numbers</li>
                    <li className="leading-relaxed">academics info</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Sensitive Information</h4>
                  <p className="text-gray-700 leading-relaxed">
                    When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:
                  </p>
                  <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                    <li className="leading-relaxed">student data</li>
                    <li className="leading-relaxed">bank details</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Payment Data</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your
                    payment instrument. All payment data is handled and stored by Razorpay. You may find their privacy notice link(s) here: <a href="https://razorpay.com/privacy/" className="text-blue-600 hover:text-blue-800 underline">https://razorpay.com/privacy/</a>.
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Social Media Login Data</h4>
                  <p className="text-gray-700 leading-relaxed">
                    We may provide you with the option to register with us using your existing social media account details, like your Facebook, X, or other social media account. If you
                    choose to register in this way, we will collect certain profile information about you from the social media provider, as described in the section called 'HOW DO WE HANDLE YOUR SOCIAL
                    LOGINS?' below.
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Application Data</h4>
                  <p className="text-gray-700 leading-relaxed">
                    If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
                  </p>
                  <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                    <li className="leading-relaxed">
                      <span className="font-semibold">Geolocation Information.</span> We may request access or permission to track location-based information from your mobile device, either continuously or while you are
                      using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's
                      settings.
                    </li>
                    <li className="leading-relaxed">
                      <span className="font-semibold">Mobile Device Access.</span> We may request access or permission to certain features from your mobile device, including your mobile device's camera, sms, messages, calendar, contacts, reminders, social media accounts, and other features. If you wish to change our access or permissions, you may do so in your device's settings.
                    </li>
                    <li className="leading-relaxed">
                      <span className="font-semibold">Push Notifications.</span> We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    This information is primarily needed to maintain the security and operation of our application(s),
                    for troubleshooting, and for our internal analytics and reporting purposes.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    All personal information that you provide to us must be true, complete, and accurate, and you
                    must notify us of any changes to such personal information.
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Information automatically collected</h4>
                  <p className="text-gray-700 leading-relaxed">
                    In Short: Some information — such as your Internet Protocol (IP) address and/or browser and
                    device characteristics — is collected automatically when you visit our Services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We automatically collect certain information when you visit, use, or navigate the Services. This
                    information does not reveal your specific identity (like your name or contact information) but may
                    include device and usage information, such as your IP address, browser and device
                    characteristics, operating system, language preferences, referring URLs, device name, country,
                    location, information about how and when you use our Services, and other technical information.
                    This information is primarily needed to maintain the security and operation of our Services, and
                    for our internal analytics and reporting purposes.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Like many businesses, we also collect information through cookies and similar technologies.
                  </p>
                  <p className="text-gray-700 leading-relaxed">The information we collect includes:</p>
                  <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                    <li className="leading-relaxed">
                      <span className="font-semibold">Location Data.</span> We collect location data such as information about your device's location,
                      which can be either precise or imprecise. How much information we collect depends on
                      the type and settings of the device you use to access the Services. For example, we may
                      use GPS and other technologies to collect geolocation data that tells us your current
                      location (based on your IP address). You can opt out of allowing us to collect this
                      information either by refusing access to the information or by disabling your Location
                      setting on your device. However, if you choose to opt out, you may not be able to use
                      certain aspects of the Services.
                    </li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Google API</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Our use of information received from Google APIs will adhere to Google API Services User Data
                    Policy, including the Limited Use requirements.
                  </p>
                </div>
              </div>
            </section>

            <section id="process" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
              <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  <span className="font-semibold">To determine the effectiveness of our marketing and promotional campaigns.</span> We
                  may process your information to better understand how to provide marketing and
                  promotional campaigns that are most relevant to you.
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">To comply with our legal obligations.</span> We may process your information to comply with
                  our legal obligations, respond to legal requests, and exercise, establish, or defend our
                  legal rights.
                </li>
              </ul>
            </section>

            <section id="share" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: We may share information in specific situations and with specific third parties. Learn more about when
                and with whom we share your personal information.
              </p>
              <p className="text-gray-700 leading-relaxed">We may need to share your personal information in the following situations:</p>
              <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                <li className="leading-relaxed">
                  <span className="font-semibold">Business Transfers.</span> We may share or transfer your information in connection with, or
                  during negotiations of, any merger, sale of company assets, financing, or acquisition of
                  all or a portion of our business to another company.
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">When we use Google Maps Platform APIs.</span> We may share your information with certain
                  Google Maps Platform APIs (e.g. Google Maps API, Places API). Google Maps uses
                  GPS, Wi-Fi, and cell towers to estimate your location. GPS is accurate to about 20
                  meters, while Wi-Fi and cell towers help improve accuracy when GPS signals are weak,
                  like indoors. This data helps Google Maps provide directions, but it is not always perfectly
                  precise.
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">Other Users.</span> When you share personal information (for example, by posting comments,
                  contributions, or other content to the Services) or otherwise interact with public areas of
                  the Services, such personal information may be viewed by all users and may be publicly
                  made available outside the Services in perpetuity. If you interact with other users of our
                  Services and register for our Services through a social network (such as Facebook), your
                  contacts on the social network will see your name, profile photo, and descriptions of your
                  activity. Similarly, other users will be able to view descriptions of your activity,
                  communicate with you within our Services, and view your profile.
                </li>
              </ul>
            </section>

            <section id="third-party" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">4. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: We are not responsible for the safety of any information that you share with third
                parties that we may link to or who advertise on our Services, but are not affiliated with, our
                Services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The Services may link to third-party websites, online services, or mobile applications and/or
                contain advertisements from third parties that are not affiliated with us and which may link to
                other websites, services, or applications. Accordingly, we do not make any guarantee regarding
                any such third parties, and we will not be liable for any loss or damage caused by the use of such
                third-party websites, services, or applications. The inclusion of a link towards a third-party
                website, service, or application does not imply an endorsement by us. We cannot guarantee the
                safety and privacy of data you provide to any third-party websites. Any data collected by third
                parties is not covered by this Privacy Notice. We are not responsible for the content or privacy
                and security practices and policies of any third parties, including other websites, services, or
                applications that may be linked to or from the Services. You should review the policies of such
                third parties and contact them directly to respond to your questions.
              </p>
            </section>

            <section id="cookies" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: We may use cookies and other tracking technologies to collect and store your
                information.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may use cookies and similar tracking technologies (like web beacons and pixels) to gather
                information when you interact with our Services. Some online tracking technologies help us
                maintain the security of our Services and your account, prevent crashes, fix bugs, save your
                preferences, and assist with basic site functions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We also permit third parties and service providers to use online tracking technologies on our
                Services for analytics and advertising, including to help manage and display advertisements, to
                tailor advertisements to your interests, or to send abandoned shopping cart reminders
                (depending on your communication preferences). The third parties and service providers use
                their technology to provide advertising about products and services tailored to your interests
                which may appear either on our Services or on other websites.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Specific information about how we use such technologies and how you can refuse certain
                cookies is set out in our Cookie Notice.
              </p>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Google Analytics</h4>
                <p className="text-gray-700 leading-relaxed">
                  We may share your information with Google Analytics to track and analyse the use of the
                  Services. The Google Analytics Advertising Features that we may use include: Remarketing with
                  Google Analytics. To opt out of being tracked by Google Analytics across the Services,
                  visit <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:text-blue-800 underline">https://tools.google.com/dlpage/gaoptout</a>. You can opt out of Google Analytics Advertising
                  Features through Ads Settings and Ad Settings for mobile apps. Other opt out means
                  include <a href="http://optout.networkadvertising.org/" className="text-blue-600 hover:text-blue-800 underline">http://optout.networkadvertising.org/</a> and <a href="http://www.networkadvertising.org/mobile-choice" className="text-blue-600 hover:text-blue-800 underline">http://www.networkadvertising.org/mobile-choice</a>. For more information on the privacy practices of Google, please visit the Google Privacy
                  & Terms page.
                </p>
              </div>
            </section>

            <section id="social-logins" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">6. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: If you choose to register or log in to our Services using a social media account, we may
                have access to certain information about you.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our Services offer you the ability to register and log in using your third-party social media
                account details (like your Facebook or X logins). Where you choose to do this, we will receive
                certain profile information about you from your social media provider. The profile information we
                receive may vary depending on the social media provider concerned, but will often include your
                name, email address, friends list, and profile picture, as well as other information you choose to
                make public on such a social media platform.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We will use the information we receive only for the purposes that are described in this Privacy
                Notice or that are otherwise made clear to you on the relevant Services. Please note that we do
                not control, and are not responsible for, other uses of your personal information by your third-
                party social media provider. We recommend that you review their privacy notice to understand
                how they collect, use, and share your personal information, and how you can set your privacy
                preferences on their sites and apps.
              </p>
            </section>

            <section id="retention" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">7. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: We keep your information for as long as necessary to fulfil the purposes outlined in this
                Privacy Notice unless otherwise required by law.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We will only keep your personal information for as long as it is necessary for the purposes set out
                in this Privacy Notice, unless a longer retention period is required or permitted by law (such as
                tax, accounting, or other legal requirements). No purpose in this notice will require us keeping
                your personal information for longer than three (3) months past the termination of the user's
                account.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When we have no ongoing legitimate business need to process your personal information, we
                will either delete or anonymise such information, or, if this is not possible (for example, because
                your personal information has been stored in backup archives), then we will securely store your
                personal information and isolate it from any further processing until deletion is possible.
              </p>
            </section>

            <section id="security" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: We aim to protect your personal information through a system of organisational and
                technical security measures.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We have implemented appropriate and reasonable technical and organisational security
                measures designed to protect the security of any personal information we process. However,
                despite our safeguards and efforts to secure your information, no electronic transmission over
                the Internet or information storage technology can be guaranteed to be 100% secure, so we
                cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will
                not be able to defeat our security and improperly collect, access, steal, or modify your
                information. Although we will do our best to protect your personal information, transmission of
                personal information to and from our Services is at your own risk. You should only access the
                Services within a secure environment.
              </p>
            </section>

            <section id="privacy-rights" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">9. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: You may review, change, or terminate your account at any time, depending on your
                country, province, or state of residence.
              </p>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Withdrawing your consent</h4>
                <p className="text-gray-700 leading-relaxed">
                  If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you
                  have the right to withdraw your consent at any time. You can withdraw your consent at any time
                  by contacting us by using the contact details provided in the section 'HOW CAN YOU CONTACT
                  US ABOUT THIS NOTICE?' below.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  However, please note that this will not affect the lawfulness of the processing before its
                  withdrawal nor, when applicable law allows, will it affect the processing of your personal
                  information conducted in reliance on lawful processing grounds other than consent.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Opting out of marketing and promotional communications</h4>
                <p className="text-gray-700 leading-relaxed">
                  You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the
                  emails that we send, or by contacting us using the details provided in the section 'HOW CAN
                  YOU CONTACT US ABOUT THIS NOTICE?' below. You will then be removed from the
                  marketing lists. However, we may still communicate with you — for example, to send you
                  service-related messages that are necessary for the administration and use of your account, to
                  respond to service requests, or for other non-marketing purposes.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Account Information</h4>
                <p className="text-gray-700 leading-relaxed">
                  If you would at any time like to review or change the information in your account or
                  terminate your account, you can:
                </p>
                <ul className="list-disc pl-8 mb-6 space-y-3 text-gray-700">
                  <li className="leading-relaxed">Log in to your account settings and update your user account.</li>
                  <li className="leading-relaxed">Contact us using the contact information provided.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Upon your request to terminate your account, we will deactivate or delete your account and
                  information from our active databases. However, we may retain some information in our files to
                  prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms
                  and/or comply with applicable legal requirements.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Cookies and similar technologies</h4>
                <p className="text-gray-700 leading-relaxed">
                  Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies.
                  If you choose to remove cookies or reject cookies, this could affect certain features or services of
                  our Services. You may also opt out of interest-based advertising by advertisers on our
                  Services.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                If you have questions or comments about your privacy rights, you may email us
                at <a href="mailto:privacy@festpay.in" className="text-blue-600 hover:text-blue-800 underline">privacy@festpay.in</a>.
              </p>
            </section>

            <section id="dnt" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">10. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
              <p className="text-gray-700 leading-relaxed">
                Most web browsers and some mobile operating systems and mobile applications include a Do-
                Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to
                have data about your online browsing activities monitored and collected. At this stage, no uniform
                technology standard for recognising and implementing DNT signals has been finalised. As such,
                we do not currently respond to DNT browser signals or any other mechanism that automatically
                communicates your choice not to be tracked online. If a standard for online tracking is adopted
                that we must follow in the future, we will inform you about that practice in a revised version of this
                Privacy Notice.
              </p>
            </section>

            <section id="event-organizers" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">11. DATA SHARING WITH EVENT ORGANIZERS</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our platform, you consent to the sharing of your personal information with the respective
                event organizers. This data may be used solely for purposes of validation, verification, and
                ensuring the smooth conduct of the event. We ensure that such information is shared securely
                and only with the organizers responsible for the specific event you are participating in. However,
                we are not liable for any misuse of the data by the organizers beyond these purposes.
              </p>
            </section>

            <section id="updates" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">12. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
              <p className="text-gray-700 leading-relaxed">
                In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Notice from time to time. The updated version will be indicated by an
                updated 'Revised' date at the top of this Privacy Notice. If we make material changes to this
                Privacy Notice, we may notify you either by prominently posting a notice of such changes or by
                directly sending you a notification. We encourage you to review this Privacy Notice frequently to
                be informed of how we are protecting your information.
              </p>
            </section>

            <section id="contact" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">13. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have questions or comments about this notice, you may email us
                at <a href="mailto:festpay.official@gmail.com" className="text-blue-600 hover:text-blue-800 underline">festpay.official@gmail.com</a> or contact us by post at:
              </p>
              <address className="text-gray-700 not-italic">
                AP ASSOCIATES<br />
                Pushp Vatika, Ward No.34<br />
                Bajla Chowk, Deoghar<br />
                Jharkhand 814112<br />
                India
              </address>
            </section>

            <section id="review" className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">14. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h2>
              <p className="text-gray-700 leading-relaxed">
                Based on the applicable laws of your country, you may have the right to request access to the
                personal information we collect from you, details about how we have processed it, correct
                inaccuracies, or delete your personal information. You may also have the right to withdraw your
                consent to our processing of your personal information. These rights may be limited in some
                circumstances by applicable law. To request to review, update, or delete your personal
                information, please visit: <a href="https://www.festpay.in/user/account" className="text-blue-600 hover:text-blue-800 underline">https://www.festpay.in/user/account</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
